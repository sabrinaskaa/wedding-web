import * as React from 'react';
import Stack from '@mui/material/Stack';
import styles from './styles.module.css'
import CategoriesButton from './buttons';

const buttons = [
  {
    imgPath:
    'https://warung-io.s3.ap-southeast-1.amazonaws.com/2021-07-27T11%3A32%3A59.007Z-ALL.png',
    label: 'Semua'
  },
  {
    imgPath:
    'https://warung-io.s3.ap-southeast-1.amazonaws.com/2021-08-16T16%3A00%3A26.652Z-2021-07-22T05_30_33.801Z-Buah%201.png',
    label: 'Buah'
  },
  {
    imgPath:
    'https://warung-io.s3.ap-southeast-1.amazonaws.com/2021-07-22T05%3A30%3A42.109Z-Sayur%201.png',
    label: 'Sayuran'
  },
  {
    imgPath:
    'https://warung-io.s3.ap-southeast-1.amazonaws.com/2021-07-22T05%3A30%3A51.882Z-Protein%201.png',
    label: 'Protein'
  },
  {
    imgPath:
    'https://warung-io.s3.ap-southeast-1.amazonaws.com/2021-07-22T05%3A30%3A58.386Z-Bumbu%201.png',
    label: 'Bumbu'
  },
];

function ColorButtons() {
  return (
    // <Stack direction="row" spacing={2}>
    <div className={styles.containerButtons}>
      {buttons.map((product, index) => (
      <CategoriesButton 
        data={product} key={index}
      />
      ))}

      {/* <Button color="secondary">Secondary</Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="outlined" color="error">
        Error
      </Button> */}
    {/* </Stack> */}
    </div>
  );
}

export default ColorButtons;