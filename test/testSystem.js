
QUnit.test( "event collector getall", function( assert ) {
  mockEventbriteAPI();
  mockMeetupApi();
  
  var socialData = {meetup : {group_id: 12345, AuthKey: 'jhjkhjkhkj'}, 
                    eventbrite: {organizationId: 'khjhkjhj',token : ''}}
  var events = eventCollector.getAll(socialData);

  assert.equal(events.length,4,"Expected to return 4 elements");
});