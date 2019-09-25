# deepCopy.js
This is a recursive function to create and return a deep copy of whatever object is passed to the function, without utilizing JSON.stringify/parse, jQuery, or other libraries.

#pubSub.js
This is a publish-subscribe utility for use in client-side JavaScript and uses functionality found in ECMA6 (i.e., not necessarily IE safe, nor backwards compatible).
##subscribe
To use this method, invoke by providing the name of the event to which you want to subscribe (string) and the callback function you wish invoked when the event publishes. This will return a subscription ID in the form of a symbol reference in the global Symbol registry.
##unsubscribe
To use this method, invoke by providing the Symbol reference returned by the original subscribe invocation. This will re-assign the event queue to a new array that no longer contains the subscription entry being removed. For this reason, it's best to access the event queue by reference instead of creating deep copies of that queue.
##publish
This method 'publishes' the event so that subscribers will have their callbacks invoked. To use this method, pass the name of the event you wish to publish (string). This method will iterate through the entry array for any subscriptions, triggering their callbacks as necessary, then clearing the queue.
##unpublish
To use this method, invoke by providing the event name (string) you wish to remove. This will set the event queue's entry's has_published property to false.
