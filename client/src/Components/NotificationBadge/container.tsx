import { Badge, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import React from "react";
import { GrMail } from "react-icons/gr";
import { useHistory } from "react-router";
import { setUserNotificationsSeen } from "../../APIs";
import { DARK_GREY, GREY, SMOKEY_WHITE } from "../../Common/colors";
import { RouteNames } from "../../Configs";
import { formatNumberNotation } from "../../Services";
import { IProps } from "./index";

const NotificationBadge = ({
  notifications = [],
  markNotificationsRead
}: IProps) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const unseenNotificationCount =
    notifications?.filter((item) => !item.Seen).length || 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    unseenNotificationCount > 0 && setUserNotificationsSeen();

    setTimeout(
      () => (unseenNotificationCount > 0 ? markNotificationsRead() : null),
      4000
    );
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
      <Tooltip title={"Notifications"}>
        <IconButton style={{ flex: 1, marginRight: 15 }} onClick={handleClick}>
          <Badge
            badgeContent={formatNumberNotation(unseenNotificationCount)}
            color={"error"}
          >
            <GrMail color={SMOKEY_WHITE} />
          </Badge>
        </IconButton>
      </Tooltip>
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
        {!!notifications.length ? (
          notifications.map((item) => (
            <MenuItem
              onClick={() => onNotificationClick(item.Sender)}
              style={{ backgroundColor: !item.Seen ? GREY : DARK_GREY }}
            >
              {item.Content}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No notifications yet :O</MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default NotificationBadge;
