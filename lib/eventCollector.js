var eventCollector = {};

eventCollector.getAll = function (userToken,organizerID)  {
	var events = [];
	events.concat( EventbriteFetcher.getAll(userToken,organizerID).events );
	return events;
};