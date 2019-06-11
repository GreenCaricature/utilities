//will not deep copy functions
function deepCopy(object) {
  var param, key, new_copy;
  if (Object.prototype.toString.call(object).indexOf("Array") === -1) {
    new_copy = {};
  } else {
    new_copy = [];
  }

  for (key in object) {
    if (typeof object[key] === "object" && object[key] !== null) {
      new_copy[key] = deepCopy(object[key]);
    } else {
      new_copy[key] = object[key];
    }
  }
  return new_copy;
}
