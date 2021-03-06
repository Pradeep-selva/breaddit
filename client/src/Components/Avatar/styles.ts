import React from "react";

const widths = {
  xs: 20,
  sm: 30,
  lg: 50,
  xl: 100,
  xxl: 200
};

export const avatarStyle = (
  size: keyof typeof widths
): React.CSSProperties => ({
  borderRadius: "50%",
  width: widths[size],
  height: widths[size],
  fontSize: 10
});
