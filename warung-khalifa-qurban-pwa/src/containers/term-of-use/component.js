import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Appbar from "../../components/app-bar";
import { withTransaction } from "@elastic/apm-rum-react";
import { useIntl } from "react-intl";

function TermOfUse(props) {
  const { classes } = props;
  const intl = useIntl();
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <Appbar
          title={`${intl.formatMessage({ id: "termAndCondition" })}`}
          goBack
        />
        <Paper elevation={0} className={classes.paper}>
          <div className={classes.typography}>
            <Typography style={{ paddingLeft: 7 }}>
              <b>
                {" "}
                {intl.formatMessage({
                  id: "termAndCondition"
                })}
              </b>
            </Typography>
            <Box p={1}>
              <Typography variant="caption" gutterBottom>
                {" "}
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
                {process.env.REACT_APP_BRAND_NAME || "Srikopi"}{" "}
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
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"};
                </p>
                <p>
                  2.3{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.definition.2.3"
                  })}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"};
                </p>
                <p>
                  2.4{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.definition.2.4.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}{" "}
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
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.definition.2.6.2"
                  })}
                </p>
                <p>
                  2.7{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.definition.2.7.1"
                  })}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.definition.2.7.3"
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
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.definition.2.10.3"
                  })}
                </p>
                <p>
                  2.11{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.definition.2.11"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
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
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.order.3.1.2"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"});{""}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.order.3.1.3"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.order.3.1.4"
                  })}
                </p>
                <p>
                  3.2{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.order.3.2.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.order.3.2.2"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
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
                  })}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.price.4.1.2"
                  })}
                </p>
                <p>
                  4.2{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.price.4.2.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.price.4.2.2"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
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
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.price.4.4.2"
                  })}
                </p>
                <p>
                  4.5{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.price.4.5.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
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
                  5.2 {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.shippingPolicy.5.2"
                  })}
                </p>
                <p>
                  5.3{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.shippingPolicy.5.3.1"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.shippingPolicy.5.3.2"
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
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
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
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
                  })}{" "}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.shippingPolicy.5.8.2"
                  })}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
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
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.shippingPolicy.5.10.2"
                  })}
                  {""}
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}.
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
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
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
                  7.1 {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
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
                    id: "termAndCondition.termAndCondition.informationTitle"
                  })}
                </b>
              </Typography>
              <Typography variant="caption" gutterBottom>
                <p>
                  {" "}
                  {intl.formatMessage({
                    id: "termAndCondition.termAndCondition.information.8.1"
                  })}
                </p>
                <p>
                  8.2{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.termAndCondition.information.8.2"
                  })}
                </p>
                <p>
                  8.3{" "}
                  {intl.formatMessage({
                    id: "termAndCondition.termAndCondition.information.8.3"
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
                    id: "termAndCondition.termAndCondition.complaintTitle"
                  })}
                </b>
              </Typography>
              <Typography variant="caption" gutterBottom>
                <p>
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
                  {intl.formatMessage({
                    id: "termAndCondition.termAndCondition.complaint.9.1"
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
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
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
                  {process.env.REACT_APP_BRAND_NAME || "Srikopi"}
                  {""}
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
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
export default withTransaction("TermOfUse", "component")(TermOfUse);
