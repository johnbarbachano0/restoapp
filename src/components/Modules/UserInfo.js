import React from "react";
import CustomCard from "../CustomCard";
import Label from "../Label";
import { dateTimeConverter } from "../misc";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const { idToken, email, localId, refreshToken, loginDate, expiryDate } =
    useSelector((state) => state.auth.value.authData);

  const user = [
    {
      label: "UserId",
      value: localId,
    },
    {
      label: "Email",
      value: email,
    },
    {
      label: "Login Date",
      value: dateTimeConverter(loginDate),
    },
    {
      label: "Token Expiry",
      value: dateTimeConverter(expiryDate),
    },
    {
      label: "Access Token",
      value: idToken,
    },
    {
      label: "Refresh Token",
      value: refreshToken,
    },
  ];

  return (
    <CustomCard>
      {user?.map((item, i) => (
        <Label key={i} label={item?.label} value={item.value} />
      ))}
    </CustomCard>
  );
};

export default UserInfo;
