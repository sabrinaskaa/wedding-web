import { Hidden } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import {useState} from 'react'
import styles from './styles.module.css'

function ProductList(props) {
  const [qty, setQty] = useState(0);

  const handlePlus = () =>{
    setQty(qty + 1);
  }

  const handleMinus = () => {
    if(qty > 0){
      setQty(qty - 1)
    };
  }

    // const [qty, setQty] = useState(0);
  
    // const handlePlus = () => {
    //   setQty(qty + 1);
    // }
    // const handleMinus = () => {
    //   if (qty > 0){
    //     setQty(qty - 1);
    //   }
    // }
    
    // const equalZero = () => {
    //   if (qty == 0){
    //     setQty("Beli")
    //   }
    // }

    return (
      <div className={styles.cardContainer}>
        <div className={styles.productContent}>
        <span style={props.data.css}>{props.data.disc}</span>
          <img
            className={styles.productImg}
            src={props.data.img}
            alt="productImg"
          />
          <div className={styles.productRow}>
            <span className={styles.dataName}>{props.data.name}</span>
            <span className={styles.dataLabel}>{props.data.label}</span>
            <span className={styles.dataDiscHarga}>{props.data.discHarga || ""}</span>
            <span className={styles.dataHarga}>{props.data.harga}</span>
          </div>
        </div>
        <div className={styles.btnRow}>
          {qty === 0 ? <button className={styles.btnBeli} onClick={handlePlus}>Beli</button> : (
            <div className={styles.qtyContainer}>
              <button onClick={handleMinus} className={styles.handleMinus}>-</button>
              <b className={styles.quantity}>{qty}</b>
              <button onClick={handlePlus} className={styles.handlePlus}>+</button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default ProductList;