const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: 230,
    borderRadius: 0,
    maxWidth: 360
  },
  bigAvatar: {
    marginTop: 100,
    width: 50,
    height: 50
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: 'auto',
    backgroundColor: 'white'
  },
  paperbtn: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500
  },
  button: {
    backgroundColor: '#FF4600',
    color: 'white'
  },
  container: {
    marginBottom: 100
  }
});
export default styles;
