import * as React from 'react';
import flowRight from 'lodash/flowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import DotsMobileStepper from './dots';

const styles = {
    root: {
      padding: '0 5px 1rem 5px',
      backgroundColor: '#fff',
    },
    slideContainer: {
      padding: '0 10px',
      position: 'relative',
      height: '160px',
    },
    slide: {
      height: '160px',
      color: '#fff',
      borderRadius: '8px',
    },
    slide1: {
      backgroundImage: `url("https://warung-io.s3.ap-southeast-1.amazonaws.com/Banner%204.jpg-2021-07-20T04%3A44%3A10.877Z")`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    slide2: {
      backgroundImage: `url("https://warung-io.s3.ap-southeast-1.amazonaws.com/Banner%202.jpg-2021-07-18T15%3A04%3A03.847Z")`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    slide3: {
      backgroundImage: `url("https://warung-io.s3.ap-southeast-1.amazonaws.com/Banner.jpg-2021-07-18T14%3A47%3A08.708Z")`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    slide4: {
        backgroundImage: `url("https://warung-io.s3.ap-southeast-1.amazonaws.com/Banner%203.jpg-2021-07-19T04%3A42%3A14.676Z")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
  };
  
//const EnhancedSwipeableViews = flowRight(autoPlay)(SwipeableViews);
const AutoPlaySwipeableViews = flowRight(autoPlay)(SwipeableViews);

class DemoAutoPlay extends React.Component {
  state = {
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <div style={styles.root}>
        <AutoPlaySwipeableViews index={index} enableMouseEvents onChangeIndex={this.handleChangeIndex} style={styles.root} slideStyle={styles.slideContainer}>
          <div style={Object.assign({}, styles.slide, styles.slide1)}></div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}></div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}></div>
          <div style={Object.assign({}, styles.slide, styles.slide4)}></div>
        </AutoPlaySwipeableViews>
        <DotsMobileStepper dots={3} index={index} onChangeIndex={this.handleChangeIndex} />
      </div>
    );
  }
}

export default DemoAutoPlay;







// const SlideBanner = () =>{
//     const [index, setIndex] = React.useState(0)
//     console.log(index)

//     const listBanner = [
//         "slide1", "slide2", "slide3", "slide4"
//     ]

//     React.useEffect(()=>{
//         setTimeout(() => {
//             if(index === listBanner.length -1){
//                 setIndex(0)
//             }else{
//             setIndex(index+1)
//             }
//         }, 4000);
//     }, [index])

  

//     return(
//         <div style={styles.root}>
//           <EnhancedSwipeableViews index={index} enableMouseEvents style={styles.root} slideStyle={styles.slideContainer}>
//               {listBanner.map(item=>(
//             <div style={Object.assign({}, styles.slide, styles[item])}></div>

//               ))}
//           </EnhancedSwipeableViews>
//           <DotsMobileStepper index={index} totalBanner={listBanner.length}/>
//         </div>
//     )
// }
  







// class DemoAutoPlay extends React.Component {
//     state = {
//       index: 0,
//     };
  
//     handleChangeIndex = index => {
//       this.setState({
//         index,
//       });
//     };

  
//     render() {
//       const { index } = this.state;
//       console.log(index)
  
//       return (
//         <div style={styles.root}>
//           <EnhancedSwipeableViews index={3} enableMouseEvents style={styles.root} slideStyle={styles.slideContainer}>
//             <div style={Object.assign({}, styles.slide, styles.slide1)}></div>
//             <div style={Object.assign({}, styles.slide, styles.slide2)}></div>
//             <div style={Object.assign({}, styles.slide, styles.slide3)}></div>
//             <div style={Object.assign({}, styles.slide, styles.slide4)}></div>
//           </EnhancedSwipeableViews>
//           <DotsMobileStepper />
//         </div>
//       );
//     }
//   }
  
  // export default SlideBanner;
  