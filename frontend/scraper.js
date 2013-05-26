function scrape(url, method, callback) {
  //console.log('scrape called');
  $.ajax({
    url: url,
    type: method
  }).done(callback);
}
function poster(url, method, data, callback) {
  //console.log('poster');
  //console.log(data);
  //may have to querystringify data
  var req = $.ajax({
    url:url,
    type: method,
    data: data
  });
  req.done(callback(null, 'success'));
  req.fail(callback('failed'));
}
