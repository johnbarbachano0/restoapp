import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import CustomAlert from "../components/CustomAlert";

import { loginSchema, registerSchema } from "../schema/authSchema";
import { setAuthData } from "../features/AuthSlice";
import {
  useAuthRegisterMutation,
  useAuthLoginMutation,
} from "../services/AuthService";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Resto
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [authRegister] = useAuthRegisterMutation();
  const [authLogin] = useAuthLoginMutation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      email: "",
      password: "",
      rePassword: "",
    },
  });

  //Functions
  const handlePage = () => setLogin((prev) => !prev);
  const handleAlert = () => setAlert(null);

  const onSubmit = async (data) => {
    const req = { ...data, returnSecureToken: true };
    setLoading(true);
    const authService = isLogin ? authLogin(req) : authRegister(req);
    authService
      .then((res) => {
        setLoading(false);
        if (res?.error?.status === 400) {
          var message;
          switch (res?.error?.data?.error?.message) {
            case "EMAIL_NOT_FOUND": {
              message = "Email not registered.";
              break;
            }
            case "INVALID_PASSWORD": {
              message = "Incorrect Password.";
              break;
            }
            case "USER_DISABLED": {
              message = "Disabled account, contact Admin.";
              break;
            }
            case "EMAIL_EXISTS": {
              message = "Email already in use.";
              break;
            }
            case "TOO_MANY_ATTEMPTS_TRY_LATER": {
              message = "Too Many Attempts! Try again later.";
              break;
            }
            default: {
              throw new Error();
            }
          }
          setAlert({ type: "error", message });
        } else if (res?.data) {
          reset();
          !isLogin &&
            setAlert({ type: "success", message: "Registration Success!" });
          dispatch(setAuthData({ authData: res?.data }));
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        setAlert({
          type: "error",
          message: "An error has occurred. Please try again.",
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {alert && (
          <CustomAlert
            type={alert?.type}
            message={alert.message}
            onAlertEnd={handleAlert}
          />
        )}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign {isLogin ? "In" : "Up"}
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={onChange}
                value={value}
                helperText={errors?.email?.message}
                error={errors?.email ? true : false}
                disabled={isLoading}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
                value={value}
                helperText={errors?.password?.message}
                error={errors?.password ? true : false}
                disabled={isLoading}
              />
            )}
          />

          {!isLogin && (
            <Controller
              control={control}
              name="rePassword"
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  name="rePassword"
                  label="Retype Password"
                  type="password"
                  id="rePassword"
                  autoComplete="current-password"
                  onChange={onChange}
                  value={value}
                  helperText={errors?.rePassword?.message}
                  error={errors?.rePassword ? true : false}
                  disabled={isLoading}
                />
              )}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1 }}
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href={isLoading ? "#" : process.env.REACT_APP_GMAIL_FORGOT}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={isLoading ? null : handlePage}
                href={"#"}
                variant="body2"
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: alert ? 8 : 4 }} />
    </Container>
  );
};

export default Login;
