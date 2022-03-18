/* eslint-disable no-sequences */
import React, { useRef } from "react";
import { withRouter } from "react-router-dom";
import { InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function Component(props) {
  const { classes } = props;
  const textInput = useRef(null);

  return (
    <>
      <div
        className={props.rounded ? classes.searchDiv : classes.searchDivSquare}
      >
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          inputRef={textInput}
          placeholder={props.placeholder}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          endAdornment={
            <>
              {props.value === "" ? (
                <div />
              ) : (
                <IconButton
                  onClick={() => (
                    props.handleClear(""), (textInput.current.value = "")
                  )}
                  style={{ padding: 0 }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </>
          }
          InputProps={{
            disableUnderline: true,

            classes: {
              adornedEnd: classes.adornedEnd
            }
          }}
          onChange={props.keyword}
        />
      </div>
    </>
  );
}

export default withRouter(Component);
