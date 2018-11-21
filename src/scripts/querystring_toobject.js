/* exported queryStringToObject */
function queryStringToObject(queryString) {
  const queryObject = {};

  if (queryString) {
    const params = queryString.split('&');
    for (let index = 0, length = params.length; index < length; index++) {
      if (!params[index]) {
        continue;
      }

      const nameValue = params[index].split('=');
      const name = decodeURIComponent(nameValue[0]);
      const value = decodeURIComponent(nameValue[1] != null ? nameValue[1] : nameValue[0]);
      queryObject[name] = value;
    }
  }

  return queryObject;
}
