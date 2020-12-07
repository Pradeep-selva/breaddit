import React from "react";

const widths = {
  xs: 20,
  sm: 30,
  lg: 50
};

export const avatarStyle = (size: "xs" | "sm" | "lg"): React.CSSProperties => ({
  borderRadius: "50%",
  width: widths[size],
  height: widths[size],
  fontSize: 10
});
