function returnRawError(code, message, details) {
  return {
    success: false,
    error: { code, message, details }
  };
}

module.exports = {
  returnSuccess: function (data) {
    return {
      success: true,
      result: data
    };
  },

  returnError: function (code, message, details) {
    return returnRawError(code, message, details);
  },

  returnError500: function (details) {
    return returnRawError(500, '产生了一个服务器内部错误！', details);
  }
};
