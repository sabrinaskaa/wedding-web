import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function Component(props) {
  const [state, setState] = useState({
    qty: 0,
  });
  const tambah = (product_price) => {
    setState({
      qty: state.qty + 1,
    });
    props.tambahTotalHarga(product_price);
  };

  const kurang = (product_price) => {
    if (state.qty + props.lineitem.quantity === 0) {
      return;
    }
    setState({
      qty: state.qty - 1,
    });
    props.kurangTotalHarga(product_price);
  };

  const { classes } = props;
  const { product_price, quantity, product_name } = props.lineitem;
  sessionStorage.setItem('quantity', state.qty + quantity);
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Grid container spacing={3}>
          <Grid item xs>
            <img alt="alternate" src="" />
          </Grid>
          <Grid item xs>
            <Typography style={{ fontSize: 'small' }} component="p" variant="p">
              {product_name}
            </Typography>
            <Typography
              style={{ fontSize: 'small' }}
              variant="p"
              color="textSecondary"
            >
              {product_price}
            </Typography>
          </Grid>
          <Grid item xs>
            <ButtonGroup
              style={{ marginLeft: 30 }}
              size="small"
              aria-label="Small outlined button group"
            >
              <Button onClick={() => kurang()}>-</Button>
              <Button>{quantity + state.qty}</Button>

              <Button onClick={() => tambah()}>+</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
}

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default Component;
