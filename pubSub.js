var pubSub = window.pubSub || {
  events : {},
  subscribe : function (event, callback) {
    const subscription_id = Symbol.for(event);
    pubSub.events[event] = pubSub.events[event] || {subscriptions:[],has_published:false};
    if (pubSub.events[event].has_published) {
      callback();
    } else {
      pubSub.events[event].subscriptions.push({callback : callback, subscription_id : subscription_id});
    }
    return subscription_id;
  },
  publish : function (event) {
    pubSub.events[event] = pubSub.events[event] || {subscriptions:[],has_published:false};
    if (!pubSub.events[event].has_published) {
      pubSub.events[event].has_published = true;
      // if there are pre-existing subscriptions, invoke their callbacks
      if (pubSub.events[event].subscriptions.length > 0) {
        for (let subscription in pubSub.events[event].subscriptions) {
          pubSub.events[event].subscriptions[subscription].callback();
        } 
        // clears the original array after subscriptions have been triggered
        pubSub.events[event].subscriptions.length = 0;
      }    
    }
  },
  unsubscribe : function (subscription_id) {
    for (let entry in pubSub.events) {
      if (pubSub.events.hasOwnProperty(entry)) {
        for (let i = 0; i < pubSub.events[entry].subscriptions.length; i++) {
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
    for (let entry in pubSub.events) {
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
