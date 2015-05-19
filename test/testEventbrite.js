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

/* HELPER METHODS */
var compareEvents = function(convertedEvent,eventbriteEvent)  {
  QUnit.assert.equal(convertedEvent.name , eventbriteEvent.name.text, "The returned event should have a name" );
  QUnit.assert.equal(convertedEvent.url , eventbriteEvent.url, "The returned event should have a name" );
  QUnit.assert.equal(convertedEvent.date , eventbriteEvent.start.local, "The returned event should have a name" );
}

var mockEventbriteAPI = function(){
  EventbriteFetcher.getEvents = function (userId) {
    return [fakeEvent1,fakeEvent2];
  };
}

/* TEST CASES */

QUnit.test( "Eventbrite get all with fake user", function( assert ) {
  var userId = "FAKE_USER_ID";
  var events = EventbriteFetcher.getAll(userId);
  assert.equal(events.length, 0, "There should be no events for a fake id" );
});

QUnit.test( "Eventbrite get all events", function( assert ) {
  var userId = "FAKE_USER_ID";
  mockEventbriteAPI();
  
  var events = EventbriteFetcher.getAll(userId);
  assert.equal(events.length, 2, "There should be 2 events returned" );
});

QUnit.test( "Test with real data should return something", function ( assert ) {
  var userId = 'F22NUJIXPMOLYH7LWD3R';
  var organizerId = '3147938392';
  var events = EventbriteFetcher.getAll(userId,organizerId);
  assert.ok(events.length >= 0, "There should be something returned" );
});

QUnit.test( "Test convert single event", function ( assert ) {
  assert.expect(3);
  var convertedEvent = EventbriteFetcher.convertEventbriteEvent(fakeEvent1);
  compareEvents(convertedEvent,fakeEvent1);
});

QUnit.test( "Test convert event array", function ( assert ) {
  assert.expect(7);
  var convertedEvents = EventbriteFetcher.convertData([fakeEvent1,fakeEvent2]);
  
  assert.equal(convertedEvents.length , 2, "The returned events array size does not match" );
  
  compareEvents(convertedEvents[0],fakeEvent1);
  compareEvents(convertedEvents[1],fakeEvent2);
});


QUnit.test( "Eventbrite fetcher returns events with url", function( assert ) {
  var userId = "FAKE_USER_ID";
  mockEventbriteAPI();
  
  var events = EventbriteFetcher.getAll(userId);
  assert.equal(events[0].url, fakeEvent1.url, "The returned event should have a url" );
});

QUnit.test( "Eventbrite fetcher returns events with name", function( assert ) {
  var userId = "FAKE_USER_ID";
  mockEventbriteAPI();
  
  var events = EventbriteFetcher.getAll(userId);
  assert.equal(events[0].name, fakeEvent1.name.text, "The returned event should have a name" );
});

QUnit.test( "Eventbrite fetcher returns events with date", function( assert ) {
  var userId = "FAKE_USER_ID";
  EventbriteFetcher.getEvents = function (userId) {
    return [fakeEvent1,fakeEvent2];
  };
  var events = EventbriteFetcher.getAll(userId);
  assert.equal(events[0].date, fakeEvent1.start.local, "The returned event should have a date" );
});