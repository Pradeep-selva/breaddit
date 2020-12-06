import React from "react";
import { avatarStyle } from "./styles";

interface IProps {
  url: string;
  size?: "xs" | "sm" | "lg";
  style?: React.CSSProperties;
}

const Avatar = ({ url, size, style }: IProps) => (
  <img
    src={url}
    style={{
      ...style,
      ...avatarStyle(size || "sm")
    }}
    alt={"avatar"}
  />
);

export default Avatar;
