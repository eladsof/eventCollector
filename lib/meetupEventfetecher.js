var meetupEventfetecher = {};

meetupEventfetecher.getAll = function (socialData) {
	return meetupEventfetecher.convertData(meetupEventfetecher.getEvents(socialData.group_id,socialData.key));
};


meetupEventfetecher.convertSingleEvent = function(meetupEvent){
	var newEvent = {
		url : meetupEvent.event_url,
		name: meetupEvent.name,
		date: meetupEvent.time
	};
	return newEvent;
};

meetupEventfetecher.convertData = function(events) {
	var convertedEvents = [];
	for(var i=0;i< events.length;i++){
		convertedEvents.push(meetupEventfetecher.convertSingleEvent(events[i]));
	}
	return convertedEvents;
};

meetupEventfetecher.getEvents = function(groupId,key) {
	var events = [];
	var urlStr = "https://api.meetup.com/2/events?key="+key+"&group_id="+groupId;
	
	$.ajax({
    type: 'GET',
	    url: urlStr,
	    dataType: 'jsonp',
	    success: function( data ) { events = data.results; },
	    data: {},
	    async: false
	});	  

	return events;
};