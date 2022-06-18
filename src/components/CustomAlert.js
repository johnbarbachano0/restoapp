import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import useCommon from "./useCommon";
import useCountdown from "./useCountdown";

export default function CustomAlert({ type, message, onAlertEnd }) {
  const { isMobile } = useCommon();
  const { countdown } = useCountdown(5);

  //Listeners
  useEffect(() => {
    countdown === 0 && onAlertEnd();
  }, [countdown, onAlertEnd]);

  if (countdown === 0) return null;

  return (
    <Stack
      sx={{
        width: isMobile ? "100%" : 396,
        position: "fixed",
        top: !isMobile ? 0 : null,
        bottom: isMobile ? 0 : null,
        zIndex: 1,
      }}
      spacing={2}
    >
      {type === "error" && <Alert severity="error">{message}</Alert>}
      {type === "warning" && <Alert severity="warning">{message}</Alert>}
      {type === "info" && <Alert severity="info">{message}</Alert>}
      {type === "success" && <Alert severity="success">{message}</Alert>}
    </Stack>
  );
}
