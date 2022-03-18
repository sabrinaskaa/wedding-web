import React from "react";
import PropTypes from "prop-types";

class PaginationDot extends React.Component {
  handleClick = event => {
    this.props.onClick(event, this.props.index);
  };

  render() {
    const { active } = this.props;

    const isLocationClose =
      localStorage.getItem("isLocationClose") ||
      localStorage.getItem("isLocationCloseHour");

    const styles = {
      root: {
        height: 18,
        cursor: "pointer",
        border: 0,
        background: "none",
        padding: 0,
        margin: "10px 3px 0px"
      },
      dot: {
        backgroundColor: process.env.REACT_APP_COLOR_SECONDARY || "#6FCF97",
        height: 8,
        width: 8,
        borderRadius: "50%",
        filter: isLocationClose ? "grayScale(1)" : "unset"
      },
      active: {
        backgroundColor: process.env.REACT_APP_COLOR_PRIMARY || "#FFD101",
        width: 30,
        borderRadius: 99
      }
    };

    let styleDot;

    if (active) {
      styleDot = Object.assign({}, styles.dot, styles.active);
    } else {
      styleDot = styles.dot;
    }

    return (
      <button type="button" style={styles.root} onClick={this.handleClick}>
        <div style={styleDot} />
      </button>
    );
  }
}

PaginationDot.propTypes = {
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PaginationDot;
