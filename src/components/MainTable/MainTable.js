import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import ArrowUp from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDown from "@mui/icons-material/ArrowDownwardRounded";
import MainTablePaginationActions from "./MainTablePaginationActions";
import useWindowDimensions from "../useWindowDimensions";
import useCommon from "../useCommon";
import { dateTimeConverter } from "../misc";
import { CSVLink } from "react-csv";

const styles = {
  common: {
    overflow: "auto",
    msOverflowStyle: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
};

function MainTable({ loading, rows, columns, onExport, filename }) {
  const csvLink = useRef(null);
  const { isDark: darkMode } = useCommon();
  const dimension = useWindowDimensions();
  const isEmpty = rows?.length === 0;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const [isFirstRun, setFirstRun] = useState(true);

  useEffect(() => {
    setFirstRun(false);
  }, []);

  useEffect(() => {
    !isFirstRun && csvLink?.current?.link?.click();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onExport]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy] || b[orderBy] === null) {
      return -1;
    }
    if (b[orderBy] > a[orderBy] || a[orderBy] === null) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function handleSort(field, order) {
    setSort((prev) => {
      var newOrder;
      if (field !== prev.field) {
        newOrder = prev.order;
      } else {
        newOrder = order === "asc" ? "desc" : "asc";
      }
      return { field, order: newOrder };
    });
  }

  function handleExportRows(exportType) {
    var newArr;
    if (rows?.length > 0) {
      newArr = [...rows]
        ?.sort(getComparator(sort.order, sort.field))
        .map((row) => {
          const newData = [...columns]
            .filter((colData) => colData.id !== "actions")
            .map((col) => {
              return {
                [col.id]: col?.renderExport
                  ? col.renderExport(row[col.id], exportType)
                  : row[col.id],
              };
            });
          return Object.assign({}, ...newData);
        });

      return newArr;
    } else {
      return [];
    }
  }

  function handleExportColumns() {
    return [...columns]
      .filter((column) => column.id !== "actions")
      .map((column) => {
        return { label: column.label, key: column.id };
      });
  }

  if (isEmpty && !loading) {
    return (
      <Card sx={{ textAlign: "center", width: "100%", padding: 2 }}>
        <Typography>No results found.</Typography>
      </Card>
    );
  }

  if (!isEmpty && !loading) {
    return (
      <>
        <TableContainer
          component={Paper}
          style={{
            overflow: "auto",
            width: "100%",
            height: dimension.height - 175,
          }}
        >
          <Table stickyHeader size={"small"}>
            <TableHead>
              <TableRow>
                {[...columns]?.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                      backgroundColor: darkMode ? "#02475E" : "#8AB6D6",
                    }}
                    align={column.rowAlign}
                    onClick={() => handleSort(column.id, sort.order)}
                  >
                    {column.label}
                    {sort.order === "desc"
                      ? sort.field === column.id && (
                          <ArrowUp fontSize="small" sx={{ color: "red" }} />
                        )
                      : sort.field === column.id && (
                          <ArrowDown fontSize="small" sx={{ color: "blue" }} />
                        )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...rows]
                ?.sort(getComparator(sort.order, sort.field))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? (darkMode ? "#222" : "#ddd") : null,
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {[...columns]?.map((col) => (
                      <TableCell
                        key={col.id}
                        sx={{
                          minWidth: col.minWidth,
                          maxWidth: col.maxWidth,
                          ...styles.common,
                        }}
                        align={col.colAlign}
                      >
                        {col?.renderCell
                          ? col.renderCell(row[col.id], row)
                          : row[col.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100, { value: -1, label: "All" }]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={MainTablePaginationActions}
        />
        {!loading && (
          <CSVLink
            data={handleExportRows("csv")}
            headers={handleExportColumns()}
            target="_blank"
            filename={`${filename}_as_of_${dateTimeConverter(
              Date.now()
            )}`.replace(" ", "_")}
            ref={csvLink}
            sx={{ display: "none" }}
          />
        )}
      </>
    );
  }

  return null;
}

export default MainTable;
