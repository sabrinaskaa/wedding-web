import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";

import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  Button,
  Paper,
  Divider
} from "@material-ui/core";
import { getAddress } from "../../services/address";

import AppBar from "../../components/app-bar";
import Search from "../../components/search";

import NoAddress from "../../vector/noAddress.svg";
import Primary from "../../vector/primaryAddress.svg";
import { withTransaction } from "@elastic/apm-rum-react";
import { useIntl } from "react-intl";

const MyLoader = props => (
  <ContentLoader
    speed={2}
    width={400}
    height={600}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
    style={{ marginTop: 80 }}
  >
    <rect x="16" y="9" rx="3" ry="3" width="300" height="40" />
    <rect x="16" y="71" rx="0" ry="0" width="103" height="14" />
    <rect x="16" y="93" rx="0" ry="0" width="145" height="12" />
    <rect x="16" y="114" rx="0" ry="0" width="130" height="12" />
    <rect x="16" y="136" rx="0" ry="0" width="190" height="14" />
    <rect x="16" y="170" rx="0" ry="0" width="103" height="14" />
    <rect x="16" y="192" rx="0" ry="0" width="145" height="12" />
    <rect x="16" y="214" rx="0" ry="0" width="130" height="12" />
    <rect x="16" y="236" rx="0" ry="0" width="190" height="14" />
  </ContentLoader>
);

function AddressList(props) {
  const intl = useIntl();
  const { classes } = props;
  const [alamat, setAlamat] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = e => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const address = await getAddress();
      setAlamat(address);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    setFiltered(
      alamat.filter(
        item =>
          item.locationName.toLowerCase().includes(keyword.toLowerCase()) ||
          item.name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.address.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [alamat, keyword]);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <AppBar
          title={`${intl.formatMessage({
            id: "addAddress.requirements.52.0"
          })}`}
          goBack
          divider
        />
        <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#fff",
            position: "fixed",
            top: 64,
            height: 80,
            maxWidth: 442,
            width: "100%",
            padding: 16
          }}
        >
          <Search
            keyword={handleSearch}
            handleClear={setKeyword}
            placeholder={`${intl.formatMessage({
              id: "addAddress.requirements.53.0"
            })}`}
            value={keyword}
          />
        </Grid>
        {isLoading ? (
          <MyLoader />
        ) : (
          <>
            {alamat.length >= 1 ? (
              <>
                <Grid
                  item
                  xss={12}
                  direction="column"
                  className={classes.body}
                  style={{ paddingTop: 144 }}
                >
                  <div>
                    {filtered.length <= 0 && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "60vh"
                          }}
                        >
                          <Typography align="center" style={{ width: "80%" }}>
                            {" "}
                            {intl.formatMessage({
                              id: "addAddress.requirements.54.0"
                            })}
                          </Typography>
                        </div>
                      </>
                    )}

                    {filtered.map(data => (
                      <Grid
                        item
                        xs={12}
                        direction="column"
                        style={{ margin: "0 0 16px", display: "flex" }}
                      >
                        <span
                          className={classes.text14}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                          }}
                        >
                          <b style={{ margin: "4px 0" }}>{data.locationName}</b>
                          {data.isPrimary === "true" ? (
                            <div
                              style={{
                                backgroundColor: "#E8DBD4",
                                color: "#FF7632",
                                width: 120,
                                borderRadius: 3,
                                fontSize: 12,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 4
                              }}
                            >
                              <img
                                src={Primary}
                                alt="Alamat Utama"
                                style={{ marginRight: 8 }}
                              />
                              <b>
                                {" "}
                                {intl.formatMessage({
                                  id: "addAddress.requirements.57.0"
                                })}
                              </b>
                            </div>
                          ) : (
                            <></>
                          )}
                        </span>
                        <span className={classes.text12}>{data.name}</span>
                        <span className={classes.text12}>{data.phone}</span>
                        <span className={classes.text14}>
                          <b>{data.address}</b>
                        </span>
                        <Divider style={{ marginTop: 16 }} />
                      </Grid>
                    ))}
                  </div>
                </Grid>
              </>
            ) : (
              <Grid
                item
                xs={12}
                direction="column"
                align="center"
                justify="center"
                className={classes.body}
              >
                <img src={NoAddress} alt="Address Empty" />
                <Typography
                  align="center"
                  style={{
                    width: "70%",
                    fontSize: 12,
                    color: "rgba(51, 51, 51, 0.84)",
                    margin: "16px auto 24px"
                  }}
                >
                  {" "}
                  {intl.formatMessage({
                    id: "addAddress.requirements.55.0"
                  })}
                </Typography>
              </Grid>
            )}
          </>
        )}

        <Paper
          style={{
            position: "fixed",
            padding: 16,
            backgroundColor: "#fff",
            bottom: 0,
            width: "100%",
            borderRadius: 0,
            maxWidth: 442
          }}
        >
          <Button
            disableRipple="true"
            disableFocusRipple="true"
            style={{
              width: "100%",
              background: "#FF7632",
              color: "#fff",
              fontWeight: "bold"
            }}
            onClick={() => props.history.push("/new-address")}
          >
            <b>
              {" "}
              {intl.formatMessage({
                id: "addAddress.requirements.56.0"
              })}
            </b>
          </Button>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("AddressList", "component")(AddressList);
