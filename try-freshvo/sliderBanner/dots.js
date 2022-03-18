import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MobileStepper from '@mui/material/MobileStepper';
import { margin } from '@mui/system';
import { render } from 'react-dom';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import styling from './styles.module.css'

const useStyles = makeStyles ({
  root: {
    maxWidth: 444,
    flexGrow: 1,
    marginLeft: 10,
  },
  dot: {
    backgroundColor: "rgb(0, 167, 57)",
    opacity: "0.5",
  },
  dotActive: {
    backgroundColor: "rgb(0, 167, 57)",
    opacity: "0.5",
    width: "30px",
    borderRadius: "99px",
  }
});

export default function DotsMobileStepper({index}) {
  // class DotsMobileStepper extends Component{
  //   render(){
  //     return ( 
  //       <MobileStepper
  //             variant="dots"
  //             steps={4}
  //             position="static"
  //             activeStep={index}
  //             sx={{ 
  //               maxWidth: 400, 
  //               flexGrow: 1,
  //             }}
  //             classes={{
  //               root: classes.root, 
  //               dots: classes.dots,
  //               dot: classes.dot, 
  //               dotActive: classes.dotActive,
  //             }}
  //           />
  //     )
  //   }
  // }

  // export default withStyles(styles)(DotsMobileStepper({index}));
  



  const classes = useStyles();
  
    return (
      <div>
        <MobileStepper
          variant="dots"
          steps={4}
          position="static"
          activeStep={index}
          sx={{ 
            maxWidth: 400, 
            flexGrow: 1,
          }}
          classes={{
            root: classes.root, 
            dots: classes.dots,
            dot: classes.dot, 
            dotActive: classes.dotActive,
          }}
        />
      </div>
    );
  }