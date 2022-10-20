const formatTime = (datetime) => {
  let formatTime = "";

  formatTime =
    datetime.slice(0, 4) +
    "." +
    datetime.slice(5, 7) +
    "." +
    datetime.slice(8, 10);

  return formatTime;
};

export default formatTime;
