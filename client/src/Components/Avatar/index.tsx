import React from "react";
import { avatarStyle } from "./styles";

interface IProps {
  url: string;
  size: "xs" | "sm" | "lg";
}

const Avatar = ({ url, size }: IProps) => (
  <img src={url} style={avatarStyle(size)} alt={"avatar"} />
);

export default Avatar;
