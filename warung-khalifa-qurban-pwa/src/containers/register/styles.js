const styles = theme => ({
  container: {
    backgroundColor: "#fff",
    padding: 0,
    paddingTop: 64,
    marginTop: -16,
    maxWidth: 444,
    minHeight: "100vh",
    height: "100%",
    borderLeft: "1px solid #f1f1f1",
    borderRight: "1px solid #f1f1f1"
  },
  image: {
    margin: theme.spacing(1),
    width: 128
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  term: {
    color: "white",
    fontSize: 9,
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4)
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    marginTop: 20
  }
});

export default styles;
