import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
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
// import AppBar from "../../components/app-bar";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactFlagsSelect from "react-flags-select";
import CountryData from "../../utilities/country-code";
import BackButton from "@material-ui/icons/ArrowBackIos";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {
  createAddress,
  getLocationByOpenStreetMapReverse,
  multipleSearch
} from "../../services/address";
import { useHistory, useLocation } from "react-router-dom";
import Minimap from "./../../components/minimap/components";
import { withTransaction } from "@elastic/apm-rum-react";
import Geocode from "react-geocode";
import { Capitalize } from "../../utilities/capitalize";
import { validateEmail } from "../../utilities/validate-email";
import InfiniteScroll from "react-infinite-scroll-component";

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
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    margin: "0px 16px 16px"
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
    paddingBottom: 60,
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

const AddAddress = () => {
  const intl = useIntl();
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();
  const xs = useMediaQuery("(max-height:570px)");
  const sm = useMediaQuery("(max-height:670px)");
  const md = useMediaQuery("(max-height:740px)");
  const lg = useMediaQuery("(max-height:830px)");
  const lat = query.get("lat");
  const long = query.get("long");
  const mapsMode = process.env.REACT_APP_MAPS_MODE || "osm";
  const [selectedCountryCode, setSelectedCountryCode] = useState("ID");
  const [province, setProvince] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [searchProvinceData, setSearchProvinceData] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const user = JSON.parse(localStorage.getItem("users"));
  const addressProfile = localStorage.getItem("addressProfile");
  const [isLoading, setIsLoading] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [mapAddress, setMapAddress] = useState({ display_name: "" });
  const [totalPage, setTotalPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [postalCode, setPostalCode] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: user ? user?.phone : "",
    label: "",
    provinceId: "",
    cityId: "",
    districtId: "",
    subdistrictId: "",
    postcode: "",
    address: "",
    latitude: null,
    longitude: null,
    country: "indonesia"
  });

  const countryCodeNumber = CountryData[selectedCountryCode].secondary.slice(
    1,
    CountryData[selectedCountryCode].secondary?.length
  );

  const validPhone = data?.phone
    ? data?.phone.slice(0, 1) === "0"
      ? countryCodeNumber + data?.phone.slice(1, data?.phone?.length)
      : data?.phone.slice(0, 2) === countryCodeNumber
      ? data?.phone
      : countryCodeNumber + data?.phone
    : null;

  const errorEmail = isValidEmail || data.email?.length === 0;
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

  const resetProvince = () => {
    setSearchProvinceData("");
    async function fetchAPI() {
      const res = await multipleSearch();
      if (res.meta.statusCode === 200) {
        setIsLoading(false);
      }
      setProvince(res.data);
      setTotalPage(res?.meta?.totalPage);
      setNextPage(res?.meta?.page + 1);
    }
    fetchAPI();
  };

  const handleSave = async () => {
    setIsLoading(true);

    const response = await createAddress({
      ...data,
      phone: (countryCodeNumber + data.phone).replace("+", ""),
      default: true
    });

    if (response?.meta?.statusCode === 200) {
      if (addressProfile) {
        history.push("/profile/address");
      }
      if (!addressProfile) {
        history.push("/cart-shipment/address");
      }
      setIsLoading(false);
      localStorage.removeItem("temp_data_address");
    } else {
      setIsLoading(false);
      localStorage.removeItem("temp_data_address");
      if (addressProfile) {
        history.push("/profile/address");
      }
      if (!addressProfile) {
        history.push("/cart-shipment?tabs=1");
      }
    }
  };
  const handleSaveGuest = () => {
    localStorage.setItem("selectedAddress", JSON.stringify(data));
    localStorage.removeItem("temp_data_address");
    history.push("/cart-shipment?tabs=1");
  };

  const saveAddress = () => {
    if (user) {
      handleSave();
    } else {
      handleSaveGuest();
    }
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

  async function refetchLocation() {
    const listLocation = await multipleSearch(searchProvinceData, nextPage);
    setTimeout(() => {
      setProvince([...province, ...listLocation?.data]);
      setIsLoading(false);
      setTotalPage(listLocation?.meta?.totalPage);
      setNextPage(listLocation?.meta?.page + 1);
    }, 1000);
  }

  useEffect(() => {
    if (mapAddress) {
      getCoordinates();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapAddress]);

  useEffect(() => {
    async function fetchAPI() {
      await multipleSearch("")
        .then(res => {
          setIsLoading(false);
          setProvince(res.data);
          setTotalPage(res?.meta?.totalPage);
          setNextPage(res?.meta?.page + 1);
          setPostalCode(res.data[0].postal.toString().split(","));
        })
        .catch(err => console.log(err));
    }

    if (open === "provinsi") {
      fetchAPI();
    }
    setIsLoading(true);
  }, [open]);

  const getCoordinates = () => {
    const lat = query.get("lat");
    const long = query.get("long");

    if (lat && long) {
      // console.log({ ...data, latitude: lat, longitude: long });

      const localData = JSON.parse(localStorage.getItem("temp_data_address"));
      if (user) {
        setData({
          ...localData,
          latitude: lat,
          longitude: long,
          country: "Indonesia"
        });
        localStorage.setItem(
          "temp_data_address",
          JSON.stringify({
            country: "Indonesia",
            name: user ? user?.displayName || user?.name : "",
            email: user ? user?.email : "",
            phone: validPhone || "",
            addres: "",
            label: "",
            provinceId: "",
            cityId: "",
            districtId: "",
            subdistrictId: "",
            postcode: "",
            note: "",
            ...data,
            latitude: lat,
            longitude: long
          })
        );
      } else {
        setData({
          ...localData,
          latitude: lat,
          longitude: long,
          country: "Indonesia"
        });
        localStorage.setItem(
          "temp_data_address",
          JSON.stringify({
            country: "Indonesia",
            name: "",
            email: "",
            phone: validPhone || "",
            label: "",
            provinceId: "",
            cityId: "",
            districtId: "",
            subdistrictId: "",
            postcode: "",
            note: "",
            address: "",
            ...data,
            latitude: lat,
            longitude: long
          })
        );
      }
    } else {
      const localData = JSON.parse(localStorage.getItem("temp_data_address"));

      if (user) {
        setData({
          latitude: null,
          longitude: null,
          country: "Indonesia",
          name: user ? user?.displayName || user?.name : "",
          email: user ? user?.email : "",
          phone: validPhone || "",
          label: "",
          provinceId: "",
          cityId: "",
          districtId: "",
          subdistrictId: "",
          postcode: "",
          note: "",
          ...localData
        });
        localStorage.setItem(
          "temp_data_address",
          JSON.stringify({
            latitude: null,
            longitude: null,
            country: "Indonesia",
            name: user ? user?.displayName || user?.name : "",
            email: user ? user?.email : "",
            phone: validPhone || "",
            label: "",
            provinceId: "",
            cityId: "",
            districtId: "",
            subdistrictId: "",
            postcode: "",
            note: "",
            ...localData
          })
        );
      } else {
        setData({
          latitude: null,
          longitude: null,
          note: "",
          country: "Indonesia",
          name: "",
          email: "",
          phone: validPhone || "",
          label: "",
          provinceId: "",
          cityId: "",
          districtId: "",
          subdistrictId: "",
          postcode: "",
          address: "",
          city: "",
          ...localData
        });
        localStorage.setItem(
          "temp_data_address",
          JSON.stringify({
            latitude: null,
            longitude: null,
            note: "",
            country: "Indonesia",
            name: "",
            email: "",
            phone: validPhone || "",
            label: "",
            provinceId: "",
            cityId: "",
            districtId: "",
            subdistrictId: "",
            postcode: "",
            address: "",
            ...localData
          })
        );
      }
    }
  };

  const validateSave = () => {
    if (
      data.name?.length < 3 ||
      data.email?.length < 3 ||
      data.phone?.length < 5 ||
      data.label?.length < 1 ||
      data.provinceId?.length <= 1 ||
      data.cityId?.length <= 1 ||
      data.postcode?.length !== 5 ||
      data.address?.length < 3 ||
      data.note?.length < 3 ||
      isValidEmail
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

  useEffect(() => {
    if (searchProvinceData) {
      const searchAPI = async () => {
        const res = await multipleSearch(searchProvinceData);
        setProvince(res.data);
        setTotalPage(res?.meta?.totalPage);
        setNextPage(res?.meta?.page + 1);
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
    localStorage.setItem("temp_data_address", JSON.stringify(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (mapsMode === "google") {
      const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API || "";

      Geocode.setApiKey(API_KEY);
      Geocode.setLanguage("id");
      Geocode.fromLatLng(lat, long).then(
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
      setIsLoading(true);
      const fetch = async () => {
        const response = await getLocationByOpenStreetMapReverse(lat, long);
        if (response) {
          setIsLoading(false);
          setMapAddress(response);
        }
      };
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      : user && localStorage.getItem("emptyAddress") !== "true"
      ? history.push("/cart-shipment/address")
      : history.push("/cart-shipment?tabs=1");
  };

  const handleLocation = province => {
    setSelectedProvince(Capitalize(province.slug));
    setPostalCode(province.postal.toString().split(","));
  };

  console.log(data);
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
                    id: "addAddress.requirements.16.0"
                  })}`}
                  classes={{
                    root: classes.inputRoot,
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
                        <CircularProgress />
                      </div>
                    }
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>
                          {" "}
                          {intl.formatMessage({
                            id: "addAddress.requirements.17.0"
                          })}
                        </b>
                      </p>
                    }
                  >
                    {province.map(province => (
                      <div
                        onClick={() => {
                          handleLocation(province);
                          multipleData({
                            provinceId: province.province._id.toString(),
                            cityId: province.city._id.toString(),
                            districtId: province.district._id.toString(),
                            subdistrictId: province.id.toString(),
                            address: province.slug || province.name,
                            postcode: province.postal
                          });
                        }}
                      >
                        <div style={{ padding: 16, fontSize: 12 }}>
                          {Capitalize(province.slug || province.name)}
                        </div>
                        <Divider />
                      </div>
                    ))}
                  </InfiniteScroll>
                </>
              )}
            </div>
            {province.length < 1 && (
              <p style={{ textAlign: "center" }}>
                {" "}
                {intl.formatMessage({
                  id: "addAddress.requirements.18.0"
                })}
              </p>
            )}
          </>
        )}
        {open === "kota" && (
          <>
            {postalCode.length > 1 &&
              postalCode.map(code => (
                <>
                  <div
                    onClick={() => {
                      multipleData({
                        postcode: code
                      });
                      handleClose();
                    }}
                  >
                    <div style={{ padding: 16, fontSize: 12 }}>{code}</div>
                    <Divider />
                  </div>
                </>
              ))}
          </>
        )}
      </Dialog>
      {/* <AppBar title="Tambah Alamat" goBack={true} /> */}
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
                id: "addAddress.requirements.19.0"
              })}
            </strong>
          </div>
        </Toolbar>
      </AppBar>
      <Paper style={{ padding: "16px 0px 25px" }}>
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
            id: "addAddress.requirements.20.0"
          })}
        </div>
        <div className={classes.searchDiv}>
          <InputBase
            type="text"
            required
            placeholder={`${intl.formatMessage({
              id: "addAddress.requirements.21.0"
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
        {data?.name?.length < 3 && (
          <div style={{ margin: "10px 25px", color: "red", fontSize: 11 }}>
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.22.0"
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
            id: "addAddress.requirements.23.0"
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
            required
            placeholder={`${intl.formatMessage({
              id: "addAddress.requirements.24.0"
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
            error={data.phone?.length < 5 ? true : false}
            helperText={
              data.phone?.length < 5
                ? `${intl.formatMessage({
                    id: "addAddress.requirements.25.0"
                  })}`
                : ""
            }
          />
        </div>
        {data.phone?.length < 5 && (
          <div style={{ margin: "10px 25px", color: "red", fontSize: 11 }}>
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.26.0"
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
            id: "addAddress.requirements.27.0"
          })}
        </div>
        <div className={classes.searchDiv}>
          <InputBase
            id="email"
            type="email"
            required
            placeholder={`${intl.formatMessage({
              id: "addAddress.requirements.28.0"
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
              id: "addAddress.requirements.29.0"
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
            id: "addAddress.requirements.30.0"
          })}
        </div>
        <div className={classes.searchDiv}>
          <InputBase
            type="text"
            required
            placeholder={`${intl.formatMessage({
              id: "addAddress.requirements.31.0"
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
            error={data.label?.length <= 1 ? true : false}
            helperText={
              data.label?.length <= 1
                ? `${intl.formatMessage({
                    id: "addAddress.requirements.32.0"
                  })}`
                : ""
            }
          />
        </div>
        {data.label.length < 3 && (
          <div style={{ margin: "10px 25px", color: "red", fontSize: 11 }}>
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.32.0"
            })}
          </div>
        )}

        <div
          style={{ height: 8, backgroundColor: "#FAFAFA", marginBottom: 16 }}
        ></div>
        <>
          <div style={{ padding: "0px 16px", marginBottom: 24 }}>
            <Typography
              style={{ fontWeight: 500, fontSize: 12, marginBottom: 8 }}
            >
              {" "}
              {intl.formatMessage({
                id: "addAddress.requirements.33.0"
              })}
            </Typography>
            <TextField
              required
              variant="outlined"
              fullWidth
              disabled
              value={Capitalize(selectedProvince) || Capitalize(data.address)}
              // onChange={e => changeData("province", e.target.value)}
              placeholder={`${intl.formatMessage({
                id: "addAddress.requirements.34.0"
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
            />
            {data.provinceId.length <= 1 && (
              <div style={{ margin: "10px 10px", color: "red", fontSize: 11 }}>
                {" "}
                {intl.formatMessage({
                  id: "addAddress.requirements.36.0"
                })}
              </div>
            )}
          </div>
        </>

        <div style={{ padding: "0px 16px", marginBottom: 16 }}>
          <Typography
            style={{ fontWeight: 500, fontSize: 12, marginBottom: 8 }}
          >
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.37.0"
            })}
          </Typography>

          {data.cityId.length > 0 ? (
            <TextField
              variant="outlined"
              required
              fullWidth
              disabled
              value={
                postalCode.length === 1
                  ? postalCode
                  : data.postcode.toString().split(",").length === 1
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
                        postalCode.length > 1 && handleClickOpen("kota")
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
              onClick={() => postalCode.length > 1 && handleClickOpen("kota")}
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
              onClick={() => selectedProvince && handleClickOpen("kota")}
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
                Kode Pos
              </Typography>
              <ArrowDown style={{ color: "grey" }} />
            </div>
          )}

          {data?.postcode?.length <= 1 && (
            <div style={{ margin: "10px 10px ", color: "red", fontSize: 11 }}>
              {" "}
              {intl.formatMessage({
                id: "addAddress.requirements.38.0"
              })}
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
            id: "addAddress.requirements.39.0"
          })}
        </div>
        <div className={classes.searchDiv}>
          <InputBase
            type="text"
            required
            placeholder={`${intl.formatMessage({
              id: "addAddress.requirements.40.0"
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
        {data.note?.length < 3 && (
          <div style={{ margin: "10px 25px", color: "red", fontSize: 11 }}>
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.41.0"
            })}
          </div>
        )}

        <div
          style={{ height: 8, backgroundColor: "#FAFAFA", marginBottom: 16 }}
        ></div>

        {data.postcode.toString().split(",").length === 1 &&
          data.postcode !== "" && (
            <>
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
                      id: "addAddress.requirements.42.0"
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
                      id: "addAddress.requirements.43.0"
                    })}
                  </div>
                </div>
                {lat && long && (
                  <div>
                    <Button
                      onClick={() => {
                        history.push(`/new-address/detail`);
                        localStorage.setItem(
                          "temporaryData",
                          JSON.stringify(data)
                        );
                      }}
                      color="primary"
                      variant="contained"
                      className={classes.button}
                    >
                      {" "}
                      {intl.formatMessage({
                        id: "addAddress.requirements.44.0"
                      })}
                    </Button>
                  </div>
                )}
              </div>
              <div
                style={{ padding: "0px 16px" }}
                onClick={() => history.push("/new-address/detail")}
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
                      id: "addAddress.requirements.45.0"
                    })}
                  </div>
                )}
              </div>
            </>
          )}

        <div className={classes.navButton}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => saveAddress()}
            disabled={disableSave}
          >
            {" "}
            {intl.formatMessage({
              id: "addAddress.requirements.46.0"
            })}
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default withTransaction("AddAddress", "component")(AddAddress);
