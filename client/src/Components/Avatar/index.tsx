import React from "react";
import { avatarStyle } from "./styles";

interface IProps {
  url: string;
  size?: "xs" | "sm" | "lg" | "xl" | "xxl";
  style?: React.CSSProperties;
  className?: string;
}

const Avatar = ({ url, size, style, className }: IProps) => (
  <img
    src={url}
    style={{
      ...avatarStyle(size || "sm"),
      ...style
    }}
    alt={"avatar"}
    className={className || ""}
  />
);

export default Avatar;
