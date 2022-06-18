import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const useCommon = () => {
  const isMobile = useMediaQuery("(max-width:576px)");
  const isMid = useMediaQuery("(max-width:768px)");
  const isLarge = useMediaQuery("(max-width:992px)");
  const isXLarge = useMediaQuery("(max-width:1200px)");
  const { palette } = useTheme();
  const user = useSelector((state) => state?.auth?.value?.authData);
  const isDark = palette?.mode === "dark";

  return { isMobile, isMid, isLarge, isXLarge, isDark, palette, user };
};

export default useCommon;
