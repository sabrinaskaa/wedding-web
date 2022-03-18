import React from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { useTheme } from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import "./index.css";

const MapLeaflet = (props) => {
  const { handleChangeCoordinate, center } = props;

  const GetCoordinate = (props) => {
    const { handleChangeCoordinate } = props;
    const map = useMapEvents({
      moveend: () => {
        const getCenterCoordinate = map.getCenter();
        handleChangeCoordinate(
          getCenterCoordinate.lat,
          getCenterCoordinate.lng
        );
      },
    });
    return null;
  };

  const GetUserPosition = (props) => {
    const theme = useTheme();
    const map = useMap();
    const { handleChangeCoordinate } = props;

    const styleGps = {
      zIndex: 9999,
      position: "absolute",
      bottom: 0,
      right: 0,
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      marginBottom: 20,
      marginRight: 10,
      width: 45,
      height: 45,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    };

    const goToView = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        handleChangeCoordinate(
          position.coords.latitude,
          position.coords.longitude
        );
        map.setView(
          [position.coords.latitude, position.coords.longitude],
          map.getZoom()
        );
      });
    };
    return (
      <div style={styleGps} onClick={goToView}>
        <GpsFixedIcon style={{ color: theme.palette.primary.main }} />
      </div>
    );
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={50}
        // style={{ height: "1vh", width: "444px" }}
        zoomControl={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GetCoordinate
          handleChangeCoordinate={(lat, lon) =>
            handleChangeCoordinate(lat, lon)
          }
        />
        <GetUserPosition
          handleChangeCoordinate={(lat, lon) =>
            handleChangeCoordinate(lat, lon)
          }
        />
      </MapContainer>
    </>
  );
};

export default MapLeaflet;
