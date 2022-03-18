/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Button, Container, CssBaseline, Typography } from "@material-ui/core";

import AppBar from "../../components/app-bar";
import Loading from "../../components/loading";
import { getUserAddrres, setDefaultUserAddrres } from "../../services/address";
import { withTransaction } from "@elastic/apm-rum-react";
import CardAddress from "../../components/card-address";
import EmptyAddress from "../../vector/empty-address";
import { useIntl } from "react-intl";

function AddressProfile(props) {
  const intl = useIntl();
  const { classes } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const user = JSON.parse(localStorage.getItem("users"));
  const history = useHistory();

  const initializeApp = async () => {
    setIsLoading(true);
    const listAddress = await getUserAddrres();
    setAddresses(listAddress?.data);
    setIsLoading(false);
    localStorage.setItem("addressProfile", true);
  };

  const handleSetDefaultAddress = id => {
    setIsLoading(true);
    setDefaultUserAddrres(id)
      .then(res => {
        initializeApp();
        localStorage.setItem("selectedAddress", JSON.stringify(res.data));
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        alert("Gagal set-default address");
      });
  };

  const handleUpdate = id => {
    history.push(`/cart-shipment/update-address?id=${id}`);
  };
  useEffect(() => {
    initializeApp();
    localStorage.removeItem("temporaryData");
    localStorage.removeItem("temp_data_address");
    if (!user) {
      history.push("/cart-shipment?tabs=0");
    }
  }, []);

  return (
    <React.Fragment>
      <Container
        elevation={0}
        component="main"
        maxWidth="xs"
        className={classes.container}
      >
        <CssBaseline />
        <AppBar
          title={`${intl.formatMessage({
            id: "address.addressBar.requirements"
          })}`}
          goBack={true}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {addresses.map(item => (
              <CardAddress
                item={item}
                primaryAddress={() => handleSetDefaultAddress(item.id)}
                updateAddress={() => {
                  handleUpdate(item.id);
                  localStorage.setItem("addressProfile", true);
                }}
              />
            ))}
            {addresses.length < 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "64vh",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                <EmptyAddress />
                <Typography
                  style={{ marginTop: 32, fontWeight: 600, fontSize: 16 }}
                >
                  {""}
                  {intl.formatMessage({
                    id: "address.requirements.1.0"
                  })}
                </Typography>
                <Typography
                  style={{ marginTop: 16, color: "#808080", fontSize: 12 }}
                >
                  {""}
                  {intl.formatMessage({
                    id: "address.requirements.2.0"
                  })}
                </Typography>
              </div>
            )}
          </>
        )}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            maxWidth: 444,
            width: "100%",
            padding: "16px",
            backgroundColor: "white"
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
              textTransform: "capitalize",
              width: "100%",
              color: process.env.REACT_APP_COLOR_FONT || "#000000",
              fontWeight: "bold",
              fontFamily:
                process.env.REACT_APP_FONT_FAMILY_BUTTON || "Open Sans"
            }}
            onClick={() => {
              history.push("/new-address");
              localStorage.removeItem("selectedAddress");
              localStorage.setItem("addressProfile", true);
            }}
          >
            {""}
            {intl.formatMessage({
              id: "address.buttonAdd.1.0"
            })}
          </Button>
        </div>
      </Container>
    </React.Fragment>
  );
}
export default withTransaction("AddressProfile", "component")(AddressProfile);
