var pubSub = window["pubSub"] || {
  events : {},
  //whee, magic number
  token_iterator : 0,
  // returns a token that identifies this particular subscription to be used for unsubscribing
  subscribe : function (event, callback) {
    var token = pubSub.token_iterator++;
    pubSub.events[event] = pubSub.events[event] || [];
    pubSub.events[event].push({callback : callback, token : token});
    return token;
  },
  publish : function (event) {
    var subscription;
    pubSub.events[event] = pubSub.events[event] || [];
    for (subscription in pubSub.events[event]) {
      pubSub.events[event][subscription].callback();
    }
  },
  unsubscribe : function (token) {
    var subscription, i;
    for (subscription in pubSub.events) {
      for (i = 0; i < pubSub.events[subscription].length; i++) {
        //removes the subscription by its token
        if (token === pubSub.events[subscription][i].token) {
          pubSub.events[subscription].splice(i,1);
          return true;
        }
      }
    }
    return false;
  }
};
