import React, { useState, useEffect } from "react";
import {
  Container,
  makeStyles,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  Slide,
  CircularProgress
} from "@material-ui/core";

import { useHistory, useLocation } from "react-router";
import {
  ArrowBackIos as ArrowBackIcon,
  NavigationOutlined
} from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Geocode from "react-geocode";
import MapsGoogle from "../../components/maps-google/components";
import MapLeaflet from "../../components/map-leaflet";
import { getLocationByOpenStreetMapReverse } from "../../services/address";
import { withTransaction } from "@elastic/apm-rum-react";

const styles = makeStyles(theme => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "white",
    minHeight: "100vh",
    maxWidth: 444,
    width: "100%"
  },
  backButton: {
    boxShadow: "0px 0px 7px -2px rgba(50, 50, 50, 1)",
    width: "fit-content",
    borderRadius: 10,
    padding: "8px 2px 8px 12px",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    zIndex: 9999,
    cursor: "pointer",
    marginTop: 16,
    marginLeft: 16
  },
  nope: {
    height: 5,
    width: 100,
    backgroundColor: "#e4e4e4",
    borderRadius: 30,
    margin: "20px auto",
    marginTop: 0,
    cursor: "pointer"
  },
  detailWrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "fixed",
    bottom: 0,
    backgroundColor: "#fff",
    maxWidth: 412,
    width: "90%",
    padding: 16
  },
  navigatorIconWrapper: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: "fit-content",
    padding: 6,
    display: "flex",
    borderRadius: "50%"
  },
  marker: {
    zIndex: 9999,
    top: 0,
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    width: 40,
    height: 40
  },
  mapnavicon: {
    position: "fixed",
    zIndex: 9999,
    top: 0,
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    width: 40,
    height: 40
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Maps() {
  const classes = styles();
  const theme = useTheme();
  const query = useQuery();
  const history = useHistory();
  const id = query.get("id");
  const mapsMode = process.env.REACT_APP_MAPS_MODE || "osm";
  const address = JSON.parse(localStorage.getItem("selectedAddress"));
  const updateMap = JSON.parse(localStorage.getItem("temporaryData"));
  const user = JSON.parse(localStorage.getItem("users"));
  const [coordinates, setCoordinates] = useState([null, null]);
  const Laptop = useMediaQuery("(min-width:992px)");
  const [marginIcon, setMarginIcon] = useState({
    left: 0,
    top: 0
  });
  const [currentLocation, setCurrentLocation] = useState({ display_name: "" });
  const [isLoading, setIsLoading] = useState(true);
  const lat = query.get("lat");
  const long = query.get("long");
  console.log(mapsMode);
  useEffect(() => {
    setMarginIcon({
      left: window.screen.width / 2 - 20,
      top: (window.screen.height - 185) / 2 - 20
    });

    setCoordinates([lat, long]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapsMode === "google") {
      const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API || "";

      Geocode.setApiKey(API_KEY);
      Geocode.setLanguage("id");
      Geocode.fromLatLng(coordinates[0], coordinates[1]).then(
        response => {
          const address = response.results[0].formatted_address;
          setCurrentLocation({ display_name: address });
          setIsLoading(false);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      setIsLoading(true);
      const fetch = async () => {
        const response = await getLocationByOpenStreetMapReverse(
          coordinates[0],
          coordinates[1]
        );

        if (response) {
          setIsLoading(false);
          setCurrentLocation(response);
        }
      };
      fetch();
    }
  }, [coordinates, mapsMode]);

  const handleChangeCoordinate = (latitude, longitude) => {
    setCoordinates([latitude, longitude]);
  };

  return (
    <>
      {mapsMode === "google" && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "calc(100vh - 183px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <LocationOnIcon className={classes.marker} />
        </div>
      )}
      <Container maxWidth="xs" className={classes.root}>
        <div style={{ width: "100%", position: "relative" }}>
          <div
            className={classes.backButton}
            onClick={() =>
              id
                ? history.push(`/new-address/detail?id=${id}`)
                : history.push("/new-address/detail")
            }
          >
            <ArrowBackIcon style={{ color: theme.palette.primary.main }} />
          </div>
        </div>

        <div style={{ height: "100%", paddingBottom: 183 }}>
          {mapsMode === "google" ? (
            <>
              <MapsGoogle
                lng={long}
                lat={lat}
                handleChangeCoordinate={handleChangeCoordinate}
              />
            </>
          ) : (
            <>
              <MapLeaflet
                center={[lat, long]}
                handleChangeCoordinate={handleChangeCoordinate}
              />
              <LocationOnIcon
                className={classes.mapnavicon}
                style={{
                  marginLeft: Laptop ? 202 : "45%",
                  marginTop: Laptop ? marginIcon.top : "45%"
                }}
              />
            </>
          )}
        </div>

        {!isLoading ? (
          <div className={classes.detailWrapper}>
            <div className={classes.nope} />
            <Typography style={{ fontWeight: "bold" }}>
              Tetapkan Titik Lokasi
            </Typography>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 8 }}
            >
              <div className={classes.navigatorIconWrapper}>
                <NavigationOutlined
                  style={{ color: theme.palette.primary.main }}
                />
              </div>
              <Typography variant="caption" style={{ marginLeft: 16 }}>
                {currentLocation.display_name}
              </Typography>
            </div>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              style={{
                marginTop: 16,
                color: process.env.REACT_APP_COLOR_FONT || "#000000",
                fontWeight: "bold",
                fontFamily:
                  process.env.REACT_APP_FONT_FAMILY_BUTTON || "Open Sans"
              }}
              onClick={() => {
                const newMap = {
                  ...updateMap,
                  latitude: coordinates[0],
                  longitude: coordinates[1]
                };
                if (!user && address) {
                  history.push(
                    `/cart-shipment/update-address?lat=${coordinates[0]}&long=${coordinates[1]}`
                  );
                  localStorage.setItem("temporaryData", JSON.stringify(newMap));

                  return;
                }
                if (id) {
                  history.push(
                    `/cart-shipment/update-address?id=${id}&lat=${coordinates[0]}&long=${coordinates[1]}`
                  );
                  localStorage.setItem("temporaryData", JSON.stringify(newMap));
                  return;
                }
                history.push(
                  `/new-address?lat=${coordinates[0]}&long=${coordinates[1]}`
                );
              }}
            >
              Set Lokasi
            </Button>
          </div>
        ) : (
          <div className={classes.detailWrapper}>
            <div className={classes.nope} />
            <Skeleton variant="text" width={150} />
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 8 }}
            >
              <div
                className={classes.navigatorIconWrapper}
                style={{ border: "none" }}
              >
                <Skeleton variant="circle" height={40} width={40} />
              </div>
              <div style={{ width: "100%" }}>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="50%" />
              </div>
            </div>

            <Skeleton variant="text" width="100%" height={42} />
          </div>
        )}
        <Dialog open={isLoading} TransitionComponent={Transition}>
          <div style={{ padding: 10 }}>
            <CircularProgress />
          </div>
        </Dialog>
      </Container>
    </>
  );
}

export default withTransaction("Maps", "component")(Maps);
