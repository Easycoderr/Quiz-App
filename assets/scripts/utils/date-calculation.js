const currentDate = `${new Date().getUTCFullYear()}/${
  new Date().getUTCMonth() + 1
}/${new Date().getUTCDate()}`;
const dayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
export { currentDate, dayOfYear };
