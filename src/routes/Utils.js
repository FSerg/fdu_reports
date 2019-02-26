const errorMessage = (filed, filedName) => {
  const errorMessageStr = `Filed: [${filedName}] can't be empty!`;
  console.error(errorMessageStr);
  return errorMessageStr;
};

const checkField = (filed, filedName) => {
  if (!filed) {
    return errorMessage(filed, filedName);
  }
  return null;
};

module.exports = {
  errorMessage,
  checkField
};
