const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: "24px 16px",
    borderRadius: 0,
    width: "100%",
    maxWidth: 442,
    marginBottom: 5,
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)"
  },
  roots: {
    ...theme.mixins.gutters(),
    borderRadius: 0,
    width: "100%",
    maxWidth: 442,
    paddingBottom: "5%",
    paddingTop: "5%",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "5%"
    },
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)"
  },
  container: {
    paddingTop: 64,
    padding: 0,
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#FAFAFA",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    paddingBottom: 56
  },
  appbar: {
    width: "100%",
    maxWidth: 442,
    position: "fixed",
    top: 0,
    backgroundColor: "#FFFFFF",
    maxHeight: 120,
    boxShadow: " 0px 1px 5px rgba(0, 0, 0, 0.05)",
    zIndex: 999
  },
  textProfil: {
    color: "#14181B",
    fontFamily: process.env.REACT_APP_FONT_FAMILY || "Montserrat"
  },
  profilApp: {
    display: "flex",
    justifyContent: "Space-Between",
    alignItems: "center"
  },
  nama: {
    color: "#14181B"
  },
  bigAvatar: {
    width: 70,
    height: 70
  },
  versi: {
    padding: "4% 4% 4% 4%",
    display: "flex",
    justifyContent: "flex-end"
  },
  textVersi: {
    fontSize: 12,
    position: "absolute",
    right: 50
  },
  button: {
    fontSize: 14,
    fontWeight: 600,
    color: "#EB4755",
    width: "100%",
    border: "1px solid #EB4755",
    padding: "12px 0px",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: 8
  }
});

export default styles;
