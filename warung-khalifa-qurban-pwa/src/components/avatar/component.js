import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

function Profileavatar(props) {
  const { classes } = props;
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar
        alt="User"
        src="http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/User-group-icon.png"
        className={classes.bigAvatar}
        style={{ marginBottom: 20 }}
      />
    </Grid>
  );
}

Profileavatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Profileavatar;
