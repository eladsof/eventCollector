var fakeEventbriteEvent1 = {            
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
var fakeEventbriteEvent2 = {            
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
        
var eventbriteSocialData = {organizationId: '3147938392',token : 'F22NUJIXPMOLYH7LWD3R'};

/* HELPER METHODS */
/*================*/
var compareEvents = function(convertedEvent,eventbriteEvent)  {
  QUnit.assert.equal(convertedEvent.name , eventbriteEvent.name.text, "The returned event should have a name" );
  QUnit.assert.equal(convertedEvent.url , eventbriteEvent.url, "The returned event should have a name" );
  QUnit.assert.equal(convertedEvent.date , eventbriteEvent.start.local, "The returned event should have a name" );
}

var mockEventbriteAPI = function(){
  EventbriteFetcher.getEvents = function (userId) {
    return [fakeEventbriteEvent1,fakeEventbriteEvent2];
  };
}

/* TEST CASES */
/*=============*/
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
  var events = EventbriteFetcher.getAll(eventbriteSocialData);
  assert.ok(events.length >= 0, "There should be something returned" );
});

QUnit.test( "Test convert single event", function ( assert ) {
  assert.expect(3);
  var convertedEvent = EventbriteFetcher.convertSingleEvent(fakeEventbriteEvent1);
  compareEvents(convertedEvent,fakeEventbriteEvent1);
});

QUnit.test( "Test convert event array", function ( assert ) {
  assert.expect(7);
  var convertedEvents = EventbriteFetcher.convertData([fakeEventbriteEvent1,fakeEventbriteEvent2]);
  
  assert.equal(convertedEvents.length , 2, "The returned events array size does not match" );
  
  compareEvents(convertedEvents[0],fakeEventbriteEvent1);
  compareEvents(convertedEvents[1],fakeEventbriteEvent2);
});


QUnit.test( "Eventbrite fetcher returns events with url", function( assert ) {
  var userId = "FAKE_USER_ID";
  mockEventbriteAPI();
  
  var events = EventbriteFetcher.getAll(userId);
  assert.equal(events[0].url, fakeEventbriteEvent1.url, "The returned event should have a url" );
});

QUnit.test( "Eventbrite fetcher returns events with name", function( assert ) {
  var userId = "FAKE_USER_ID";
  mockEventbriteAPI();
  
  var events = EventbriteFetcher.getAll(userId);
  assert.equal(events[0].name, fakeEventbriteEvent1.name.text, "The returned event should have a name" );
});

QUnit.test( "Eventbrite fetcher returns events with date", function( assert ) {
  var userId = "FAKE_USER_ID";
  EventbriteFetcher.getEvents = function (userId) {
    return [fakeEventbriteEvent1,fakeEventbriteEvent2];
  };
  var events = EventbriteFetcher.getAll(userId);
  assert.equal(events[0].date, fakeEventbriteEvent1.start.local, "The returned event should have a date" );
});