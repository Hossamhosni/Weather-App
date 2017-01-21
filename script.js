$.getJSON('http://ip-api.com/json',function(data) {
    var lat = (JSON.stringify(data.lat));
    var lon = (JSON.stringify(data.lon));
		console.log(lat);
    var cityState = data.city;
    $.ajax({
      url:"https://simple-weather.p.mashape.com/weatherdata?",
			headers: {
				"X-Mashape-Key": "ASlvvienCDmshcxWF6e0ztOgSDN1p1FpF81jsn1TK5LnWSHKt6"
			},
      data:"lat="+ lat +"&lng="+lon,
      success:function(data) {
				var data = JSON.parse(data);
        console.log(data);
      }
    })
});
