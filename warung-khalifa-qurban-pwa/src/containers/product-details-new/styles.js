const styles = (theme) => ({
  media: {
    height: 250,
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 13,
  },
  old: {
    textDecoration: 'line-through',
    color: 'grey',
  },
  price: {
    color: '#52575C',
    fontWeight: 'bold',
    fontSize: 12,
  },
  container: {
    padding: 0,

    marginBottom: 0,
    height: '100vh',
    borderLeft: '1px solid #f1f1f1',
    borderRight: '1px solid #f1f1f1',
  },
  cardMediaTitle: {
    color: '#FF6160',
    fontWeight: 'bold',
    margin: 0,
  },
  cardMedia: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '-webkit-fill-available',
  },
  descript: {
    padding: 20,
  },
  paper: {
    borderRadius: 0,
    paddingTop: 64,
    minHeight: '100vh',
    height: '100%',
    maxWidth: 440,
  },
  card: {
    minHeight: 600,
    borderRadius: 0,
  },
  btn: {
    justifyContent: 'space-between',
    display: 'flex',
    marginBottom: 10,
  },
  box: {
    marginTop: 8,
    padding: 4,
  },
  stickToBottom: {
    width: '100%',
    maxWidth: 442,
    position: 'fixed',
    bottom: 0,
    padding: 'auto',
    backgroundColor: 'white',
  },
  paperbtn: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 442,
    borderRadius: 0,
  },
  button: { backgroundColor: '#ED6B5A', color: 'white' },
  dialog: {
    width: '100%',
    height: '60vh',
    marginBottom: 0,
  },
  buttonRoot: {},
  buttonText: {
    textTransform: 'capitalize',
    fontSize: 12,
  },

  search: {
    position: 'relative',
    borderRadius: 5,
    backgroundColor: '#bdbdbd',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: 16,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '16px 16px 16px 8px',
    width: '100%',
  },
});

export default styles;
