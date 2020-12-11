import { Badge, IconButton, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { GrMail } from "react-icons/gr";
import { useHistory } from "react-router";
import { DARK_GREY, SMOKEY_WHITE } from "../../Common/colors";
import { RouteNames } from "../../Configs";
import { IProps } from "./index";

const NotificationBadge = ({ notifications }: IProps) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const unseenNotificationCount = notifications.filter((item) => !!item.Seen)
    .length;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onNotificationClick = (sender: string) => {
    history.push(`${RouteNames.user}/${sender}`);
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton style={{ flex: 1, marginRight: 15 }} onClick={handleClick}>
        <Badge badgeContent={unseenNotificationCount} color={"error"}>
          <GrMail color={SMOKEY_WHITE} />
        </Badge>
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: DARK_GREY
          }
        }}
        style={{
          marginTop: "2rem"
        }}
      >
        {notifications.map((item) => (
          <MenuItem onClick={() => onNotificationClick(item.Sender)}>
            {item.Content}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default NotificationBadge;
