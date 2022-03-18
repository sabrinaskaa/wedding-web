import React from 'react';
import { withRouter } from 'react-router-dom';
import whatsapp from '../../vector/wa.svg';

function Component(props) {
  const fabStyle = () => {
    if (window.location.pathname === '/help') {
      return {
        marginBottom: 56,
      };
    }
  };
  const { classes } = props;
  return (
    <img
      src={whatsapp}
      className={classes.fab}
      style={fabStyle()}
      alt="WhatsApp"
    />
  );
}

export default withRouter(Component);
