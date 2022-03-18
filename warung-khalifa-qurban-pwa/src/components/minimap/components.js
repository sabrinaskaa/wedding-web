import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API || "";

const styles = makeStyles(theme => ({
  wrapper: {
    height: 172,
    width: "100%",
    border: "1px dashed #A6A6A6",
    borderRadius: 12
  },
  marker: {
    zIndex: 4,
    top: 0,
    color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
    width: 40,
    height: 40
  },
  markerWrapper: {
    position: "absolute",
    width: "100%",
    height: 172,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const Minimap = ({ lat, lng }) => {
  const classes = styles();
  const mapsMode = process.env.REACT_APP_MAPS_MODE || "osm";

  return (
    <Fragment>
      <div className={classes.wrapper} style={{ position: "relative" }}>
        <div className={classes.markerWrapper}>
          <LocationOnIcon className={classes.marker} />
        </div>
        {mapsMode === "google" ? (
          <img
            alt="static maps"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=18&size=400x400&key=${API_KEY}&style=feature:all|element:labels.text.fill|saturation:36|color:0x333333|lightness:40&style=feature:all|element:labels.text.stroke|visibility:on|color:0xffffff|lightness:16&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative|element:geometry.fill|color:0xfefefe|lightness:20&style=feature:administrative|element:geometry.stroke|color:0xfefefe|lightness:17|weight:1.2&style=feature:administrative.country|element:geometry.fill|color:0x949494&style=feature:administrative.country|element:labels.text.fill|color:0xb7b7b7&style=feature:administrative.province|element:labels.text.fill|color:0xb3b3b3&style=feature:administrative.locality|element:labels.text.fill|color:0xa19e9e&style=feature:administrative.neighborhood|element:labels.text.fill|color:0x878787&style=feature:administrative.land_parcel|element:labels.text.fill|color:0x9b9b9b&style=feature:poi|element:geometry|color:0xf5f5f5|lightness:21&style=feature:poi.park|element:geometry|color:0xdedede|lightness:21&style=feature:road.highway|element:geometry.fill|color:0xffffff|lightness:17&style=feature:road.highway|element:geometry.stroke|color:0xffffff|lightness:29|weight:0.2&style=feature:road.arterial|element:geometry|color:0xffffff|lightness:18&style=feature:road.local|element:geometry|color:0xffffff|lightness:16&style=feature:road.local|element:labels.text.fill|color:0xb3b3b3&style=feature:transit|element:geometry|color:0xf2f2f2|lightness:19&style=feature:water|element:geometry|color:0xe9e9e9|lightness:17`}
          />
        ) : (
          <MapContainer
            center={[lat, lng]}
            zoom={50}
            dragging={false}
            zoomControl={false}
            style={{ width: "100%", height: "100%", zIndex: 1 }}
          >
            <TileLayer
              // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        )}
      </div>
    </Fragment>
  );
};

export default Minimap;
