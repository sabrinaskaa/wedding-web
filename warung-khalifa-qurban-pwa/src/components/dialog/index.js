import React from "react";
import {
  Dialog as BaseDialog,
  withStyles,
  Paper,
  makeStyles,
  Button
} from "@material-ui/core";
// import Draggable from "react-draggable";
import PropTypes from "prop-types";

const StyledPaper = withStyles({
  root: {
    bottom: "0px",
    position: "fixed",
    marginBottom: "unset",
    borderRadius: "16px 16px 0px 0px",
    padding: "16px",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 444,
    width: "100%"
  }
})(Paper);

const useStyles = makeStyles({
  sliderBar: {
    width: "80px",
    height: "4px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    alignSelf: "center",
    cursor: "pointer",
    marginBottom: 24
  },
  button: {
    backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    color: process.env.REACT_APP_COLOR_FONT || "#000000",
    fontWeight: 700,
    marginTop: 38,
    bottom: 20
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 7
  },
  subtitle: {
    fontSize: 12,
    color: "#808080",
    marginBottom: 37
  },
  fullPaper: {
    marginLeft: "-16px",
    position: "absolute",
    bottom: 0,
    height: "fit-content",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    textAlign: "center"
  }
});

// function CustomPaper(props) {
//   return (
//     <Draggable
//       axis="y"
//       handle="#draggable-dialog-title"
//       cancel={'[class*="MuiDialogContent-root"]'}
//       bounds={{ top: 0 }}
//       onDrag={(e, data) => {
//         if (data.y > 100) {
//           props.close();
//         }
//       }}
//     >
//       <StyledPaper {...props} />
//     </Draggable>
//   );
// }

const CustomDialog = ({
  onClose,
  open,
  avatar,
  content,
  button,
  push = null,
  addons = null
}) => {
  const classes = useStyles();

  return (
    <BaseDialog
      onClose={onClose}
      open={open}
      disableScrollLock
      PaperComponent={StyledPaper}
      PaperProps={{ close: onClose }}
      aria-labelledby="draggable-dialog-title"
      // classes={{ paperFullScreen: classes.fullPaper }}
      // fullScreen
    >
      <div
        style={{
          height: "100%",
          width: "100%"
          // display:"flex"
          // flexDirection: "column",
          // justifyContent: "space-between",
          // alignItems: "center"
        }}
      >
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <div id="draggable-dialog-title" className={classes.sliderBar} />
        </div>
        {avatar && (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <img
              src={avatar}
              alt="avatar-dialog"
              style={{ width: 200, marginBottom: 38 }}
            />
          </div>
        )}
        {content}
        <div
          style={{
            width: "100%",
            maxWidth: 444,
            bottom: 0,
            position: "fixed",
            display: "flex",

            justifyContent:
              window.location.pathname === "/cart-shipment" ? "center" : "unset"
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              zIndex: 999,
              width: "91%"
            }}
          >
            <Button
              className={classes.button}
              style={{
                backgroundColor: addons
                  ? "rgb(173, 173, 173)"
                  : process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                width: "100%"
              }}
              variant="contained"
              fullWidth
              onClick={push ? push : onClose}
              disabled={addons}
            >
              {button}
            </Button>
          </div>
        </div>
      </div>
    </BaseDialog>
  );
};

CustomDialog.defaultProps = {
  avatar: ""
};

CustomDialog.propTypes = {
  avatar: PropTypes.string,
  content: PropTypes.func.isRequired,
  button: PropTypes.string.isRequired
};

export default CustomDialog;
