const styles = theme => ({
  root: {
    padding: 16,
    cursor: "pointer"
  },
  card: {
    height: 40,
    borderRadius: 8,
    padding: 12,
    display: "flex",
    alignItems: "center"
  },
  content: {
    fontSize: 12,
    fontWeight: 600,
    color: "white"
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    height: 25,
    width: 88,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 600,
    color: "white"
  }
});

export default styles;
