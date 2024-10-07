import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);

  // const options = [
  //   { icon: <ListAltIcon />, name: "Orders", func: orders },
  //   { icon: <PersonIcon />, name: "Profile", func: account },
  //   { icon: <ExitToAppIcon />, name: "logout", func: logoutUser },
  // ];

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        <SpeedDialAction icon={<DashboardIcon />} tooltipTitle="Dashboard" />
      </SpeedDial>
    </>
  );
};

export default UserOptions;
