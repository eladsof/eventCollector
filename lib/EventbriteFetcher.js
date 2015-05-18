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
	return EventbriteFetcher.getEvents(userToken,organizerId);
};

EventbriteFetcher.convertEventbriteEvent = function(eventbriteEvent){
	return eventbriteEvent;
};

EventbriteFetcher.convertData = function(events) {
	for(var i=0;i< events.length;i++){
		EventbriteFetcher.convertEventbriteEvent(events[i]);
	}
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