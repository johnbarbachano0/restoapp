import { useState, useEffect } from "react";
import { Box, IconButton, Switch, Typography } from "@mui/material";
import { capitalize, dateTimeConverter } from "../misc";
import { useSelector } from "react-redux";
import useCommon from "../useCommon";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const styles = {
  common: {
    overflow: "auto",
    msOverflowStyle: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
};

const useMenu = () => {
  const { categories } = useSelector(
    (state) => state.maintenance.value.maintenance
  );

  const [editData, setEditData] = useState(null);
  const { user } = useCommon();
  const [patchData, setPatchData] = useState(null);

  //Functions
  const isOwner = (id) => user?.localId !== id;
  const getCategory = (id) =>
    categories?.filter((category) => category?.categoryId === id)?.shift()
      ?.label;

  const columns = [
    {
      id: "categoryId",
      label: "Category",
      minWidth: 50,
      maxWidth: 75,
      rowAlign: "center",
      colAlign: "center",
      renderCell: (data) => getCategory(data),
      renderExport: (data) => getCategory(data),
    },
    {
      id: "productName",
      label: "Product",
      minWidth: 100,
      maxWidth: 150,
      rowAlign: "center",
      colAlign: "center",
    },
    {
      id: "description",
      label: "Description",
      minWidth: 150,
      maxWidth: 200,
      rowAlign: "center",
      colAlign: "center",
    },
    {
      id: "isActive",
      label: "Status",
      minWidth: 100,
      maxWidth: 100,
      rowAlign: "center",
      colAlign: "center",
      renderCell: (data, row) => <Switch checked={data} />,
      renderExport: (data) => (data ? "Active" : "Inactive"),
    },
    {
      id: "price",
      label: "Price (₱)",
      minWidth: 150,
      maxWidth: 160,
      rowAlign: "center",
      colAlign: "left",
      renderCell: (data) =>
        typeof data === "object"
          ? data?.map((item, i) => (
              <Typography key={i} sx={{ fontSize: "0.875rem" }}>{`${capitalize(
                item?.label
              )}: ${parseFloat(item?.value)?.toFixed(2)}`}</Typography>
            ))
          : parseFloat(data)?.toFixed(2),
    },
    {
      id: "option",
      label: "Options",
      minWidth: 150,
      maxWidth: 200,
      rowAlign: "center",
      colAlign: "center",
      renderCell: (data) =>
        data?.map((item) => (
          <Box
            key={item}
            sx={{ display: "flex", flexDirection: "row", ...styles.common }}
          >
            <ArrowRightIcon sx={{ position: "relative", top: -2 }} />
            <Typography sx={{ fontSize: ".875rem" }}>{item}</Typography>
          </Box>
        )),
      renderExport: (data) =>
        data?.map((item, i) => (
          <ul key={i}>
            <li>{item}</li>
          </ul>
        )),
    },
    {
      id: "stock",
      label: "Stocks",
      minWidth: 100,
      maxWidth: 100,
      rowAlign: "center",
      colAlign: "center",
      renderCell: (data) => (data ? `${parseFloat(data)?.toFixed(2)}` : ""),
      renderExport: (data) => (data ? `${parseFloat(data)?.toFixed(2)}` : ""),
    },
    {
      id: "userId",
      label: "Created By",
      minWidth: 125,
      maxWidth: 150,
      rowAlign: "center",
      colAlign: "center",
    },
    {
      id: "createdAt",
      label: "Created Date",
      minWidth: 140,
      maxWidth: 140,
      rowAlign: "center",
      colAlign: "center",
      renderCell: (data) => dateTimeConverter(data, 2),
      renderExport: (data) => dateTimeConverter(data),
    },
    {
      id: "updatedAt",
      label: "Updated Date",
      minWidth: 140,
      maxWidth: 140,
      rowAlign: "center",
      colAlign: "center",
      renderCell: (data) => dateTimeConverter(data, 2),
      renderExport: (data) => dateTimeConverter(data),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 100,
      maxWidth: 125,
      rowAlign: "center",
      colAlign: "center",
      renderCell: (rowId, row) => {
        return (
          <>
            <IconButton
              size="small"
              onClick={() => handleDelete(true, "isDeleted", row.productId)}
              disabled={isOwner(row?.userId)}
              sx={{ color: "red" }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleEdit(row)}
              disabled={isOwner(row?.userId)}
              sx={{ color: "blue" }}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleEdit = (row) => setEditData(row);
  const handleDelete = (data, field, productId) => {
    const statusUpdate = { [`${field}`]: data };
    setPatchData({ statusUpdate, field, productId });
  };

  return { columns, patchData, setPatchData, editData, setEditData };
};

export default useMenu;
