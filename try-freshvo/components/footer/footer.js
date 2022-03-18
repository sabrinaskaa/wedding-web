import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { withRouter } from "next/router";
import Box from "@material-ui/core/Box";

const styles = {
  root: {
    width: "100%",
    color: "#a3a3a3",
    fill: "#a3a3a3",
    fontWeight: 700,
    // "&$selected": {
    //   color: "#FF7632",
    //   fill: "#FF7632"
    // }
  },
  stickToBottom: {
    width: "100%",
    maxWidth: 444,
    position: "fixed",
    bottom: 0,
    border: "0px solid #e0e0e0",
    boxShadow: "0px 0px 2px #9e9e9e"
  }
};

function BottomNavigationApp(props) {
  const { classes } = props;
  const actionClasses = props.classes;
  // const [value, setValue] = useState(0);
  // const intl = useIntl();

  // useEffect(() => {
  //   let newValue = 0;
  //   switch (props.location.pathname) {
  //     case "/":
  //       newValue = 0;
  //       break;
  //     case "/orders":
  //       newValue = 1;
  //       break;
  //     case "/help":
  //       newValue = 2;
  //       break;
  //     case "/profile":
  //       newValue = 3;
  //       break;
  //     default:
  //       newValue = 0;
  //   }
  //   setValue(newValue);
  // }, [props.location.pathname]);

  // const handleChange = (event, value) => {
  //   setValue(value);
  //   switch (value) {
  //     case 0:
  //       props.history.push("/");
  //       return;
  //     case 1:
  //       props.history.push("/orders");
  //       return;
  //     case 2:
  //       props.history.push("/help");
  //       return;
  //     case 3:
  //       props.history.push("/profile");
  //       break;
  //     default:
  //   }
  // };

  return (
    <Box
      boxShadow={1}
      display="flex"
      justifyContent="center"
      bgcolor="background.paper"
    >
      <BottomNavigation
        showLabels
        className={classes.stickToBottom}
      >
        <BottomNavigationAction
          classes={actionClasses}
          label={
            <b style={{ color: "#00A739", fontSize: 11 }}>Belanja</b>
          }
          icon={
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="#00A739"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.85 1.52L19.9 5.89C20.15 6.91 19.92 7.96 19.28 8.78C19.2264 8.84707 19.1592 8.90964 19.0936 8.97073L19.0936 8.97075L19.0936 8.97076L19.0936 8.97078C19.0614 9.00076 19.0296 9.03038 19 9.06V16C19 17.1 18.1 18 17 18H3.00001C1.90001 18 1.00001 17.1 1.00001 16V9.06C0.964006 9.02 0.924806 8.9832 0.885606 8.9464C0.826806 8.8912 0.768006 8.836 0.720007 8.77C0.0800067 7.95 -0.139993 6.91 0.100007 5.89L1.15001 1.52C1.36001 0.63 2.15001 0 3.05001 0H5.26001H7.28001H9.00001H11H12.72H14.73H16.94C17.85 0 18.63 0.62 18.85 1.52ZM4.44001 6.86L5.02001 2H3.05001L2.05001 6.36C1.95001 6.77 2.04001 7.2 2.30001 7.53C2.43001 7.71 2.74001 8 3.23001 8C3.84001 8 4.36001 7.51 4.44001 6.86ZM16.91 1.99L17.96 6.36C18.06 6.78 17.97 7.2 17.71 7.53C17.57 7.71 17.27 8 16.77 8C16.16 8 15.63 7.51 15.56 6.86L14.98 2L16.91 1.99ZM13.18 7.59C13.44 7.3 13.56 6.91 13.51 6.52L12.96 2H11V6.69C11 7.41 11.55 8 12.22 8C12.63 8 12.95 7.85 13.18 7.59ZM9.00001 6.69C9.00001 7.41 8.45001 8 7.71001 8C7.37001 8 7.06001 7.85 6.82001 7.59C6.57001 7.3 6.45001 6.91 6.49001 6.52L7.04001 2H9.00001V6.69ZM4.00001 16H16C16.55 16 17 15.55 17.01 15V9.97C16.9819 9.97351 16.9551 9.97825 16.9286 9.98292C16.8797 9.99157 16.8319 10 16.78 10C15.91 10 15.12 9.64 14.54 9.05C13.94 9.65 13.14 10 12.3 10C11.4 10 10.6 9.64 10.01 9.07C9.43001 9.64 8.65001 10 7.78001 10C6.87001 10 6.07001 9.65 5.47001 9.05C4.89001 9.64 4.10001 10 3.23001 10C3.17808 10 3.13036 9.99157 3.08139 9.98292C3.05492 9.97825 3.02808 9.97351 3.00001 9.97V15C3.00001 15.55 3.45001 16 4.00001 16Z"
                fill="#00A739"
              />
            </svg>
          }
        />
        <BottomNavigationAction
          classes={actionClasses}
          label={
            <b style={{ fontSize: 11 }}>Transaksi</b>
          }
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.6667 4.35L17.3333 3L16 4.35L14.6667 3L13.3333 4.35L12 3L10.6667 4.35L9.33333 3L8 4.35L6.66667 3L5.33333 4.35L4 3V21L5.33333 19.65L6.66667 21L8 19.65L9.33333 21L10.6667 19.65L12 21L13.3333 19.65L14.6667 21L16 19.65L17.3333 21L18.6667 19.65L20 21V3L18.6667 4.35ZM5.77778 18.381V5.619H18.2222V18.381H5.77778ZM17.3333 16.5V14.7H6.66667V16.5H17.3333ZM17.3333 11.1V12.9H6.66667V11.1H17.3333ZM17.3333 9.3V7.5H6.66667V9.3H17.3333Z"
                fill="currentColor"
                classes={actionClasses}
              />
            </svg>
          }
        />
        <BottomNavigationAction
          classes={actionClasses}
          label={
            <b style={{ fontSize: 11 }}>Bantuan</b>
          }
          icon={
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0588 1H2.88235C1.83765 1 1 1.84706 1 2.88235V12.2941C1 13.3294 1.83765 14.1765 2.88235 14.1765H6.64706L9.47059 17L12.2941 14.1765H16.0588C17.0941 14.1765 17.9412 13.3294 17.9412 12.2941V2.88235C17.9412 1.84706 17.0941 1 16.0588 1Z"
                stroke="currentColor"
                strokeWidth="1.88235"
                classes={actionClasses}
              />
              <path
                d="M8.5293 11.6666C8.5293 12.0132 8.81022 12.2941 9.15675 12.2941C9.50328 12.2941 9.7842 12.0132 9.7842 11.6666C9.7842 11.3201 9.50328 11.0392 9.15675 11.0392C8.81022 11.0392 8.5293 11.3201 8.5293 11.6666Z"
                fill="currentColor"
                classes={actionClasses}
              />
              <path
                d="M9.15678 4.76465C7.77011 4.76465 6.64697 5.88779 6.64697 7.27445H7.90187C7.90187 6.58426 8.46658 6.01955 9.15678 6.01955C9.84697 6.01955 10.4117 6.58426 10.4117 7.27445C10.4117 8.52935 8.52933 8.37249 8.52933 10.4117H9.78423C9.78423 8.99994 11.6666 8.84308 11.6666 7.27445C11.6666 5.88779 10.5434 4.76465 9.15678 4.76465Z"
                fill="currentColor"
                classes={actionClasses}
              />
            </svg>
          }
        />
        <BottomNavigationAction
          classes={actionClasses}
          label={<b style={{ fontSize: 11 }}>Profile</b>}
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0C4.032 0 0 4.032 0 9C0 13.968 4.032 18 9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 9 0ZM4.563 14.652C4.95 13.842 7.308 13.05 9 13.05C10.692 13.05 13.059 13.842 13.437 14.652C12.213 15.624 10.674 16.2 9 16.2C7.326 16.2 5.787 15.624 4.563 14.652ZM9 11.25C10.314 11.25 13.437 11.781 14.724 13.347C15.642 12.141 16.2 10.638 16.2 9C16.2 5.031 12.969 1.8 9 1.8C5.031 1.8 1.8 5.031 1.8 9C1.8 10.638 2.358 12.141 3.276 13.347C4.563 11.781 7.686 11.25 9 11.25ZM9 3.6C7.254 3.6 5.85 5.004 5.85 6.75C5.85 8.496 7.254 9.9 9 9.9C10.746 9.9 12.15 8.496 12.15 6.75C12.15 5.004 10.746 3.6 9 3.6ZM7.65 6.75C7.65 7.497 8.253 8.1 9 8.1C9.747 8.1 10.35 7.497 10.35 6.75C10.35 6.003 9.747 5.4 9 5.4C8.253 5.4 7.65 6.003 7.65 6.75Z"
                fill="currentColor"
                classes={actionClasses}
              />
            </svg>
          }
        />
      </BottomNavigation>
    </Box>
  );
}

BottomNavigationApp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(BottomNavigationApp));
