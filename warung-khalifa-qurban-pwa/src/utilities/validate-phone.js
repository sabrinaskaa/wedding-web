export const validatePhone = (number, ccNumber) => {
  const validPhone = number
    ? number.slice(0, 1) === "0"
      ? ccNumber + number.slice(1, number.length)
      : number.slice(0, 2) === ccNumber
      ? number
      : ccNumber + number
    : null;

  return validPhone;
};
