import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { withRouter } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import Cart from "../../vector/cartIcon.svg";

function Component(props) {
  const { classes } = props;
  const item = props.cartItems;
  const [selectedPasar, setSelectedPasar] = useState(
    JSON.parse(localStorage.getItem("selectedPasar"))
  );

  const useStyleku = makeStyles({
    "@global": {
      ".MuiBadge-colorPrimary": {
        backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
        color: process.env.REACT_APP_COLOR_FONT || "#000000",
        fontWeight: "bold"
      },
      ".MuiFab-root": {
        boxShadow: "0px -5px 20px rgba(135, 202, 254, 0.16)"
      },
      ".MuiBadge-anchorOriginTopLeftRectangle": {
        top: 7,
        left: 8
      }
    }
  });

  useStyleku();
  return (
    <React.Fragment>
      {item.length > 0 && (
        <Box
          align="right"
          position="static"
          style={{
            position: "fixed",
            bottom: 70,
            paddingRight: "2%",
            // width: "100%",
            // maxWidth: 442,
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            badgeContent={item.length}
            color="primary"
          >
            <Fab
              style={{ backgroundColor: "#4B76C2" }}
              onClick={() => {
                props.history.push(props.to);
              }}
            >
              <img src={Cart} />
            </Fab>
          </Badge>
        </Box>
      )}
    </React.Fragment>
  );
}

export default withRouter(Component);
