(function(){
	"use strict";
	var apisArray = [];
	var lat, lon, cityState, tempKelvin, tempCelsius, tempFahrenheit, humidity, description, icon;
	var callback = function() {
		$.ajax({
			url:"https://simple-weather.p.mashape.com/weatherdata?",
			headers: {
				"X-Mashape-Key": "ASlvvienCDmshcxWF6e0ztOgSDN1p1FpF81jsn1TK5LnWSHKt6"
			},
			data:"lat="+ lat +"&lng="+lon,
			success:function(data) {
				var data = JSON.parse(data);
				console.log(data);
				tempCelsius = data.query.results.channel.item.condition.temp;
				tempFahrenheit = Math.round(tempCelsius * 9/5 + 32);
				humidity = data.query.results.channel.atmosphere.humidity;
				description = data.query.results.channel.item.condition.text;
				var icon = getIcon(tempCelsius);
				$("#weather").append("<i class='fa " +  icon + " fa-2x' aria-hidden='true'></i>")
				$("#weather").append("<h2 id = 'temp'> " + tempCelsius + " &deg; </h2>");
				$("#weather").append("<h2 id='cOrF'>C </h2>");
				$("#weather").append("<i class='fa fa-toggle-on fa-2x' id='toggle-on' aria-hidden='true'></i>")
				$("#weather").append("<i class='fa fa-toggle-off fa-2x' id = 'toggle-off' aria-hidden='true'></i>");
				$("#weather").append("<h2 id= 'description'>" + description + "</h2>");
				document.getElementById("reload").style.display = "none";
				clicks();
			}
		});
	}
	$.getJSON("https://ipinfo.io",function(data) {
	  lat  = data.loc.split(",")[0];
		lon = data.loc.split(",")[1];
	  cityState = data.city;
		document.getElementById("city").textContent = cityState + ", " + data.country;
		callback();
	});
	var clicks = function() {
		document.getElementById("toggle-on").addEventListener("click",function() {
			document.getElementById("toggle-on").style.display = "none";
			document.getElementById("toggle-off").style.display = "inline";
			document.getElementById("cOrF").textContent = " F  ";
			document.getElementById("temp").innerHTML = " " + tempFahrenheit + "&deg";
		});
		document.getElementById("toggle-off").addEventListener("click",function() {
			document.getElementById("toggle-off").style.display = "none";
			document.getElementById("toggle-on").style.display = "inline";
			document.getElementById("cOrF").textContent = " C  ";
			document.getElementById("temp").innerHTML = " " + tempCelsius + "&deg";
		});
	}
	var getIcon = function (temp) {
		if (temp < 5) {
			return "fa-thermometer-empty"
		} else if (temp < 20) {
			return "fa-thermometer-quarter";
		} else if (temp < 35) {
			return "fa-thermometer-half";
		} else if (temp < 50) {
			return "fa-thermometer-three-quarters"
		} else {
			return "fa-thermometer-full";
		}
	}
}());
