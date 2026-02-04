export const getCategoryAggregate = (data) => {
  let result = data.reduce((acc, ele) => {
    acc[ele.type] = (acc[ele.type] || 0) + ele.co2;
    return acc;
  }, {});
  console.log(result);
  return result;
};

export const getDateAggregate = (data) => {
  let result = data.reduce((acc, ele) => {
    acc[ele.date] = (acc[ele.date] || 0) + ele.co2;
    return acc;
  }, {});
  console.log(result);
  return result;
};
