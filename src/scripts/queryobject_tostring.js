/* exported queryObjectToString */
function queryObjectToString(queryObject) {
  const queryArray = [];

  if (queryObject) {
    for (const key in queryObject) {
      if (queryObject.hasOwnProperty(key) && queryObject[key] != null) {
        const name = encodeURIComponent(key);
        const value = encodeURIComponent(queryObject[key]);
        queryArray.push(`${name}=${value}`);
      }
    }
  }

  return queryArray.join('&');
}
