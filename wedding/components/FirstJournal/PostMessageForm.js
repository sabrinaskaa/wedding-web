import React, { useEffect, useState } from "react";
import useForm from "./useForm.js";
import { connect } from "react-redux";
import * as actions from "../../actions/postMessage.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

import styles from "./styles.module.css";

const initialFieldValues = {
  title: "",
  message: "",
};

const PostMessageForm = (props) => {
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.postMessageList.find((x) => x._id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  const validate = () => {
    let temp = { ...errors };
    temp.title = values.title ? "" : "This field is required.";
    temp.message = values.message ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };

  var { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Post Box"
            content="Submitted successfully"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<AssignmentTurnedIn />}
          />
        ),
      });
      resetForm();
    };
    if (validate()) {
      props.createPostMessage(values, onSuccess);
    }
  };

  return (
    <form
      className={styles.form}
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className={styles.input}
        placeholder="Name"
        name="title"
        variant="outlined"
        label="Title"
        fullWidth
        value={values.title}
        onChange={handleInputChange}
        {...(errors.title && { error: true, helperText: errors.title })}
      />
      <input
        className={styles.input}
        placeholder="Message"
        name="message"
        variant="outlined"
        label="Message"
        fullWidth
        value={values.message}
        onChange={handleInputChange}
        {...(errors.message && { error: true, helperText: errors.message })}
      />
      <button
        className={styles.btnSubmit}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
      >
        send wish
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  postMessageList: state.postMessage.list,
});

const mapActionToProps = {
  createPostMessage: actions.create,
  updatePostMessage: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(PostMessageForm);
