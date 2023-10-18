export const handleSaveError = (error, data, next) => {
  const { code, name } = error;
  error.status = name === "MongoServerError" || name === 11000 ? 409 : 400;

  next();
};

export const runValidatorsAtUpdate = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};
