var SimpleSet = require('set');

/**
 * A set that is observable via events
 * When an item is added or removed from the set
 * the collection will fire 'add' and 'remove' events
 */
var SimpleCollection = function(vals){
  this.vals = [];
  if (vals) {
    for (var i = 0; i < vals.length; ++i) {
      this.add(vals[i]);
    }
  }
};

_.extend(SimpleCollection.prototype, SimpleSet.prototype, Backbone.Events);

/**
 * Add an item to the set and emit an event. Also binds
 * to all events on the object and will bubble them up to
 * the collection
 * @param {Object} val Object with emitter events
 */
SimpleCollection.prototype.add = function(obj) {
  SimpleSet.prototype.add.apply(this, arguments);
  obj.on('all', this._onChildEvent, this);
  this.trigger('add', obj);
  return this;
};

/**
 * Removes an object from the set, cleans up events
 * @param  {Object} val Object with emitter events
 * @return {SimpleCollection}
 */
SimpleCollection.prototype.remove = function(obj) {
  SimpleSet.prototype.remove.apply(this, arguments);
  obj.off('all', this._onChildEvent, this);
  this.trigger('remove', obj);
  return this;
};

/**
 * Whenever an item in the collection publishes an event
 * this will be bubbled up and fired on the collection itself
 * @param {Subscriber} obj
 */
SimpleCollection.prototype._onChildEvent = function() {
  this.trigger.apply(this, arguments);
};

/**
 * Get an item from the set at an index
 * @param  {Number} index
 * @return {Object}
 */
SimpleCollection.prototype.at = function(index) {
  return this.vals[index];
};

/**
 * Map function
 * @param  {Function} callback 
 * @param  {Object}   context  
 * @return {Array}
 */
SimpleCollection.prototype.map = function(callback, context) {
  return this.vals.map(callback, context);
};

module.exports = SimpleCollection;