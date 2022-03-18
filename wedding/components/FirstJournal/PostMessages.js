import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/postMessage.js";
import PostMessageForm from "./PostMessageForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";
import styles from "./styles.module.css";

const styling = (theme) => ({
  actionDiv: {
    textAlign: "center",
  },
});

const PostMessages = (props) => {
  //const {classes, ...props} = props
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllPostMessages();
  }, []); //DidMount

  const onDelete = (id) => {
    const onSuccess = () => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Post Box"
            content="Deleted successfully"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<DeleteSweep />}
          />
        ),
      });
    };
    if (window.confirm("Are you sure to delete this record?"))
      props.deletePostMessage(id, onSuccess);
  };

  return (
    <div className={styles.container}>
      <span className={styles.titleGuest}>Guest Book</span>
      <span className={styles.subtitle}>Leave a Message / Wishes for us…</span>
      <div className={styles.row}>
        <PostMessageForm {...{ currentId, setCurrentId }} />
      </div>
      <div className={styles.row}>
        <div className={styles.list}>
          {props.postMessageList.map((record, index) => {
            return (
              <Fragment key={index}>
                <div className={styles.listItem}>
                  <div className={styles.listItemText}>
                    <span className={styles.titleName}>{record.title}</span>
                    <span className={styles.message}>{record.message}</span>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postMessageList: state.postMessage.list,
});

const mapActionToProps = {
  fetchAllPostMessages: actions.fetchAll,
  deletePostMessage: actions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(PostMessages);
