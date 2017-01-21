var callback1 = function() {
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
	});
}
var callback2 = function() {
	$.ajax({
      url:"http://api.openweathermap.org/data/2.5/weather?",
      data:"q="+ cityState +"&APPID=b1abbee211f111b2144cee692c7c8ac1",
      dataType:"jsonp",
      success:function(data) {
        console.log(data);
      }
    });
}
var apisArray = [callback1,callback2];
var lat,lon,cityState;
$.getJSON('http://ip-api.com/json',function(data) {
    lat = (data.lat);
    lon = (data.lon);
    cityState = data.city;
		//console.log(data);
		document.getElementById("city").textContent = cityState + ", " + data.countryCode;
    apisArray[1]();
		apisArray[0]();
});
