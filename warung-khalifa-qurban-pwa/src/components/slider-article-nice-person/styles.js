const styles = theme => ({
  card: {
    minWidth: 259,
    boxShadow: "0px 1px 7px rgba(0, 0, 0, 0.07)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    marginRight: "16px",
    cursor: "pointer"
  },
  image: {
    height: 129,
    width: "100%",
    borderRadius: "7px 7px 0 0",
    objectFit: "cover"
  },
  content: {
    borderRadius: "0 0 7px 7px",
    objectFit: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 16
  }
});

export default styles;
