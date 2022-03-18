import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Appbar from "../../components/app-bar";
import { tenantInfo } from "../../services/vendor";
import parse from "html-react-parser";
import { useIntl } from "react-intl";
import { withTransaction } from "@elastic/apm-rum-react";

function AboutUs(props) {
  const intl = useIntl();
  const { classes } = props;
  const [tenantData, setTenantData] = useState(null);

  useEffect(() => {
    const tenantLocalStorage = localStorage.getItem("tenant");
    if (tenantLocalStorage) {
      setTenantData(JSON.parse(tenantLocalStorage));
    } else {
      tenantInfo()
        .then(res => setTenantData(res?.data))
        .catch(() => alert("Error getting Tenant Info."));
    }
  }, []);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <Appbar
          title={`${intl.formatMessage({ id: "aboutUs.requirements.1.0" })}`}
          goBack
        />
        <Paper className={classes.paper}>
          <div align="center" style={{ paddingTop: "3%" }}>
            <img
              alt={process.env.REACT_APP_BRAND_NAME || "Srikopi"}
              className={classes.img}
              src={tenantData?.icon?.url}
            />
            <Divider />
            <Box p={1} width={400}>
              <Typography variant="subtitle2" gutterBottom>
                <b>{tenantData?.name}</b>
              </Typography>
              <Typography variant="caption" gutterBottom>
                {tenantData?.description && parse(tenantData.description)}
              </Typography>
            </Box>
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default withTransaction("AboutUs", "component")(AboutUs);
