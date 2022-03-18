const styles = (theme) => ({
  container: {
    height: 150,
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
  locationGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  changeGrid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  locationDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  searchDiv: {
    height: 40,
    width: '100%',
    borderRadius: 100,
    padding: '8px 16px ',
    backgroundColor: '#F1F2F6',
    display: 'flex',
    alignItems: 'center',
  },
  searchDivSquare: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    padding: '8px 16px ',
    backgroundColor: '#F1F2F6',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    color: '#707585',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    marginLeft: 32,
    color: 'inherit',
    width: '100%',
    height: '100%',
  },
  inputInput: {
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
    fontSize: '14px !important',
  },
  adornedEnd: {
    paddingRight: 0,
  },
});

export default styles;
