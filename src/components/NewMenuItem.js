import React, { useState } from "react";
import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { newItemSchema } from "../schema/newItemSchema";
import { dirtyValues, getIsoToday } from "./misc";
import {
  usePatchProductMutation,
  usePostProductMutation,
} from "../services/ProductService";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomAlert from "./CustomAlert";
import CustomSwitch from "./CustomSwitch";
import SubmitButtons from "./SubmitButtons";
import useCommon from "./useCommon";

const NewMenuItem = ({ type, onEdit, editData, optionData, ...props }) => {
  const isAdd = type === "add";
  const [alert, setAlert] = useState(null);
  const [optionsValue, setOptionsValue] = useState(editData?.option);
  const { categories } = useSelector(
    (state) => state.maintenance.value.maintenance
  );
  const { user } = useCommon();
  const { localId: userId, idToken } = user;
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(newItemSchema()),
    defaultValues: {
      categoryId: [...categories]?.shift()?.categoryId,
      productName: "",
      description: "",
      isActive: isAdd ? true : editData?.isActive,
      price: "",
      option: [],
      userId,
      stock: 0,
      ...editData,
    },
  });
  const [postProduct, { isLoading: postLoading }] = usePostProductMutation();

  const [patchProduct, { isLoading: patchLoading }] = usePatchProductMutation();

  const isLoading = postLoading || patchLoading;

  //Functions
  const handleAlert = () => setAlert(null);
  const handleChange = (evt, newValue, reason) => {
    if (newValue === "") return;
    if (reason === "clear") setOptionsValue([]);
    setOptionsValue(newValue);
    setValue("option", newValue, { shouldDirty: true });
  };
  const handleSwitch = (newValue) =>
    setValue("isActive", newValue, { shouldDirty: true });

  const handleClear = () => {
    reset();
    setOptionsValue(isAdd ? [] : editData?.option);
    setValue("option", [], { shouldDirty: false });
    setValue("isActive", isAdd ? true : editData?.isActive, {
      shouldDirty: false,
    });
  };

  const onSubmit = (data) => {
    const newData = isAdd
      ? {
          ...data,
          createdAt: getIsoToday(),
          updatedAt: getIsoToday(),
          isActive: true,
          isDeleted: false,
        }
      : dirtyValues(dirtyFields, data);

    const action = isAdd
      ? postProduct({ newProduct: newData, idToken })
      : patchProduct({
          id: editData?.productId,
          editedProduct: newData,
          idToken,
        });

    action
      .then((res) => {
        const isSuccess = isAdd ? res?.data?.name : !res?.data?.error;

        isSuccess
          ? props.onClose()
          : setAlert({
              type: "error",
              message: "Error encountered. Try Again",
            });
      })
      .catch((error) =>
        setAlert({ type: "error", message: "Error encountered. Try Again" })
      );
  };

  return (
    <>
      <Controller
        control={control}
        name="categoryId"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            select
            label="Category..."
            name="categoryId"
            onChange={onChange}
            value={value}
            helperText={errors?.categoryId?.message}
            error={errors?.categoryId ? true : false}
            disabled={isLoading}
            sx={{ m: 1, maxWidth: 500 }}
          >
            {categories.map(({ categoryId, label }) => (
              <MenuItem key={categoryId} value={categoryId}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="productName"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            label="Product..."
            name="productName"
            onChange={onChange}
            value={value}
            helperText={errors?.productName?.message}
            error={errors?.productName ? true : false}
            disabled={isLoading}
            sx={{ m: 1, maxWidth: 500 }}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            label="Description..."
            name="description"
            onChange={onChange}
            value={value}
            helperText={errors?.description?.message}
            error={errors?.description ? true : false}
            disabled={isLoading}
            sx={{ m: 1, maxWidth: 500 }}
          />
        )}
      />

      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            label="Price..."
            name="price"
            onChange={onChange}
            value={value}
            helperText={errors?.price?.message}
            error={errors?.price ? true : false}
            disabled={isLoading}
            sx={{ m: 1, maxWidth: 500 }}
            type="number"
            inputProps={{ min: 0 }}
          />
        )}
      />

      <Controller
        control={control}
        name="option..."
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            fullWidth
            multiple
            freeSolo
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={"Options..."}
                helperText={errors?.option?.message}
                error={errors?.option ? true : false}
                disabled={isLoading}
              />
            )}
            sx={{ m: 1, maxWidth: 500 }}
            onChange={handleChange}
            value={optionsValue}
          />
        )}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          maxWidth: 500,
          width: "100%",
        }}
      >
        <Box sx={{ flex: 5, my: 1, mr: 1 }}>
          <Controller
            control={control}
            name="stock"
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                label="Stock..."
                name="stock"
                onChange={onChange}
                value={value}
                helperText={errors?.stock?.message}
                error={errors?.stock ? true : false}
                disabled={isLoading}
                sx={{ width: "100%" }}
                type="number"
                inputProps={{ min: 0 }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Controller
            control={control}
            name="isActive"
            render={({ field: { onChange, value } }) => (
              <CustomSwitch
                onChange={handleSwitch}
                value={value}
                label={"Active"}
                sx={{ width: "100%" }}
                disabled={isAdd}
              />
            )}
          />
        </Box>
      </Box>

      <SubmitButtons
        onSubmit={handleSubmit(onSubmit)}
        onClear={handleClear}
        isLoading={isLoading}
        allowSubmit={isDirty}
        reset={isAdd ? false : true}
        sx={{ m: 1, maxWidth: 500 }}
      />

      {alert && (
        <CustomAlert
          type={alert?.type}
          message={alert.message}
          onAlertEnd={handleAlert}
        />
      )}
    </>
  );
};

export default NewMenuItem;
