import styles from './styles.module.css'

function CategoriesButton(props){
    return(
        <div className={styles.buttonWrapper}>
            <button className={styles.buttonCategory}>
                <img
                    src={props.data.imgPath}
                    alt="productImg"
                    className={styles.buttonImg}
                />
            </button>
            <p className={styles.paraghraphButton}>{props.data.label}</p>
        </div>
    )
}

export default CategoriesButton;