//will not deep copy functions

// ECMA 3 safe version
function deepCopy(object) {
  var key, new_copy;
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


// post ECMA 3 version
function deepCopy(object) {
	var copy = Array.isArray(object) ? [] : {};
		for (let key in object) {
		if (typeof object[key] === "object" && object[key] !== null) {
			copy[key] = deepCopy(object[key]);
		} else {
			copy[key] = object[key];
		}	
	}
	return copy;
}
