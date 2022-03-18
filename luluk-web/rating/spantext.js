import styles from "./styles.module.css";

function TextContent(props) {
  return (
    <div>
      {/* <img src={props.data.icon} alt={props.data.text} /> */}
      {props.data.text}
    </div>
  );
}

export default TextContent;
