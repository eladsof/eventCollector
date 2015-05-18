
QUnit.test( "event collector getall", function( assert ) {
  var userId = "FAKE_USER_ID";
  var events = eventCollector.getAll('FAKE','FAKE');
  assert.equal(events.length, 0, "There should be no events for a fake id" );
});