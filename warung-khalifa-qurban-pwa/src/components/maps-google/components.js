import { GoogleMap } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const mapStyles = {
  height: "calc(100vh - 183px)",
  width: "100%"
};

const MapsGoogle = ({ lng, lat, handleChangeCoordinate }) => {
  const [defaultCenter, setDefaultCenter] = useState({
    lat: Number(lat),
    lng: Number(lng)
  });
  let marker = null;

  useEffect(() => {
    handleChangeCoordinate(defaultCenter.lat, defaultCenter.lng);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCenter]);

  const handleChangePosition = () => {
    setDefaultCenter({
      lat: marker?.state?.map
        ?.getBounds()
        .getCenter()
        .lat(),
      lng: marker?.state?.map
        ?.getBounds()
        .getCenter()
        .lng()
    });
  };

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      center={defaultCenter}
      onDragEnd={handleChangePosition}
      ref={input => {
        marker = input;
      }}
      zoom={20}
      options={{ disableDefaultUI: true }}
    />
  );
};

export default MapsGoogle;
