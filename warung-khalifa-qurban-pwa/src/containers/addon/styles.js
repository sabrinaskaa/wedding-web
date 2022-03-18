const styles = theme => ({
  container: {
    marginBottom: 0,
    padding: 0,
    minHeight: "100%",
    height: "100%",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1",
    maxWidth: 444
  },
  paper: {
    paddingTop: 64,
    borderRadius: 0,
    minHeight: "100vh",
    paddingBottom: 110
  },
  boxWrapper: {
    padding: "12px 16px"
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
    color: "#333333",
    marginBottom: 8
  },
  subtitle: {
    color: "#808080",
    fontWeight: 400,
    fontSize: 12
  },
  note: {
    height: 45,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    marginTop: 16
  },
  inputRoot: {
    marginLeft: 14,
    color: "inherit",
    width: "100%",
    height: "100%"
  },
  inputInput: {
    width: "100%",
    fontSize: "14px !important"
  },
  button: {
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 45
  }
});
export default styles;
