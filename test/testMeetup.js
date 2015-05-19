var fakeResponse =
{"results":[],"meta":{"next":"","method":"Events","total_count":0,"link":"https:\/\/api.meetup.com\/2\/events","count":0,"description":"Access Meetup events using a group, member, or event id. Events in private groups are available only to authenticated members of those groups. To search events by topic or location, see [Open Events](\/meetup_api\/docs\/2\/open_events).","lon":"","title":"Meetup Events v2","url":"https:\/\/api.meetup.com\/2\/events?offset=0&format=json&limited_events=False&group_id=12346&page=200&fields=&key=68481a22f757d1fb33161801251d&order=time&desc=false&status=upcoming","id":"","updated":1432035133783,"lat":""}};
 
var fakeMeetupEvent1 = {
"utc_offset": 10800000,
"venue": {
"country": "il",
"city": "raanana",
"address_1": "15 Hatidhar Street ",
"name": "SAP offices",
"lon": 0,
"id": 18153992,
"lat": 0,
"repinned": false
},
"headcount": 0,
"visibility": "public",
"waitlist_count": 0,
"created": 1412154318000,
"maybe_rsvp_count": 0,
"description": "<p>Less is a framework for scaling Scrum.</p> <p>Scaling Scrum starts with understanding standard one-team Scrum. From that point, your organization must be able to understand and adopt LeSS, which requires examining the purpose of one-team Scrum elements and figuring out how to reach the same purpose while staying within the constraints of the standard Scrum rules.</p> <p>Agile development with Scrum requires a deep organizational change to become agile. Therefore, neither Scrum nor LeSS should be considered as merely a practice. Rather, they form an organizational design framework.</p> <p>In this session, Elad will present an overview of the LeSS framework, following the presentation there will be a Q&amp;A session.</p> <p>(* The meetup on TRIZ will be rescheduled to a future event)</p>",
"event_url": "http://www.meetup.com/Agile-Practitioners-Israel/events/210680232/",
"yes_rsvp_count": 73,
"announced": true,
"name": "Fake event title 1",
"id": "210680232",
"time": 1432045800000,
"updated": 1431271133000,
"group": {
"join_mode": "open",
"created": 1379244833000,
"name": "Agile Practitioners Israel",
"group_lon": 34.77000045776367,
"id": 10269742,
"urlname": "Agile-Practitioners-Israel",
"group_lat": 32.06999969482422,
"who": "Agile Practitioners"
},
"status": "upcoming"
};

var fakeMeetupEvent2 = {
"utc_offset": 10800000,
"venue": {
"country": "il",
"city": "raanana",
"address_1": "15 Hatidhar Street ",
"name": "SAP offices",
"lon": 0,
"id": 18153992,
"lat": 0,
"repinned": false
},
"headcount": 0,
"visibility": "public",
"waitlist_count": 0,
"created": 1412154318000,
"maybe_rsvp_count": 0,
"description": "<p>Less is a framework for scaling Scrum.</p> <p>Scaling Scrum starts with understanding standard one-team Scrum. From that point, your organization must be able to understand and adopt LeSS, which requires examining the purpose of one-team Scrum elements and figuring out how to reach the same purpose while staying within the constraints of the standard Scrum rules.</p> <p>Agile development with Scrum requires a deep organizational change to become agile. Therefore, neither Scrum nor LeSS should be considered as merely a practice. Rather, they form an organizational design framework.</p> <p>In this session, Elad will present an overview of the LeSS framework, following the presentation there will be a Q&amp;A session.</p> <p>(* The meetup on TRIZ will be rescheduled to a future event)</p>",
"event_url": "http://www.meetup.com/Agile-Practitioners-Israel/events/210680232/",
"yes_rsvp_count": 73,
"announced": true,
"name": "Fake event title 2",
"id": "210680232",
"time": 1432045800000,
"updated": 1431271133000,
"group": {
"join_mode": "open",
"created": 1379244833000,
"name": "Agile Practitioners Israel",
"group_lon": 34.77000045776367,
"id": 10269742,
"urlname": "Agile-Practitioners-Israel",
"group_lat": 32.06999969482422,
"who": "Agile Practitioners"
},
"status": "upcoming"
};


var meetupSocialData = {group_id: 10269742, AuthKey: '68481a22f757d1fb33161801251d'};
/* Helper methods */
/*================*/
var mockMeetupApi = function () {
  meetupEventfetecher.getEvents = function (groupId) {
    return [fakeMeetupEvent1,fakeMeetupEvent2];
  }
}

QUnit.test( "Meetup get event call working", function( assert ) {
  var events = meetupEventfetecher.getAll(meetupSocialData);
  assert.notEqual(events.null,"Events should be returned from meetup api");
});

QUnit.test( "Meetup get event call returning fake data", function( assert ) {
  mockMeetupApi();
  var events = meetupEventfetecher.getAll(meetupSocialData);
  console.log(events);
  assert.equal(events.length,2,"should return 2 events");
});

QUnit.test( "check event properties", function( assert ) {
  assert.expect(3);
  
  mockMeetupApi();
  var events = meetupEventfetecher.getAll(meetupSocialData);
  console.log(events);
  
  assert.equal(events[0].name,fakeMeetupEvent1.name,"Name should be converted properly");
  assert.equal(events[0].url,fakeMeetupEvent1.event_url,"Name should be converted properly");
  assert.equal(events[0].date,fakeMeetupEvent1.time,"Name should be converted properly");
});