import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  makeStyles,
  CssBaseline,
  Paper,
  InputBase,
  Typography,
  Divider,
  AppBar,
  Toolbar
} from "@material-ui/core";
// import AppBar from "../../components/app-bar";
import Skeleton from "@material-ui/lab/Skeleton";
import { getLocationByOpenStreetMapStreet } from "../../services/address";
import _ from "lodash";
import CloseIcon from "@material-ui/icons/Close";
import RoomIcon from "@material-ui/icons/Room";
import { useHistory, useLocation } from "react-router";
import BackButton from "@material-ui/icons/ArrowBackIos";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import { withTransaction } from "@elastic/apm-rum-react";

const useStyles = makeStyles({
  container: {
    padding: 0,
    paddingTop: 64,
    backgroundColor: "#FAFAFA",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    maxWidth: 444
  },
  appBar: {
    left: "auto",
    right: "auto"
  },
  searchDiv: {
    height: 45,

    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    margin: "0px 16px 24px"
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    height: "100%"
  },
  inputInput: {
    width: "100%",
    fontSize: "14px !important"
  },

  listLocation: {
    display: "flex",
    alignItems: "center",
    padding: "10px 16px"
  }
});

const SkeletonLoading = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 16px",
          width: "100%"
        }}
      >
        <Skeleton
          variant="circle"
          width={40}
          height={40}
          animation="wave"
          style={{ marginRight: 15 }}
        />
        <Skeleton animation="wave" height={65} width="100%" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 16px",
          width: "100%"
        }}
      >
        <Skeleton
          variant="circle"
          width={40}
          height={40}
          animation="wave"
          style={{ marginRight: 15 }}
        />
        <Skeleton animation="wave" height={65} width="100%" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 16px",
          width: "100%"
        }}
      >
        <Skeleton
          variant="circle"
          width={40}
          height={40}
          animation="wave"
          style={{ marginRight: 15 }}
        />
        <Skeleton animation="wave" height={65} width="100%" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 16px",
          width: "100%"
        }}
      >
        <Skeleton
          variant="circle"
          width={40}
          height={40}
          animation="wave"
          style={{ marginRight: 15 }}
        />
        <Skeleton animation="wave" height={65} width="100%" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 16px",
          width: "100%"
        }}
      >
        <Skeleton
          variant="circle"
          width={40}
          height={40}
          animation="wave"
          style={{ marginRight: 15 }}
        />
        <Skeleton animation="wave" height={65} width="100%" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 16px",
          width: "100%"
        }}
      >
        <Skeleton
          variant="circle"
          width={40}
          height={40}
          animation="wave"
          style={{ marginRight: 15 }}
        />
        <Skeleton animation="wave" height={65} width="100%" />
      </div>
    </>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function DetailAddress() {
  const classes = useStyles();
  const query = useQuery();
  const [initialData, setInitialData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("users"));
  const address = JSON.parse(localStorage.getItem("selectedAddress"));
  const id = query.get("id");
  const geocodeMode = process.env.REACT_APP_PLACE_MODE || "osm";

  const {
    value,
    suggestions: { loading, status, data },
    setValue
  } = usePlacesAutocomplete({
    debounce: 300
  });

  const handleBack = () => {
    if (user) {
      if (id) {
        history.push(`/cart-shipment/update-address?id=${id}`);
      } else {
        history.push("/new-address");
      }
    } else if (address) {
      history.push("/cart-shipment/update-address");
    } else {
      history.push("/new-address");
    }
  };

  const onSearch = async q => {
    if (geocodeMode === "osm") {
      if (q !== "") {
        const response = await getLocationByOpenStreetMapStreet(q);
        setInitialData(response);
        if (response) setIsLoading(false);
      } else {
        setInitialData([]);
      }
    }
  };

  const delayedQuery = useCallback(
    _.debounce(q => {
      onSearch(q);
    }, 500),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      delayedQuery(search);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onTypeSearch = keyword => {
    setIsLoading(true);
    setSearch(keyword);
    if (geocodeMode === "google") {
      setValue(keyword);
    }
    // delayedQuery(keyword);
  };

  const handleSelect = ({ description }) => () => {
    getGeocode({ address: description })
      .then(results => {
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        user
          ? id
            ? history.push(`/address/maps?lat=${lat}&long=${lng}&id=${id}`)
            : history.push(`/address/maps?lat=${lat}&long=${lng}`)
          : history.push(`/address/maps?lat=${lat}&long=${lng}`);
      })
      .catch(error => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () => {
    return (
      <>
        {loading ? (
          <SkeletonLoading />
        ) : (
          <>
            {data.map(suggestion => {
              const {
                place_id,
                structured_formatting: { main_text, secondary_text }
              } = suggestion;

              return (
                <div key={place_id}>
                  <div
                    className={classes.listLocation}
                    onClick={handleSelect(suggestion)}
                  >
                    <div className={classes.locationIconBg}>
                      <RoomIcon
                        style={{
                          color: "grey",
                          borderRadius: "100%",
                          padding: 5,
                          border: "1px solid grey"
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: 20 }}>
                      <Typography
                        variant="body2"
                        style={{ fontWeight: "bold" }}
                      >
                        {main_text}
                      </Typography>
                      <Typography
                        variant="caption"
                        style={{ color: "#a0a4a8" }}
                      >
                        {secondary_text}
                      </Typography>
                    </div>
                  </div>
                  <Divider />
                </div>
              );
            })}
          </>
        )}
      </>
    );
  };

  const renderOsmSuggestions = () => {
    return (
      <>
        {isLoading ? (
          <SkeletonLoading />
        ) : (
          <>
            {initialData?.length !== 0 && (
              <React.Fragment>
                {initialData?.map(res => (
                  <div>
                    <div
                      className={classes.listLocation}
                      onClick={() => {
                        user
                          ? id
                            ? history.push(
                                `/address/maps?lat=${res.lat}&long=${res.lon}&id=${id}`
                              )
                            : history.push(
                                `/address/maps?lat=${res.lat}&long=${res.lon}`
                              )
                          : history.push(
                              `/address/maps?lat=${res.lat}&long=${res.lon}`
                            );

                        // fetchLocation(res.lat, res.lon)
                      }}
                    >
                      <div className={classes.locationIconBg}>
                        <RoomIcon
                          style={{
                            color: "grey",
                            borderRadius: "100%",
                            padding: 5,
                            border: "1px solid grey"
                          }}
                        />
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="body2"
                          style={{ fontWeight: "bold" }}
                        >
                          {res.display_name.slice(
                            0,
                            res.display_name.indexOf(",")
                          )}
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ color: "#a0a4a8" }}
                        >
                          {res.display_name}
                        </Typography>
                      </div>
                    </div>
                    <Divider />
                  </div>
                ))}
              </React.Fragment>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <AppBar
        style={{
          width: "100%",
          maxWidth: 444,
          backgroundColor: "white",
          boxShadow: "0px 1px 5px rgb(0 0 0 / 5%)"
        }}
        classes={{ positionFixed: classes.appBar }}
        elevation={1}
      >
        <Toolbar>
          <BackButton
            style={{
              color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
              cursor: "pointer",
              marginRight: 10
            }}
            onClick={() => handleBack()}
          />

          <strong style={{ color: "black" }}>Tambah Detail Alamat</strong>
        </Toolbar>
      </AppBar>
      <Paper style={{ minHeight: "90vh", paddingTop: 16 }} elevation={0}>
        <div
          style={{
            fontWeight: 500,
            fontSize: 12,
            marginBottom: 8,
            padding: "0px 16px"
          }}
        >
          Detail Alamat
        </div>
        <div className={classes.searchDiv}>
          <InputBase
            placeholder="Cari detail alamatmu ..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            InputProps={{
              "aria-label": "search"
            }}
            onChange={e => onTypeSearch(e.target.value)}
            value={geocodeMode === "google" ? value : search}
          />
          {geocodeMode === "google"
            ? value.length > 0 && <CloseIcon onClick={() => setValue("")} />
            : search.length > 0 && <CloseIcon onClick={() => setSearch("")} />}
        </div>
        {geocodeMode === "osm" ? (
          <>{renderOsmSuggestions()}</>
        ) : (
          <>{status === "OK" && <>{renderSuggestions()}</>}</>
        )}
      </Paper>
    </Container>
  );
}

export default withTransaction("DetailAddress", "component")(DetailAddress);
