function getFeild(request, fields) {
  Object.keys(request).forEach(element => {
    if (Object.keys(request[element]).length == 0) {
      if (fields[element]) {
        request[element] = fields[element];
      }
    } else {
      getFeild(request[element], fields);
    }
  });
}
export function populateJSON(val, fields) {
  getFeild(val, fields);
  return val;
}
