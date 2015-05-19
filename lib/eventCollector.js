var eventCollector = {};

eventCollector.getAll = function (socialData)  {
	var events = [];
	var eventbrite = EventbriteFetcher.getAll(socialData.eventbrite);
	var meetup = meetupEventfetecher.getAll(socialData.meetup);
	events.push.apply(events, eventbrite);
	events.push.apply(events, meetup);
	return events;
};