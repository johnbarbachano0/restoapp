import React, { useEffect } from "react";
import { Button, Box, Dialog, DialogTitle } from "@mui/material";
import useCountdown from "../components/useCountdown";

const ConfirmModal = ({ message, onClose, onConfirm, open }) => {
  const { countdown, setCountdown } = useCountdown(9);

  useEffect(() => {
    countdown === 0 && onClose();
  }, [countdown, onClose]);

  useEffect(() => {
    open && setCountdown(9);
  }, [open, setCountdown]);

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle>{`Confirm ${message} (${countdown})`}?</DialogTitle>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
        }}
      >
        <Button
          variant={"contained"}
          onClick={() => onConfirm()}
          fullWidth
          sx={{ m: 0.25 }}
        >
          Yes
        </Button>
        <Button
          variant={"contained"}
          color={"error"}
          onClick={() => onClose()}
          fullWidth
          sx={{ m: 0.25 }}
        >
          No
        </Button>
      </Box>
    </Dialog>
  );
};

export default ConfirmModal;
