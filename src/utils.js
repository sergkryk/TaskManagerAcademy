const createMarkup = (arr, callback) => {
  return arr.map((it) => {
    return callback(it);
  }).join('');
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());
  return `${hours}:${minutes}`;
};

export {createMarkup, formatTime};
