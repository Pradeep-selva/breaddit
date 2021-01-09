import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { GrEdit } from "react-icons/gr";
import { DARK_GREY } from "../../Common/colors";
import { avatarStyle } from "./styles";

interface IProps {
  url: string;
  size?: "xs" | "sm" | "lg" | "xl" | "xxl";
  style?: React.CSSProperties;
  className?: string;
  onEdit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Avatar = ({ url, size, style, className, onEdit }: IProps) => (
  <div style={{ position: "relative" }}>
    <img
      src={url}
      style={{
        ...avatarStyle(size || "sm"),
        ...style
      }}
      alt={"avatar"}
      className={className || ""}
    />
    {!!onEdit && (
      <Tooltip title={"Edit details"}>
        <IconButton
          size={"small"}
          onClick={onEdit || undefined}
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            backgroundColor: "white"
          }}
        >
          <GrEdit color={DARK_GREY} />
        </IconButton>
      </Tooltip>
    )}
  </div>
);

export default Avatar;
