import axios from 'axios';

export const getBankAcc = async () => {
  const response = await axios.get(
    'https://api.jsonbin.io/b/5f34b254dddf413f95c32d22'
  );
  return response.data;
};
