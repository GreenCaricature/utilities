var pubSub = window.pubSub || {
  events : {},
  // magic number as baseline for subscription IDs
  subscription_id_iterator : 0,
  subscribe : function (event, callback) {
    var subscription_id;
    pubSub.events[event] = pubSub.events[event] || {subscriptions:[],has_published:false};
    if (pubSub.events[event].has_published) {
      callback();
    } else {
      subscription_id = pubSub.subscription_id_iterator++;
      pubSub.events[event].subscriptions.push({callback : callback, subscription_id : subscription_id});
    }
    return subscription_id;
  },
  publish : function (event) {
    var subscription;
    pubSub.events[event] = pubSub.events[event] || {subscriptions:[],has_published:false};
    if (!pubSub.events[event].has_published) {
      pubSub.events[event].has_published = true;
      // if there are pre-existing subscriptions, invoke their callbacks
      if (pubSub.events[event].subscriptions.length > 0) {
        for (subscription in pubSub.events[event].subscriptions) {
          pubSub.events[event].subscriptions[subscription].callback();
        } 
        // clears the original array after subscriptions have been triggered
        pubSub.events[event].subscriptions.length = 0;
      }    
    }
  },
  unsubscribe : function (subscription_id) {
    var entry, i;
    for (entry in pubSub.events) {
      if (pubSub.events.hasOwnProperty(entry)) {
        for (i = 0; i < pubSub.events[entry].subscriptions.length; i++) {
          //removes the subscription by its id
          if (subscription_id === pubSub.events[entry].subscriptions[i].subscription_id) {
            pubSub.events[entry].subscriptions.splice(i,1);
            return true;
          }
        }
      }
    }
    return false;
  },
  unpublish : function (event) {
    var entry;
    for (entry in pubSub.events) {
      if (pubSub.events.hasOwnProperty(entry)) {
        if (event === entry) {
          pubSub.events[entry].has_published = false;
          return true;
        }
      }
    }
    return false;
  }
};
