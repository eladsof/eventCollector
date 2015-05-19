/* Event object structure will include at minimum */
/*================================================*/
/*  event {
		url : 'The url of the event';
		name: 'The name of the event';
		date: 'The date of the event';
	}
}
/*================================================*/

var EventbriteFetcher = {};

EventbriteFetcher.getAll = function(userToken,organizerId) {
	return EventbriteFetcher.convertData(EventbriteFetcher.getEvents(userToken,organizerId));
};

EventbriteFetcher.convertEventbriteEvent = function(eventbriteEvent){
	var newEvent = {
		url : eventbriteEvent.url,
		name: eventbriteEvent.name.text,
		date: eventbriteEvent.start.local
	};
	return newEvent;
};

EventbriteFetcher.convertData = function(events) {
	var convertedEvents = [];
	for(var i=0;i< events.length;i++){
		convertedEvents.push(EventbriteFetcher.convertEventbriteEvent(events[i]));
	}
	return convertedEvents;
};

EventbriteFetcher.getEvents = function(userToken,organizerId) {
	var events = [];
	var urlStr = "https://www.eventbriteapi.com/v3/events/search/?token="+userToken+"&organizer.id="+organizerId;
	
	$.ajax({
    type: 'GET',
	    url: urlStr,
	    dataType: 'json',
	    success: function( data ) { events = data.events; },
	    data: {},
	    async: false
	});	  

	return events;
};