import { Button } from "@mui/material";

const CustomButtom = (props) => {
  return (
    <Button variant="contained" {...props} sx={{ minWidth: 100, ...props?.sx }}>
      {props.children}
    </Button>
  );
};

export default CustomButtom;
