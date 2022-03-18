import moment from "moment";

export const getBuildDate = epoch => {
  const buildDate = moment(epoch).format("YY") / 10;
  const month = moment(epoch).format("M");
  return `${buildDate}.${month}`;
};
