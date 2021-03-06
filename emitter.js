
// *
//  * Event Emitter
//  * Event handling library that support wildcard events.
//  *
//  * @constructor
//  * @example
//     var emitter = new EventEmitter();
//     var log = function(event, data){
//       console.log(event, data)
//     };
//     emitter.on('data.user', log);
//     emitter.on('data.project', log);
//     emitter.on('data.*', log);

//     emitter.emit('data.user', {uid:1});
//     // print: data.user Object {uid: 1}
//     // print: data.user Object {uid: 1}

//     emitter.emit('data.branch', {bid:1});
//     // print: data.branch Object {bid: 1}
 

function EventEmitter(){

}

/**
 * Subscribe to an event
 *
 * @param {String} event
 * @param {Function} callback
 */

EventEmitter.prototype.on = function(event, callback){
	window['__'+event]= callback;
};

/**
 * Emit an event
 *
 * Callbacks that meet the event name
 * or if the event subscribe is a wildcard
 * subscription will get call with the
 * parameters pass in to the `emit` function
 *
 * The first parameter pass into the callback
 * will be the event that we are emitting,
 * following parameters will be the data
 *
 * @param {String} event
 * @param {Object|Number|String|Boolean} data1, data2, dataN
 */

EventEmitter.prototype.emit = function(event,data){
	for(var i in window){
		if(i.match(/__/i) != null){
			if( i.substr(0,(i+'').length-1) == ('__'+event).substr(0,(i+'').length-1) ) if(typeof window[i] == 'function') window[i].apply(this,arguments);
		}
	}
	//if(typeof window['__'+event] == 'function') window['__'+event].apply(this,arguments);
};

