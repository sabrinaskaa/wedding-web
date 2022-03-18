import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useIntl } from "react-intl";

const styles = {
  root: {
    width: "100%",
    color: "#a3a3a3",
    fill: "#a3a3a3",
    "&$selected": {
      color: "#FF7632",
      fill: "#FF7632"
    }
  },
  stickToBottom: {
    width: "100%",
    maxWidth: 442,
    position: "fixed",
    bottom: 0,
    border: "0px solid #e0e0e0",
    boxShadow: "0px 0px 2px #9e9e9e"
  }
};

function BottomNavigationApp(props) {
  const { classes } = props;
  const actionClasses = props.classes;
  const [value, setValue] = useState(0);
  const intl = useIntl();

  useEffect(() => {
    let newValue = 0;
    switch (props.location.pathname) {
      case "/":
        newValue = 0;
        break;
      case "/orders":
        newValue = 1;
        break;
      case "/help":
        newValue = 2;
        break;
      case "/profile":
        newValue = 3;
        break;
      default:
        newValue = 0;
    }
    setValue(newValue);
  }, [props.location.pathname]);

  const handleChange = (event, value) => {
    setValue(value);
    switch (value) {
      case 0:
        props.history.push("/");
        return;
      case 1:
        props.history.push("/orders");
        return;
      case 2:
        props.history.push("/help");
        return;
      case 3:
        props.history.push("/profile");
        break;
      default:
    }
  };

  return (
    <Box
      boxShadow={1}
      display="flex"
      justifyContent="center"
      bgcolor="background.paper"
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        className={classes.stickToBottom}
      >
        <BottomNavigationAction
          classes={actionClasses}
          label={
            <b style={{ fontSize: 10 }}>
              {intl.formatMessage({ id: "bottomNav.home" })}
            </b>
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.8505 4.52L21.9005 8.89C22.1505 9.91 21.9205 10.96 21.2805 11.78C21.2268 11.8471 21.1597 11.9096 21.0941 11.9707L21.0941 11.9707L21.0941 11.9708L21.0941 11.9708C21.0619 12.0008 21.0301 12.0304 21.0005 12.06V19C21.0005 20.1 20.1005 21 19.0005 21H5.00049C3.90049 21 3.00049 20.1 3.00049 19V12.06C2.96449 12.02 2.92529 11.9832 2.88609 11.9464C2.82729 11.8912 2.76849 11.836 2.72049 11.77C2.08049 10.95 1.86049 9.91 2.10049 8.89L3.15049 4.52C3.36049 3.63 4.1505 3 5.05049 3H7.26049H9.28049H11.0005H13.0005H14.7205H16.7305H18.9405C19.8505 3 20.6305 3.62 20.8505 4.52ZM6.4405 9.86L7.02049 5H5.05049L4.05049 9.36C3.95049 9.77 4.04049 10.2 4.30049 10.53C4.43049 10.71 4.74049 11 5.23049 11C5.8405 11 6.3605 10.51 6.4405 9.86ZM18.9105 4.99L19.9605 9.36C20.0605 9.78 19.9705 10.2 19.7105 10.53C19.5705 10.71 19.2705 11 18.7705 11C18.1605 11 17.6305 10.51 17.5605 9.86L16.9805 5L18.9105 4.99ZM15.1805 10.59C15.4405 10.3 15.5605 9.91 15.5105 9.52L14.9605 5H13.0005V9.69C13.0005 10.41 13.5505 11 14.2205 11C14.6305 11 14.9505 10.85 15.1805 10.59ZM11.0005 9.69C11.0005 10.41 10.4505 11 9.71049 11C9.3705 11 9.06049 10.85 8.8205 10.59C8.5705 10.3 8.4505 9.91 8.4905 9.52L9.04049 5H11.0005V9.69ZM6.00049 19H18.0005C18.5505 19 19.0005 18.55 19.0105 18V12.97C18.9824 12.9735 18.9556 12.9782 18.9291 12.9829C18.8801 12.9916 18.8324 13 18.7805 13C17.9105 13 17.1205 12.64 16.5405 12.05C15.9405 12.65 15.1405 13 14.3005 13C13.4005 13 12.6005 12.64 12.0105 12.07C11.4305 12.64 10.6505 13 9.7805 13C8.8705 13 8.0705 12.65 7.4705 12.05C6.89049 12.64 6.10049 13 5.23049 13C5.17857 13 5.13085 12.9916 5.08188 12.9829C5.0554 12.9782 5.02857 12.9735 5.00049 12.97V18C5.00049 18.55 5.4505 19 6.00049 19Z"
                fill="currentColor"
              />
            </svg>
          }
        />
        <BottomNavigationAction
          classes={actionClasses}
          label={
            <b style={{ fontSize: 11 }}>
              {intl.formatMessage({ id: "bottomNav.transaction" })}
            </b>
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
            <b style={{ fontSize: 11 }}>
              {intl.formatMessage({ id: "bottomNav.help" })}
            </b>
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
                d="M19.0588 5H5.88235C4.83765 5 4 5.84706 4 6.88235V16.2941C4 17.3294 4.83765 18.1765 5.88235 18.1765H9.64706L12.4706 21L15.2941 18.1765H19.0588C20.0941 18.1765 20.9412 17.3294 20.9412 16.2941V6.88235C20.9412 5.84706 20.0941 5 19.0588 5Z"
                stroke="currentColor"
                stroke-width="1.88235"
                classes={actionClasses}
              />
              <path
                d="M11.5293 15.6665C11.5293 16.013 11.8102 16.294 12.1567 16.294C12.5033 16.294 12.7842 16.013 12.7842 15.6665C12.7842 15.32 12.5033 15.0391 12.1567 15.0391C11.8102 15.0391 11.5293 15.32 11.5293 15.6665Z"
                fill="currentColor"
                classes={actionClasses}
              />
              <path
                d="M12.1563 8.76465C10.7696 8.76465 9.64648 9.88779 9.64648 11.2745H10.9014C10.9014 10.5843 11.4661 10.0196 12.1563 10.0196C12.8465 10.0196 13.4112 10.5843 13.4112 11.2745C13.4112 12.5294 11.5288 12.3725 11.5288 14.4117H12.7837C12.7837 12.9999 14.6661 12.8431 14.6661 11.2745C14.6661 9.88779 13.543 8.76465 12.1563 8.76465Z"
                fill="currentColor"
                classes={actionClasses}
              />
            </svg>
          }
        />
        <BottomNavigationAction
          classes={actionClasses}
          label={<b style={{ fontSize: 10 }}>Profile</b>}
          icon={
            // <svg
            //   width="18"
            //   height="18"
            //   viewBox="0 0 18 18"
            //   fill="none"
            //   xmlns="http://www.w3.org/2000/svg"
            // >
            //   <path
            //     fillRule="evenodd"
            //     clipRule="evenodd"
            //     d="M9 0C4.032 0 0 4.032 0 9C0 13.968 4.032 18 9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 9 0ZM4.563 14.652C4.95 13.842 7.308 13.05 9 13.05C10.692 13.05 13.059 13.842 13.437 14.652C12.213 15.624 10.674 16.2 9 16.2C7.326 16.2 5.787 15.624 4.563 14.652ZM9 11.25C10.314 11.25 13.437 11.781 14.724 13.347C15.642 12.141 16.2 10.638 16.2 9C16.2 5.031 12.969 1.8 9 1.8C5.031 1.8 1.8 5.031 1.8 9C1.8 10.638 2.358 12.141 3.276 13.347C4.563 11.781 7.686 11.25 9 11.25ZM9 3.6C7.254 3.6 5.85 5.004 5.85 6.75C5.85 8.496 7.254 9.9 9 9.9C10.746 9.9 12.15 8.496 12.15 6.75C12.15 5.004 10.746 3.6 9 3.6ZM7.65 6.75C7.65 7.497 8.253 8.1 9 8.1C9.747 8.1 10.35 7.497 10.35 6.75C10.35 6.003 9.747 5.4 9 5.4C8.253 5.4 7.65 6.003 7.65 6.75Z"
            //     fill="currentColor"
            //     classes={actionClasses}
            //   />
            // </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3ZM7.563 17.652C7.95 16.842 10.308 16.05 12 16.05C13.692 16.05 16.059 16.842 16.437 17.652C15.213 18.624 13.674 19.2 12 19.2C10.326 19.2 8.787 18.624 7.563 17.652ZM12 14.25C13.314 14.25 16.437 14.781 17.724 16.347C18.642 15.141 19.2 13.638 19.2 12C19.2 8.031 15.969 4.8 12 4.8C8.031 4.8 4.8 8.031 4.8 12C4.8 13.638 5.358 15.141 6.276 16.347C7.563 14.781 10.686 14.25 12 14.25ZM12 6.6C10.254 6.6 8.85 8.004 8.85 9.75C8.85 11.496 10.254 12.9 12 12.9C13.746 12.9 15.15 11.496 15.15 9.75C15.15 8.004 13.746 6.6 12 6.6ZM10.65 9.75C10.65 10.497 11.253 11.1 12 11.1C12.747 11.1 13.35 10.497 13.35 9.75C13.35 9.003 12.747 8.4 12 8.4C11.253 8.4 10.65 9.003 10.65 9.75Z"
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
