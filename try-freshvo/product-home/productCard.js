import ProductList from './listProduct';
import styles from './styles.module.css'

const listProduct = [
    {
        disc: "Disk. 0%",
        css: {
            position: 'absolute',
            justifyContent: 'flex-start',
            display: 'flex',
            width: 'fit-content',
            backgroundColor: '#00A739',
            color: '#fff',
            margin: 0,
            opacity: 0.8,
            padding: '8px',
            fontSize: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
            borderRadius: '5px 0 5px 0',
        },
        img: "https://warung-io.s3.ap-southeast-1.amazonaws.com/006_Buah%20Naga%20Merah.jpg-2021-07-21T10%3A37%3A25.549Z",
        name: "Buah Naga",
        label: "Min order 1x Kg",
        discHarga: "Rp 20.000",
        harga: "Rp 20.000"
    },
    {
        img: "https://warung-io.s3.ap-southeast-1.amazonaws.com/004_Alpukat%20Reguler.jpg-2021-07-21T10%3A38%3A14.681Z",
        name: "Alpukan Mentega",
        label: "Min order 1x Kg",
        harga: "Rp 35.500"
    },
    {
        img: "https://warung-io.s3.ap-southeast-1.amazonaws.com/002_Mangga%20Harum%20Manis.jpg-2021-07-21T10%3A38%3A00.821Z",
        name: "Mangga Harum Manis",
        label: "Min order 1x Kg",
        harga: "Rp 35.000"
    }
];

function ProductCard(){
    return(
        <div className={styles.rowProduct}>
            {listProduct.map((product, index) => (
                <ProductList data={product} key={index} />
            ))}
        </div>
    )
}

export default ProductCard;