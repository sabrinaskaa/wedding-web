const styles = (theme) => ({
  root: {},
  container: {
    padding: 0,
    minHeight: '100vh',
    height: '100%',
    borderLeft: '1px solid #f1f1f1',
    borderRight: '1px solid #f1f1f1',
  },
  indicator: { paddingTop: 50, marginBottom: 50 },
  body: {
    minHeight: '100vh',
    display: 'flex',
    padding: 16,
    paddingTop: 80,
  },
  form: {
    width: '100%',
    marginTop: 8,
  },
  text12: {
    fontSize: 12,
  },
  inputRoot: {
    padding: '12px 16px',
    fontSize: 12,
    background: '#FBFBFB',
    border: '1.5px solid rgba(37, 37, 37, 0.05)',
  },
  inputRootMultiline: {
    fontSize: 12,
    background: '#FBFBFB',
    border: '1.5px solid rgba(37, 37, 37, 0.05)',
    margin: 0,
  },
});
export default styles;
