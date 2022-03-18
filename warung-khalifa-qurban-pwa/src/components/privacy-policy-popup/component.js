import React, { useState } from "react";

import {
  Dialog,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Box,
  Container,
  CssBaseline,
  Paper
} from "@material-ui/core";
import { useIntl } from "react-intl";

import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
function Component(props) {
  const { classes } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isBuka, setIsBuka] = useState(false);
  const intl = useIntl();

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickBuka = () => {
    setIsBuka(true);
  };
  const handleTutup = () => {
    setIsBuka(false);
  };

  return (
    <Box fontSize={5}>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        style={{ color: "#9FA3A6", fontSize: 12, fontWeight: 300 }}
        align="center"
      >
        {intl.formatMessage({ id: "signIn.agreement" })}
      </Typography>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        style={{ color: "#9FA3A6", fontSize: 12, fontWeight: "600" }}
        align="center"
      >
        <u style={{ cursor: "pointer" }} onClick={handleClickOpen}>
          {intl.formatMessage({ id: "termAndCondition" })}
        </u>{" "}
        &nbsp; {intl.formatMessage({ id: "and" })} &nbsp;
        <u style={{ cursor: "pointer" }} onClick={handleClickBuka}>
          {intl.formatMessage({ id: "privacyPolicy" })}
        </u>
      </Typography>

      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Container maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">
                {" "}
                {intl.formatMessage({ id: "termAndCondition" })}
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
            <List>
              <div className={classes.body}>
                <Box p={1}>
                  <Typography variant="h5" gutterBottom>
                    {intl.formatMessage({ id: "termAndCondition" })}
                  </Typography>
                  <Box p={1}>
                    <Typography variant="caption" gutterBottom>
                      {intl.formatMessage({
                        id: "termAndCondition.pleaseRead"
                      })}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        1.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.preliminaryTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      {process.env.REACT_APP_BRAND_NAME}{" "}
                      {intl.formatMessage({
                        id: "termAndCondition.preliminaryContent"
                      })}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        2.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definitionTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      <p>
                        2.1{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.1"
                        })}
                      </p>
                      <p>
                        2.2{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.2"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME};
                      </p>
                      <p>
                        2.3{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.3"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME};
                      </p>
                      <p>
                        2.4{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.4.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.4.2"
                        })}
                      </p>
                      <p>
                        2.5{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.5"
                        })}
                      </p>
                      <p>
                        2.6{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.6.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.6.2"
                        })}
                      </p>
                      <p>
                        2.7{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.7.1"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.7.2"
                        })}
                      </p>
                      <p>
                        2.8{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.8"
                        })}
                      </p>
                      <p>
                        2.9{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.9"
                        })}
                      </p>
                      <p>
                        2.10{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.10.1"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.10.2"
                        })}
                      </p>
                      <p>
                        2.11{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.definition.2.11"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}.id.
                      </p>
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        3.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.orderTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      <p>
                        3.1{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.1.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.1.2"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}.id);{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.1.3"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.1.4"
                        })}
                      </p>
                      <p>
                        3.2{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.2.1"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.2.2"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.2.3"
                        })}
                      </p>
                      <p>
                        3.3{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.3"
                        })}
                      </p>
                      <p>
                        3.4{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.4"
                        })}
                      </p>
                      <p>
                        3.5{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.5"
                        })}
                      </p>
                      <p>
                        3.6{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.order.3.6"
                        })}
                      </p>
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        4.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.priceTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      <p>
                        4.1{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.price.4.1.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.price.4.1.2"
                        })}
                      </p>
                      <p>
                        4.2{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.price.4.2.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.price.4.2.2"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.price.4.2.3"
                        })}
                      </p>
                      <p>
                        4.3{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.price.4.3"
                        })}
                      </p>
                      <p>
                        4.4{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.price.4.4.1"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.price.4.4.2"
                        })}
                      </p>
                      <p>
                        4.5{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.price.4.5.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.price.4.5.2"
                        })}
                      </p>
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        5.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicyTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      <p>
                        5.1{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.1"
                        })}
                      </p>
                      <p>
                        5.2 {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.2"
                        })}
                      </p>
                      <p>
                        5.3{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.3.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.shipping.5.3.2"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.3.3"
                        })}
                      </p>
                      <p>
                        5.4{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.4"
                        })}
                      </p>
                      <p>
                        5.5{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.5"
                        })}
                      </p>
                      <p>
                        5.6{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.6.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.6.2"
                        })}
                      </p>
                      <p>
                        5.7{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.7"
                        })}
                      </p>
                      <p>
                        5.8{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.8.1"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.8.2"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.8.3"
                        })}
                      </p>
                      <p>
                        5.9{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.9"
                        })}
                      </p>
                      <p>
                        5.10{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.10.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.10.2"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}.id.
                      </p>
                      <p>
                        5.11{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.shippingPolicy.5.11"
                        })}
                      </p>
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        6.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.rejectionTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      <p>
                        6.1{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.rejection.6.1.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.rejection.6.1.2"
                        })}
                      </p>
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        7.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.returnPolicyTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      <p>
                        7.1 {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.returnPolicy.7.1"
                        })}
                      </p>
                      <p>
                        7.2{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.returnPolicy.7.2"
                        })}
                      </p>
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        8.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.informationTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      <p>
                        8.1{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.information.8.1"
                        })}
                      </p>
                      <p>
                        8.2{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.information.8.2"
                        })}
                      </p>
                      <p>
                        8.3{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.information.8.3"
                        })}
                      </p>
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        9.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.complaintTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      <p>
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.complaint.9.1"
                        })}
                      </p>
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        10.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liabilityTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      <p>
                        10.1{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.1"
                        })}
                      </p>
                      <p>
                        10.2{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.2"
                        })}
                      </p>
                      <p>
                        10.3{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.3"
                        })}
                      </p>
                      <p>
                        10.4{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.4"
                        })}
                      </p>
                      <p>
                        10.5{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.5"
                        })}
                      </p>
                      <p>
                        10.6{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.6"
                        })}
                      </p>
                      <p>
                        10.7{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.7"
                        })}
                      </p>
                      <p>
                        10.8{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.8"
                        })}
                      </p>
                      <p>
                        10.9{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.9.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.9.2"
                        })}
                      </p>
                      <p>
                        10.10{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.liability.10.10"
                        })}
                      </p>
                    </Typography>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      <b>
                        11.{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirementsTitle"
                        })}
                      </b>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      <p>
                        11.1{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.1"
                        })}
                      </p>
                      <p>
                        11.2{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.2"
                        })}
                      </p>
                      <p>
                        11.3{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.3"
                        })}
                      </p>
                      <p>
                        11.4{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.4.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.4.2"
                        })}
                      </p>
                      <p>
                        11.5{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.5"
                        })}
                      </p>
                      <p>
                        11.6{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.6"
                        })}
                      </p>
                      <p>
                        11.7{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.7"
                        })}
                      </p>
                      <p>
                        11.8{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.8"
                        })}
                      </p>
                      <p>
                        11.9{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.9"
                        })}
                      </p>
                      <p>
                        11.10{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.10"
                        })}
                      </p>
                      <p>
                        11.11{" "}
                        {intl.formatMessage({
                          id: "termAndCondition.requirements.11.11"
                        })}
                      </p>
                    </Typography>
                  </Box>
                </Box>
              </div>
            </List>
          </Paper>
        </Container>
      </Dialog>

      <Dialog
        fullScreen
        open={isBuka}
        onClose={handleTutup}
        TransitionComponent={Transition}
      >
        <Container maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleTutup}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">
                {" "}
                {intl.formatMessage({
                  id: "privacyPolicy.title"
                })}
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
            <List>
              <div className={classes.body}>
                <Box p={1}>
                  <Typography variant="subtitle2" gutterBottom>
                    <b>
                      {" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.UPPERCASE"
                      })}
                    </b>
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    <p>
                      {" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.definition.1.1"
                      })}{" "}
                      {process.env.REACT_APP_BRAND_NAME}
                      {""}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.definition.1.2"
                      })}
                      {process.env.REACT_APP_BRAND_NAME}
                      {""}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.definition.1.3"
                      })}{" "}
                      {process.env.REACT_APP_BRAND_NAME}
                      {""}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.definition.1.4"
                      })}
                    </p>
                  </Typography>
                </Box>
                <Divider />
                <Box p={1}>
                  <Typography variant="subtitle2" gutterBottom>
                    <b>
                      1.{" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.title.1.0"
                      })}
                    </b>
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    <p>
                      1.1{" "}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.title.1.1"
                      })}{" "}
                      <p>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.1.1.1"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.1.1.2"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.1.1.3"
                        })}
                      </p>
                    </p>
                    <p>
                      1.2 {process.env.REACT_APP_BRAND_NAME}
                      {""}
                      {intl.formatMessage({
                        id: "privacyPolicy.requirements.title.1.2"
                      })}{" "}
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
                      })}{" "}
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
                        })}{" "}
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
                        })}{" "}
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
                        })}{" "}
                        <p>
                          {" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.1.4.3"
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
                            id: "privacyPolicy.requirements.1.4.4"
                          })}
                        </p>
                      </p>
                      <p>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.title.1.4.5"
                        })}{" "}
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
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          2.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.2.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.2.0"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.2.0.1"
                        })}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          3.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.3.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.3.0"
                        })}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          4.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.4.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        <p>
                          4.1{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.4.1"
                          })}{" "}
                          {process.env.REACT_APP_BRAND_NAME}
                          {""}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.4.1.1"
                          })}
                          {process.env.REACT_APP_BRAND_NAME}
                          {""}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.4.1.2"
                          })}{" "}
                          {process.env.REACT_APP_BRAND_NAME}
                          {""}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.4.1.3"
                          })}{" "}
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
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          5.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.5.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.5.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.5.1.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.5.1.2"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.5.1.3"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.5.1.4"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.5.1.5"
                        })}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          6.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.6.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.6.1"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.6.1.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.6.1.2"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.6.1.3"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.6.1.4"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.6.1.5"
                        })}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          7.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.7.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        <p>
                          7.1{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.7.1"
                          })}{" "}
                        </p>

                        <p>
                          7.2{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.7.2"
                          })}
                          <p>
                            {" "}
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
                            7.3.3 Google+:{" "}
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
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          {" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.8.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.8.0"
                        })}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          9.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.9.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        <p>
                          9.1{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.9.1"
                          })}{" "}
                          <p>
                            {" "}
                            {intl.formatMessage({
                              id: "privacyPolicy.requirements.9.1"
                            })}{" "}
                            {process.env.REACT_APP_BRAND_NAME}
                            {""}
                            {intl.formatMessage({
                              id: "privacyPolicy.requirements.9.1.2"
                            })}{" "}
                            {process.env.REACT_APP_BRAND_NAME}
                            {""}
                            {intl.formatMessage({
                              id: "privacyPolicy.requirements.9.1.3"
                            })}
                            {process.env.REACT_APP_BRAND_NAME}
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
                          })}{" "}
                          <p>
                            {" "}
                            {intl.formatMessage({
                              id: "privacyPolicy.requirements.9.2"
                            })}{" "}
                            {process.env.REACT_APP_BRAND_NAME}
                            {""}
                            {intl.formatMessage({
                              id: "privacyPolicy.requirements.9.2.1"
                            })}
                            {process.env.REACT_APP_BRAND_NAME}
                            {""}
                            {intl.formatMessage({
                              id: "privacyPolicy.requirements.9.2.2"
                            })}
                          </p>
                        </p>
                      </Typography>
                    </Box>
                    <Divider />
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          10.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.10.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.10.0"
                        })}{" "}
                        <p>
                          {" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.10.1"
                          })}
                        </p>
                      </Typography>
                    </Box>
                    <Divider />
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          11.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.11.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        <p>
                          11.1 {process.env.REACT_APP_BRAND_NAME}
                          {""}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.11.1"
                          })}
                          {process.env.REACT_APP_BRAND_NAME}
                          {""}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.11.1.2"
                          })}{" "}
                          {process.env.REACT_APP_BRAND_NAME}
                          {""}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.11.1.3"
                          })}
                        </p>

                        <p>
                          11.2{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.11.2"
                          })}
                        </p>
                      </Typography>
                    </Box>
                    <Divider />
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          12.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.12.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.12.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.12.2"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.12.3"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.12.4"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.12.5"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.12.6"
                        })}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box p={1}>
                      <Typography variant="subtitle2" gutterBottom>
                        <b>
                          13.{" "}
                          {intl.formatMessage({
                            id: "privacyPolicy.requirements.title.13.0"
                          })}
                        </b>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        {" "}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.13.0"
                        })}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.13.0.1"
                        })}{" "}
                        {process.env.REACT_APP_BRAND_NAME}
                        {""}
                        {intl.formatMessage({
                          id: "privacyPolicy.requirements.13.0.2"
                        })}
                      </Typography>
                    </Box>
                  </Typography>
                </Box>
              </div>
            </List>
          </Paper>
        </Container>
      </Dialog>
    </Box>
  );
}

export default Component;
