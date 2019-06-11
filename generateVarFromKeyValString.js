//generates variable from a key/value formatted string, ex. 'key=val'
var generateVarFromKeyValString = function(keyval,obj) {
  var keyval_array = keyval.split("=");
  obj[keyval_array[0]] = keyval_array[1];
}
