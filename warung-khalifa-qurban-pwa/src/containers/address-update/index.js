import React, { useState, useEffect } from "react";
import {
  Container,
  makeStyles,
  CssBaseline,
  TextField,
  Paper,
  Typography,
  InputAdornment,
  InputBase,
  Button,
  Dialog,
  Divider,
  AppBar,
  Toolbar,
  CircularProgress,
  useMediaQuery
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactFlagsSelect from "react-flags-select";
import CountryData from "../../utilities/country-code";
import BackButton from "@material-ui/icons/ArrowBackIos";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {
  updateAddress,
  getAddressById,
  deleteAddress,
  getLocationByOpenStreetMapReverse,
  multipleSearch
} from "../../services/address";
import { useHistory, useLocation } from "react-router-dom";
import DataCountry from "../../utilities/country-data";
import Minimap from "./../../components/minimap/index";
import { withTransaction } from "@elastic/apm-rum-react";
import Geocode from "react-geocode";
import { Capitalize } from "../../utilities/capitalize";
import InfiniteScroll from "react-infinite-scroll-component";
import { validateEmail } from "../../utilities/validate-email";
import { useIntl } from "react-intl";

const useStyles = makeStyles({
  container: {
    padding: 0,
    paddingTop: 64,
    backgroundColor: "#FAFAFA",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    paddingBottom: 64
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
  searchIcon: {
    marginRight: 10
  },
  inputRoot: {
    marginLeft: 0,
    color: "inherit",
    width: "100%",
    height: "100%"
  },
  inputSearch: {
    marginLeft: 0,
    color: "inherit",
    width: "100%",
    height: "100%"
  },
  inputInput: {
    width: "100%",
    fontSize: "14px !important"
  },

  flagButton: {
    border: "unset",
    padding: "5px 0px",
    "&:focus": {
      outline: "unset"
    }
  },
  navButton: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    maxWidth: 444,
    padding: 16,
    backgroundColor: "white",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    zIndex: 100
  },
  button: {
    textTransform: "capitalize",
    width: "100%",
    "&:hover": {
      backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
    },
    color: process.env.REACT_APP_COLOR_FONT || "#000000",
    fontWeight: "bold",
    fontFamily: process.env.REACT_APP_FONT_FAMILY_BUTTON || "Open Sans"
  },
  noBorder: {
    border: "none"
  },
  input: {
    padding: 14
  },
  paperFullScreen: {
    maxWidth: 444,
    height: "auto",
    minHeight: "25vh",
    maxHeight: "70vh",
    paddingBottom: 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  card: {
    display: "flex",
    alignItems: "flex-end"
  },

  list: {
    margin: "70px 0px 0px",
    overflow: "auto"
  }
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UpdateAddress = () => {
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();
  const xs = useMediaQuery("(max-height:570px)");
  const sm = useMediaQuery("(max-height:670px)");
  const md = useMediaQuery("(max-height:740px)");
  const lg = useMediaQuery("(max-height:830px)");
  const mapsMode = process.env.REACT_APP_MAPS_MODE || "osm";
  const [lat, setLat] = useState(query.get("lat"));
  const [long, setLong] = useState(query.get("long"));
  const latLng = query.get("lat") && query.get("long") ? true : false;
  const user = JSON.parse(localStorage.getItem("users"));
  const addressProfile = localStorage.getItem("addressProfile");
  const address = JSON.parse(localStorage.getItem("selectedAddress"));
  const [selectedCountryCode, setSelectedCountryCode] = useState("ID");

  const [province, setProvince] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [searchProvinceData, setSearchProvinceData] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  // const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [mapAddress, setMapAddress] = useState({ display_name: "" });
  const [postalCode, setPostalCode] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  // eslint-disable-next-line
  const [totalData, setTotalData] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const intl = useIntl();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    label: "",
    provinceId: "",
    cityId: "",
    districtId: "",
    subdistrictId: "",
    postcode: "",
    address: "",
    latitude: "",
    longitude: "",
    note: "",
    country: "Indonesia"
  });
  const id = query.get("id");
  const countryCodeNumber = CountryData[selectedCountryCode]?.secondary.slice(
    1,
    CountryData[selectedCountryCode]?.secondary?.length
  );
  const errorEmail = isValidEmail || data.email === 0;

  //eslint-disable-next-line
  let newData = new Object();
  newData.name = data.name;
  newData.email = data.email;
  newData.phone = data.phone;
  newData.label = data.label;
  newData.provinceId = data.provinceId;
  newData.cityId = data.cityId;
  newData.districtId = data.districtId;
  newData.subdistrictId = data.subdistrictId;
  newData.postcode = data.postcode;
  newData.note = data.note;
  newData.address = data.address;
  newData.latitude = data.latitude;
  newData.longitude = data.longitude;
  newData.country = "Indonesia";
  data.default ? (newData.default = true) : (newData.default = false);

  const handleClickOpen = key => {
    setOpen(key);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeProvice = e => {
    setSearchProvinceData(e.target.value);
    setIsLoading(true);
    if (e.target.value < 1) {
      resetProvince();
    }
  };

  async function refetchLocation() {
    const listLocation = await multipleSearch(searchProvinceData, nextPage);
    setTimeout(() => {
      setProvince([...province, ...listLocation?.data]);
      setIsLoading(false);
      setTotalPage(listLocation?.meta?.totalPage);
      setTotalData(listLocation?.meta?.totalData);
      setNextPage(listLocation?.meta?.page + 1);
    }, 1000);
  }

  const resetProvince = () => {
    setSearchProvinceData("");
    async function fetchAPI() {
      const res = await multipleSearch();
      setProvince(res.data);
      if (res.meta.statusCode === 200) {
        setIsLoading(false);
      }
      setTotalPage(res?.meta?.totalPage);
      setTotalData(res?.meta?.totalData);
      setNextPage(res?.meta?.page + 1);
    }
    fetchAPI();
  };

  const handleSave = async () => {
    setIsLoading(true);
    const response = await updateAddress(id, {
      ...newData,
      phone: (countryCodeNumber + data.phone).replace("+", "")
      // phone: phoneCode.dial_code.replace("+", "") + data.phone,
    });

    if (response.meta.statusCode === 200) {
      setIsLoading(false);
      localStorage.removeItem("edit_data_address");
      if (addressProfile) {
        history.push("/profile/address");
      }
      if (!addressProfile) {
        history.push("/cart-shipment/address");
      }
    }
  };

  const handleSaveGuest = () => {
    localStorage.setItem("selectedAddress", JSON.stringify(data));
    localStorage.removeItem("edit_data_address");
    localStorage.removeItem("temporaryData");
    localStorage.removeItem("selectedPayment");
    localStorage.removeItem("selectedShipping");
    history.push("/cart-shipment?tabs=1");
  };

  const multipleData = newData => {
    setData({
      ...data,
      ...newData
    });
  };

  const changeData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleRemove = async () => {
    setIsLoading(true);
    const id = query.get("id");
    const response = await deleteAddress(id);
    if (response.meta.statusCode === 200) {
      setIsLoading(false);
      if (addressProfile) {
        history.push("/profile/address");
      }
      if (!addressProfile) {
        history.push("/cart-shipment/address");
      }
      localStorage.removeItem("edit_data_address");
    } else {
      setIsLoading(false);
      alert("Gagal Menghapus Alamat");
    }
  };

  const validateSave = () => {
    if (
      data.name?.length < 3 ||
      data.name?.length < 3 ||
      data.phone?.length < 5 ||
      data.label?.length < 1 ||
      data.provinceId?.length < 0 ||
      data.cityId?.length < 0 ||
      data.postcode?.length < 2 ||
      data.address?.length < 3 ||
      data.note?.length < 3 ||
      errorEmail
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    setDisableSave(!validateSave());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getCurrentDataCountry = phone => {
    let code = "+" + phone;
    DataCountry.forEach(res => {
      if (res.dial_code === code.slice(0, res.dial_code?.length))
        code = code.slice(0, res.dial_code?.length);
    });
    // return setPhoneCode(DataCountry.filter((val) => val.dial_code === code)[0]);
  };

  const removePhoneCode = phone => {
    let number = "+" + phone;
    DataCountry.forEach(res => {
      if (res.dial_code === number.slice(0, res.dial_code?.length))
        number = number.slice(res.dial_code?.length);
    });
    return number;
  };

  useEffect(() => {
    const initialData = async () => {
      if (localStorage.getItem("temporaryData")) {
        const temporaryData = JSON.parse(localStorage.getItem("temporaryData"));
        if (!latLng) {
          setLong(temporaryData?.longitude);
          setLat(temporaryData?.latitude);
        }
        setData(temporaryData);
      } else {
        if (user) {
          setIsLoading(true);
          const response = await getAddressById(id);
          if (response.meta.statusCode === 200) {
            setIsLoading(false);
            if (!latLng) {
              setLong(response.data?.longitude);
              setLat(response.data?.latitude);
            }
            setData({
              ...response.data,
              phone: removePhoneCode(response.data.phone)
            });
            getCurrentDataCountry(response.data.phone);
          } else {
            setIsLoading(false);
          }
        } else {
          const address = JSON.parse(localStorage.getItem("selectedAddress"));
          setData(address);
          setIsLoading(false);
        }
      }
    };
    initialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const update = JSON.parse(localStorage.getItem("temporaryData"));

    if (mapsMode === "google") {
      const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API || "";

      Geocode.setApiKey(API_KEY);
      Geocode.setLanguage("id");
      Geocode.fromLatLng(
        data?.latitude !== ""
          ? data?.latitude
          : update
          ? update?.latitude
          : address?.latitude,
        data?.longitude !== ""
          ? data?.longitude
          : update
          ? update?.longitude
          : address?.longitude
      ).then(
        response => {
          const address = response.results[0].formatted_address;
          setMapAddress({ display_name: address });
          setIsLoading(false);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      // setIsLoading(true)
      const fetch = async () => {
        const response = await getLocationByOpenStreetMapReverse(
          data?.latitude !== ""
            ? data?.latitude
            : update
            ? update?.latitude
            : address?.latitude,
          data?.longitude !== ""
            ? data?.longitude
            : update
            ? update?.longitude
            : address?.longitude
        );

        if (response) {
          setIsLoading(false);
          setMapAddress(response);
        }
      };
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.latitude, data.longitude]);

  useEffect(() => {
    async function fetchAPI() {
      const res = await multipleSearch();
      if (res.meta.statusCode === 200) {
        setIsLoading(false);
        setProvince(res.data);
        setTotalPage(res?.meta?.totalPage);
        setTotalData(res?.meta?.totalData);
        setNextPage(res?.meta?.page + 1);
        return;
      }
      setIsLoading(false);
    }
    if (open === "provinsi") {
      fetchAPI();
      getCoordinates();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (mapAddress) {
      getCoordinates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapAddress]);

  const getCoordinates = () => {
    const lat = query.get("lat");
    const long = query.get("long");

    if (lat && long) {
      const localData = JSON.parse(localStorage.getItem("edit_data_address"));
      setData({
        ...localData,
        latitude: lat,
        longitude: long
      });
      localStorage.setItem(
        "edit_data_address",
        JSON.stringify({
          ...localData,
          latitude: lat,
          longitude: long
        })
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("edit_data_address", JSON.stringify(data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (searchProvinceData) {
      const searchAPI = async () => {
        const res = await multipleSearch(searchProvinceData);
        setProvince(res.data);
        if (res.meta.statusCode === 200) {
          setIsLoading(false);
        }
      };
      const timer = setTimeout(() => {
        searchAPI();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchProvinceData]);

  useEffect(() => {
    const MultipleLocation = async () => {
      const res = await multipleSearch("", 1, data.subdistrictId);
      setPostalCode(res.data[0].postal.toString().split(","));
    };
    if (data.postcode !== "") {
      MultipleLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.postcode]);

  const back = () => {
    const profileAddress = localStorage.getItem("addressProfile");

    profileAddress === "true"
      ? history.push("/profile/address")
      : address
      ? history.push("/cart-shipment?tabs=1")
      : history.push("/cart-shipment/address");
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        classes={{
          paperFullScreen: classes.paperFullScreen,
          container: classes.card
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "8px 0px 16px"
          }}
        >
          <div
            style={{
              backgroundColor: "#f5f5f5",
              height: 4,
              width: "20%",
              borderRadius: 5
            }}
          ></div>
        </div>

        {open === "provinsi" && (
          <>
            <div
              style={{
                position: "fixed",
                width: "100%",
                maxWidth: 444,
                padding: "25px 0px 0px",
                backgroundColor: "white",
                borderRadius: 8
              }}
            >
              <div className={classes.searchDiv}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder={`${intl.formatMessage({
                    id: "addAddress.requirements.1.0"
                  })}`}
                  classes={{
                    root: classes.inputSearch,
                    input: classes.inputInput
                  }}
                  InputProps={{
                    "aria-label": "search"
                  }}
                  onChange={handleChangeProvice}
                  value={searchProvinceData}
                />
                {searchProvinceData?.length > 0 && (
                  <CloseIcon
                    onClick={resetProvince}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
            <div className={classes.list} onClick={handleClose}>
              {isLoading ? (
                <div style={{ padding: "0px 16px" }}>
                  <Skeleton animation="wave" height={60} />
                  <Skeleton animation="wave" height={60} />
                  <Skeleton animation="wave" height={60} />
                  <Skeleton animation="wave" height={60} />
                  <Skeleton animation="wave" height={60} />
                  <Skeleton animation="wave" height={60} />
                </div>
              ) : (
                <>
                  <InfiniteScroll
                    dataLength={province.length} //This is important field to render the next data
                    height={xs ? 270 : sm ? 320 : md ? 380 : lg ? 450 : 480}
                    next={refetchLocation}
                    hasMore={nextPage <= totalPage}
                    loader={
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center"
                        }}
                      >
                        <CircularProgress
                          size={20}
                          style={{
                            color:
                              process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"
                          }}
                        />
                      </div>
                    }
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>
                          {""}
                          {intl.formatMessage({
                            id: "addAddress.requirements.3.0"
                          })}
                        </b>
                      </p>
                    }
                  >
                    {province.map(item => (
                      <div
                        onClick={() => {
                          setSelectedProvince(
                            Capitalize(item.slug || item.name)
                          );
                          setPostalCode(item.postal.toString().split(","));
                          multipleData({
                            provinceId: item.province._id.toString(),
                            cityId: item.city._id.toString(),
                            districtId: item.district._id.toString(),
                            subdistrictId: item.id.toString(),
                            address: item.slug,
                            postcode: item.postal
                          });
                          handleClose();
                        }}
                      >
                        <div style={{ padding: 16, fontSize: 12 }}>
                          {Capitalize(item.slug || item.name)}
                        </div>
                        <Divider />
                      </div>
                    ))}
                    {province.length < 1 && (
                      <p style={{ textAlign: "center" }}>
                        {""}
                        {intl.formatMessage({
                          id: "addAddress.requirements.2.0"
                        })}
                      </p>
                    )}
                  </InfiniteScroll>
                </>
              )}
            </div>
          </>
        )}

        {open === "kota" && (
          <>
            {postalCode?.length > 1 &&
              postalCode.map(code => (
                <div
                  onClick={() => {
                    // setPostalCode(code);
                    multipleData({
                      postcode: code
                    });
                    handleClose();
                  }}
                >
                  <div style={{ padding: 16, fontSize: 12 }}>{code}</div>
                  <Divider />
                </div>
              ))}
          </>
        )}
      </Dialog>
      {/* <AppBar title="Ubah Alamat" goBack={true} /> */}
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
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <BackButton
              style={{
                color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
                cursor: "pointer",
                marginRight: 10
              }}
              onClick={() => back()}
            />

            <strong style={{ color: "black" }}>
              {" "}
              {intl.formatMessage({
                id: "cardAddress.requirements.3.0"
              })}
            </strong>
          </div>
          <DeleteIcon
            style={{
              color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
              cursor: "pointer",
              display: data.default || !user ? "none" : ""
            }}
            onClick={handleRemove}
          />
        </Toolbar>
      </AppBar>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <CircularProgress
            style={{
              color: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
              alignSelf: "center"
            }}
            disableShrink
          />
        </div>
      ) : (
        <Paper style={{ padding: "16px 0px 25px", minHeight: "90vh" }}>
          <div
            style={{
              fontWeight: 500,
              fontSize: 12,
              marginBottom: 8,
              padding: "0px 16px"
            }}
          >
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.4.0"
            })}
          </div>
          <div className={classes.searchDiv}>
            <InputBase
              type="text"
              placeholder={`${intl.formatMessage({
                id: "addAddress.requirements.4.0.1"
              })}`}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              InputProps={{
                "aria-label": "search"
              }}
              onChange={e => changeData("name", e.target.value)}
              value={data.name}
            />
          </div>

          <div
            style={{
              fontWeight: 500,
              fontSize: 12,
              marginBottom: 8,
              padding: "0px 16px"
            }}
          >
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.5.0"
            })}
          </div>
          <div className={classes.searchDiv}>
            <div className={classes.searchIcon}>
              <ReactFlagsSelect
                selected={selectedCountryCode}
                showSelectedLabel={false}
                fullWidth={false}
                selectButtonClassName={classes.flagButton}
                customLabels={CountryData}
                onSelect={code => setSelectedCountryCode(code)}
              />
            </div>
            <InputBase
              type="number"
              placeholder={`${intl.formatMessage({
                id: "addAddress.requirements.4.0.1"
              })}`}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              InputProps={{
                "aria-label": "search"
              }}
              onChange={e => changeData("phone", e.target.value)}
              value={data.phone}
            />
          </div>
          <div
            style={{
              fontWeight: 500,
              fontSize: 12,
              marginBottom: 8,
              padding: "0px 16px"
            }}
          >
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.5.0"
            })}
          </div>
          <div className={classes.searchDiv}>
            <InputBase
              id="email"
              type="email"
              required
              placeholder={`${intl.formatMessage({
                id: "addAddress.requirements.6.0.1"
              })}`}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              InputProps={{
                "aria-label": "search"
              }}
              onChange={e => {
                if (validateEmail(e.target.value)) {
                  setIsValidEmail(false);
                } else {
                  setIsValidEmail(true);
                }
                changeData("email", e.target.value);
              }}
              value={data.email}
            />
          </div>
          {errorEmail && (
            <div style={{ margin: "10px 25px", color: "red", fontSize: 11 }}>
              {" "}
              {intl.formatMessage({
                id: "addAddress.requirements.6.0.2"
              })}
            </div>
          )}

          <div
            style={{
              fontWeight: 500,
              fontSize: 12,
              marginBottom: 8,
              padding: "0px 16px"
            }}
          >
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.7.0"
            })}
          </div>
          <div className={classes.searchDiv}>
            <InputBase
              type="text"
              placeholder={`${intl.formatMessage({
                id: "addAddress.requirements.7.0.1"
              })}`}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              InputProps={{
                "aria-label": "search"
              }}
              onChange={e => changeData("label", e.target.value)}
              value={data.label}
            />
          </div>
          <div
            style={{
              height: 8,
              backgroundColor: "#FAFAFA",
              marginBottom: 16
            }}
          ></div>

          <div style={{ padding: "0px 16px", marginBottom: 24 }}>
            <Typography
              style={{ fontWeight: 500, fontSize: 12, marginBottom: 8 }}
            >
              {" "}
              {intl.formatMessage({
                id: "addAddress.requirements.8.0"
              })}
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              disabled
              value={Capitalize(selectedProvince) || Capitalize(data.address)}
              onChange={e => changeData("province", e.target.value)}
              placeholder={`${intl.formatMessage({
                id: "addAddress.requirements.8.0.1"
              })}`}
              style={{
                backgroundColor: "#FAFAFA",
                borderRadius: 8,
                height: 45
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ArrowDown onClick={() => handleClickOpen("provinsi")} />
                  </InputAdornment>
                ),
                style: { cursor: "pointer" },
                classes: {
                  notchedOutline: classes.noBorder,
                  input: classes.input
                }
              }}
              onClick={() => handleClickOpen("provinsi")}
              // eslint-disable-next-line
              inputProps={{
                style: {
                  cursor: "pointer",
                  color: "#333333",
                  fontSize: 12,
                  fontWeight: 500
                }
              }}
              // onClick={onClick}
            />
          </div>

          <div style={{ padding: "0px 16px", marginBottom: 24 }}>
            <Typography
              style={{ fontWeight: 500, fontSize: 12, marginBottom: 8 }}
            >
              {" "}
              {intl.formatMessage({
                id: "addAddress.requirements.9.0"
              })}
            </Typography>

            {data.cityId?.length > 0 ? (
              <TextField
                variant="outlined"
                required
                fullWidth
                disabled
                value={
                  postalCode?.length === 1
                    ? postalCode
                    : data.postcode.toString().split(",")?.length === 1
                    ? data.postcode
                    : ""
                }
                onChange={e => changeData("postcode", e.target.value)}
                style={{
                  backgroundColor: "#FAFAFA",
                  borderRadius: 8,
                  height: 45
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ArrowDown
                        onClick={() =>
                          postalCode?.length > 1 && handleClickOpen("kota")
                        }
                      />
                    </InputAdornment>
                  ),
                  style: { cursor: "pointer" },
                  classes: {
                    notchedOutline: classes.noBorder,
                    input: classes.input
                  }
                }}
                onClick={() =>
                  postalCode?.length > 1 && handleClickOpen("kota")
                }
                // eslint-disable-next-line
                inputProps={{
                  style: {
                    cursor: "pointer",
                    color: "#333333",
                    fontSize: 12,
                    fontWeight: 500
                  }
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#FAFAFA",
                  borderRadius: 8,
                  padding: "12px 16px",
                  cursor: "pointer",
                  alignItems: "center"
                }}
              >
                <Typography style={{ fontSize: 12, color: "grey" }}>
                  {" "}
                  {intl.formatMessage({
                    id: "addAddress.requirements.9.0"
                  })}
                </Typography>
                <ArrowDown style={{ color: "grey" }} />
              </div>
            )}
          </div>
          <div
            style={{
              fontWeight: 500,
              fontSize: 12,
              marginBottom: 8,
              padding: "0px 16px"
            }}
          >
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.10.0"
            })}
          </div>
          <div className={classes.searchDiv}>
            <InputBase
              type="text"
              placeholder={`${intl.formatMessage({
                id: "addAddress.requirements.10.0.1"
              })}`}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              InputProps={{
                "aria-label": "search"
              }}
              onChange={e => changeData("note", e.target.value)}
              value={data.note}
            />
          </div>

          <div
            style={{ height: 8, backgroundColor: "#FAFAFA", marginBottom: 16 }}
          ></div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              padding: "0px 16px 8px"
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>
                {" "}
                {intl.formatMessage({
                  id: "addAddress.requirements.15.0"
                })}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "grey",
                  marginBottom: 8
                }}
              >
                {" "}
                {intl.formatMessage({
                  id: "addAddress.requirements.11.0"
                })}
              </div>
            </div>
            {lat && long ? (
              <div>
                <Button
                  onClick={() => {
                    user
                      ? history.push(`/new-address/detail?id=${data.id}`)
                      : history.push(`/new-address/detail`);

                    localStorage.setItem("temporaryData", JSON.stringify(data));
                  }}
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  {" "}
                  {intl.formatMessage({
                    id: "addAddress.requirements.12.0"
                  })}
                </Button>
              </div>
            ) : data.longitude && data.latitude ? (
              <div>
                <Button
                  onClick={() => {
                    user
                      ? history.push(`/new-address/detail?id=${data.id}`)
                      : history.push(`/new-address/detail`);

                    localStorage.setItem("temporaryData", JSON.stringify(data));
                  }}
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  {" "}
                  {intl.formatMessage({
                    id: "addAddress.requirements.12.0"
                  })}
                </Button>
              </div>
            ) : null}
          </div>
          <div
            style={{ padding: "0px 16px" }}
            onClick={() => {
              user
                ? history.push(`/new-address/detail?id=${data.id}`)
                : history.push(`/new-address/detail`);

              localStorage.setItem("temporaryData", JSON.stringify(data));
            }}
          >
            {long && lat ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  <Minimap lat={lat} lng={long} />
                </div>
                {mapAddress.display_name !== "" && (
                  <Typography
                    style={{ padding: "20px 0px" }}
                    variant="caption"
                    display="block"
                    noWrap={true}
                  >
                    {mapAddress.display_name}
                  </Typography>
                )}
              </>
            ) : data.longitude && data.latitude ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  <Minimap lat={data.latitude} lng={data.longitude} />
                </div>
                {mapAddress.display_name !== "" && (
                  <Typography
                    style={{ padding: "20px 0px" }}
                    variant="caption"
                    display="block"
                    noWrap={true}
                  >
                    {mapAddress.display_name}
                  </Typography>
                )}
              </>
            ) : (
              <div
                style={{
                  height: 120,
                  borderRadius: 8,
                  backgroundColor: "#fafafa",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px dashed grey",
                  fontFamily:
                    process.env.REACT_APP_FONT_URL ||
                    "https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
                }}
              >
                {" "}
                {intl.formatMessage({
                  id: "addAddress.requirements.13.0"
                })}
              </div>
            )}
          </div>
          <div className={classes.navButton}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => (user ? handleSave() : handleSaveGuest())}
              disabled={disableSave}
            >
              {" "}
              {intl.formatMessage({
                id: "addAddress.requirements.14.0"
              })}
            </Button>
          </div>
        </Paper>
      )}
    </Container>
  );
};

export default withTransaction("UpdateAddress", "component")(UpdateAddress);
