var fakeEvent1 = {            
            "name": {
                "text": "Fake event 1", 
                "html": "Advanced Product Owner Workshop - 8 June 2015"
            },             
            "url": "http://www.eventbrite.com/e/advanced-product-owner-workshop-8-june-2015-tickets-16586687228?aff=ebapi", 
            "start": {
                "timezone": "Asia/Jerusalem", 
                "local": "2015-06-08T09:00:00", 
                "utc": "2015-06-08T06:00:00Z"            
            },
        };
var fakeEvent2 = {            
            "name": {
                "text": "Fake event 2", 
                "html": "Advanced Product Owner Workshop - 8 June 2015"
            },             
            "url": "http://www.eventbrite.com/e/advanced-product-owner-workshop-8-june-2015-tickets-16586687228?aff=ebapi", 
            "start": {
                "timezone": "Asia/Jerusalem", 
                "local": "2015-07-09T09:00:00", 
                "utc": "2015-06-08T06:00:00Z"            
            },
        };


QUnit.test( "Eventbrite get all with fake user", function( assert ) {
  var userId = "FAKE_USER_ID";
  var events = EventbriteFetcher.getAll(userId);
  assert.equal(events.length, 0, "There should be no events for a fake id" );
});

QUnit.test( "Eventbrite get all events", function( assert ) {
  var userId = "FAKE_USER_ID";
  EventbriteFetcher.getEvents = function (userId) {
    return [fakeEvent1,fakeEvent2];
  };
  
  var events = EventbriteFetcher.getAll(userId);
  assert.equal(events.length, 2, "There should be 2 events returned" );
});

QUnit.test( "Test with real data should return something", function ( assert ) {
  var userId = 'F22NUJIXPMOLYH7LWD3R';
  var organizerId = '3147938392';
  var events = EventbriteFetcher.getAll(userId,organizerId);
  assert.ok(events.length >= 0, "There should be something returned" );
});
