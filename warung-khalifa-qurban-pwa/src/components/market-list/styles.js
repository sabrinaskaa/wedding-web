const styles = (theme) => ({
  card: {
    width: 150,
    margin: 10,
  },
  cardSelected: {
    width: 150,
    margin: 10,
    backgroundColor: "hsla(0, 0%, 0%, 0.2)",
  },
  media: {
    height: "60px",
    width: "60px",
    borderRadius: 8,
    objectFit: "cover",
  },
  // contentGrid: {
  //   '@media (max-width:400px)': {
  //     marginLeft: 12,
  //   },
  //   '@media (max-width:350px)': {
  //     marginLeft: 12,
  //   },
  // },
  gridName: {
    display: "flex",
    justifyContent: "Space-Between",
  },
  contentWrapper: {
    padding: "0px 0px 0px 12px",
  },
  produk: {
    fontSize: 12,
    paddingTop: "1%",
    [theme.breakpoints.down("xs")]: {
      paddingTop: 0,
    },
  },
  paper: {
    minHeight: 90,
    padding: 16,
    margin: "8px 16px",
    borderRadius: 10,
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)",
    display: "flex",
    alignItems: "flex-start",
  },
});
export default styles;
