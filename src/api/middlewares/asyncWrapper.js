const asyncWrapper = (callback) => {
  return (req, res, next) => {
    return callback(req, res, next).catch(next);
  };
};

module.exports = asyncWrapper;
