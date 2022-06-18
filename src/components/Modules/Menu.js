import React, { useEffect, useState } from "react";
import CustomCard from "../CustomCard";
import CustomDialog from "../CustomDialog";
import HeadLabel from "../HeadLabel";
import NewMenuItem from "../NewMenuItem";
import { Box, IconButton, Tooltip } from "@mui/material";
import CustomAlert from "../CustomAlert";
import useCommon from "../useCommon";
import useMenu from "./useMenu";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../features/ProductsSlice";
import { setMaintenance } from "../../features/MaintenanceSlice";
import { useGetProductQuery } from "../../services/ProductService";
import { useGetMaintenanceQuery } from "../../services/MaintenanceService";
import { usePatchProductMutation } from "../../services/ProductService";

//Icons
import TableRowsIcon from "@mui/icons-material/TableRows";
import MainTable from "../MainTable/MainTable";
import AddIcon from "@mui/icons-material/Add";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import ConfirmModal from "../ConfirmModal";

const Menu = () => {
  const [newItem, setNewItem] = useState(false);
  const [alert, setAlert] = useState(null);
  const [download, setDownload] = useState(false);
  const { user } = useCommon();
  const { columns, editData, setEditData, patchData, setPatchData } = useMenu();
  const dispatch = useDispatch();
  const {
    data: productData,
    // isLoading: prodLoading,
    // isError: prodError,
    // refetch: refetchProducts,
  } = useGetProductQuery(user?.idToken);
  const { allProducts } = useSelector((state) => state.product.value);
  const {
    data: maintenanceData,
    // isLoading: maintenanceLoading,
    // isError: maintenanceError,
    // refetch: refetchMaintenance,
  } = useGetMaintenanceQuery(user?.idToken);
  const [patchProduct, { isLoading: patchLoading, isError: patchError }] =
    usePatchProductMutation();

  //Functions
  const handleCSV = () => setDownload((prev) => !prev);
  const handleAdd = () => setNewItem(true);
  const handleClose = () => {
    setNewItem(false);
    setEditData(null);
  };
  const handleAlert = () => setAlert(null);

  const startPatch = () => {
    const { statusUpdate, productId } = patchData;
    patchProduct({
      id: productId,
      editedProduct: statusUpdate,
      idToken: user?.idToken,
    })
      .then((res) => {
        const isSuccess = !res?.data?.error;
        console.log(res.data);
        setAlert({
          type: isSuccess ? "success" : "error",
          message: isSuccess
            ? "Update success!"
            : "Error encountered. Try Again",
        });
        setPatchData(null);
      })
      .catch((error) => {
        setAlert({ type: "error", message: "Error encountered. Try Again" });
        setPatchData(null);
      });
  };

  //Listener
  //Save allProducts to store
  useEffect(() => {
    productData && dispatch(setProducts({ allProducts: productData }));
  }, [productData, dispatch]);

  //Save maintenance to store
  useEffect(() => {
    maintenanceData && dispatch(setMaintenance(maintenanceData));
  }, [maintenanceData, dispatch]);

  return (
    <CustomCard>
      {/* <Filter />  // notimplemented*/}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HeadLabel icon={<TableRowsIcon />}>Results</HeadLabel>

        <Box>
          {allProducts && (
            <Tooltip title={"Download CSV"}>
              <IconButton onClick={handleCSV}>
                <SimCardDownloadIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={"Add"}>
            <IconButton onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <MainTable
        loading={false}
        rows={allProducts}
        columns={columns}
        onExport={download}
        filename="Products"
      />

      <CustomDialog
        title={newItem ? "Add New Product" : "Edit Product"}
        open={newItem || editData ? true : false}
        onClose={handleClose}
      >
        <NewMenuItem
          onClose={handleClose}
          editData={editData}
          type={newItem ? "add" : "edit"}
        />
      </CustomDialog>

      {alert && (
        <CustomAlert
          type={alert?.type}
          message={alert.message}
          onAlertEnd={handleAlert}
        />
      )}

      {patchData && (
        <ConfirmModal
          message={"Delete"}
          onClose={() => setPatchData(null)}
          onConfirm={() => startPatch()}
          open={patchData ? true : false}
        />
      )}
    </CustomCard>
  );
};

export default Menu;
