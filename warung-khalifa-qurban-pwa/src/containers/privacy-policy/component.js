import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Appbar from "../../components/app-bar";
import { withTransaction } from "@elastic/apm-rum-react";
import { useIntl } from "react-intl";

function PrivacyPolicy(props) {
  const { classes } = props;
  const intl = useIntl();
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <Appbar
          title={`${intl.formatMessage({
            id: "privacyPolicy.title"
          })}`}
          goBack
        />
        <Paper className={classes.paper}>
          <Box style={{ paddingTop: "3%" }}>
            <Typography>
              <b>
                {" "}
                {intl.formatMessage({
                  id: "privacyPolicy.title"
                })}
              </b>
            </Typography>
            <Typography variant="caption">
              <p>
                {" "}
                {intl.formatMessage({
                  id: "privacyPolicy.requirements.definition.1.1"
                })}{" "}
                {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                {""}
                {intl.formatMessage({
                  id: "privacyPolicy.requirements.definition.1.2"
                })}
                ({process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                {""}
                {intl.formatMessage({
                  id: "privacyPolicy.requirements.definition.1.3"
                })}{" "}
                {process.env.REACT_APP_BRAND_NAME || "Srikopi"}{" "}
                {intl.formatMessage({
                  id: "privacyPolicy.requirements.definition.1.4"
                })}
              </p>
            </Typography>
          </Box>
          <Divider />
          <Box style={{ paddingTop: "3%" }}>
            <Typography>
              <b>
                {" "}
                {intl.formatMessage({
                  id: "privacyPolicy.requirements.title.1.0"
                })}
              </b>
            </Typography>
            <Typography variant="caption">
              <p>
                1.1{" "}
                {intl.formatMessage({
                  id: "privacyPolicy.requirements.title.1.1"
                })}
                <p>
                  {" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.1.1.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.1.1.2"
                  })}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.1.1.3"
                  })}
                </p>
              </p>
              <p>
                1.2{" "}
                {intl.formatMessage({
                  id: "privacyPolicy.requirements.title.1.2"
                })}
                <p>
                  {" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.1.2.1"
                  })}
                </p>
              </p>
              <p>
                1.3{" "}
                {intl.formatMessage({
                  id: "privacyPolicy.requirements.title.1.3"
                })}
                <p>
                  {" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.1.3.1"
                  })}
                </p>
              </p>
              <p>
                1.4{" "}
                {intl.formatMessage({
                  id: "privacyPolicy.requirements.1.4"
                })}
                <p>
                  1.4.1{" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.title.1.4.1"
                  })}
                  <p>
                    {" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.1.4.1"
                    })}
                  </p>
                </p>
                <p>
                  1.4.2{" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.title.1.4.2"
                  })}
                  <p>
                    {" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.1.4.2"
                    })}
                  </p>
                </p>
                <p>
                  1.4.3{" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.title.1.4.3"
                  })}
                  <p>
                    {" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.1.4.2"
                    })}
                  </p>
                </p>
                <p>
                  1.4.4{" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.title.1.4.4"
                  })}
                  <p>
                    {" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.1.4.3"
                    })}
                  </p>
                </p>
                <p>
                  {" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.title.1.4.5"
                  })}
                  <p>
                    {" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.1.4.5"
                    })}
                  </p>{" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.1.4.5.2"
                  })}
                </p>
              </p>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    2.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.2.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.2.0"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.title.2.0.1"
                  })}
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    3.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.3.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.3.0"
                  })}
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    4.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.4.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  <p>
                    4.1{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.4.1"
                    })}{" "}
                    {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                    {""}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.4.1.1"
                    })}{" "}
                    {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                    {""}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.4.1.2"
                    })}{" "}
                    {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                    {""}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.4.1.3"
                    })}
                  </p>

                  <p>
                    4.2{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.4.2"
                    })}
                  </p>
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    5.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.5.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.5.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.5.1.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.5.1.2"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.5.1.3"
                  })}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}{" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.5.1.4"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}{" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.5.1.5"
                  })}
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    6.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.6.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.6.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.6.1.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.6.1.2"
                  })}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.6.1.3"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.6.1.4"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.6.1.5"
                  })}
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    7.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.7.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  <p>
                    7.1{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.7.1"
                    })}
                  </p>

                  <p>
                    7.2{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.7.2"
                    })}
                    <p>
                      7.2.1{" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.title.7.2.1"
                      })}
                      <p>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.7.2.1"
                        })}
                      </p>
                    </p>
                    <p>
                      7.2.2{" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.title.7.2.2"
                      })}
                      <p>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.7.2.2"
                        })}
                      </p>
                    </p>
                    <p>
                      7.2.3{" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.title.7.2.3"
                      })}
                      <p>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.7.2.3"
                        })}
                      </p>
                    </p>
                  </p>
                  <p>
                    7.3{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.7.3"
                    })}
                    <p>
                      {" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.7.3"
                      })}
                    </p>
                    <p>
                      7.3.1{" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.7.3.1"
                      })}
                    </p>
                    <p>
                      7.3.2{" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.7.3.2"
                      })}
                    </p>
                    <p>
                      7.3.3{" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.7.3.3"
                      })}
                    </p>
                    <p>
                      7.3.3{" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.7.3.3.google"
                      })}
                    </p>
                  </p>
                  <p>
                    7.4{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.7.4"
                    })}
                    <p>
                      {" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.7.4"
                      })}
                    </p>
                  </p>
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    8.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.8.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.8.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.8.2"
                  })}
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    9.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.9.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  <p>
                    9.1{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.9.1"
                    })}
                    <p>
                      {" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.9.1"
                      })}{" "}
                      {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                      {""}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.9.1.2"
                      })}{" "}
                      {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                      {""}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.9.1.3"
                      })}{" "}
                      {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                      {""}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.9.1.4"
                      })}
                    </p>
                  </p>

                  <p>
                    9.2{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.9.2"
                    })}
                    <p>
                      {" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.9.2"
                      })}{" "}
                      {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                      {""}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.9.2.1"
                      })}
                      {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                      {""}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.9.2.2"
                      })}
                    </p>
                  </p>
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    10.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.10.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.10.0"
                  })}
                  <p>
                    10.1{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.10.1"
                    })}
                  </p>
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    11.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.11.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  <p>
                    11.1 {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                    {""}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.11.1"
                    })}{" "}
                    {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                    {""}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.11.1.2"
                    })}{" "}
                    {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                    {""}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.11.1.3"
                    })}
                  </p>

                  <p>
                    {" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.11.2"
                    })}
                  </p>
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    12.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.12.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.12.1"
                  })}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.12.2"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}{" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.12.3"
                  })}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.12.4"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.12.5"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.12.6"
                  })}
                </Typography>
              </Box>
              <Divider />
              <Box style={{ paddingTop: "3%" }}>
                <Typography>
                  <b>
                    13.{" "}
                    {intl.formatMessage({
                      id: "privacyPolicy.requirements.title.13.0"
                    })}
                  </b>
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.13.1.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.13.1.2"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.13.1.3"
                  })}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "privacyPolicy.requirements.13.1.4"
                  })}
                </Typography>
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("PrivacyPolicy", "component")(PrivacyPolicy);
