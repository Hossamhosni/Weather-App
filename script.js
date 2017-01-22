(function(){
	"use strict";
	var lat, lon, cityState, tempKelvin, tempCelsius, tempFahrenheit, humidity, description, icon;
	var $Weather = $("#weather");
	var callback = function() {
		$.ajax({
			url:"https://simple-weather.p.mashape.com/weatherdata?",
			headers: {
				"X-Mashape-Key": "ASlvvienCDmshcxWF6e0ztOgSDN1p1FpF81jsn1TK5LnWSHKt6"
			},
			data:"lat="+ lat +"&lng="+lon,
			success:function(data) {
				var data = JSON.parse(data);
				tempCelsius = data.query.results.channel.item.condition.temp;
				tempFahrenheit = Math.round(tempCelsius * 9/5 + 32);
				humidity = data.query.results.channel.atmosphere.humidity;
				description = data.query.results.channel.item.condition.text;
				var icon = getThermometerIcon(tempCelsius);
				var hours = new Date(new Date().getTime()).toLocaleTimeString().split(" ")[0].split(":")[0];
				var minutes = new Date(new Date().getTime()).toLocaleTimeString().split(" ")[0].split(":")[1];
				var seconds = new Date(new Date().getTime()).toLocaleTimeString().split(" ")[0].split(":")[2];
				console.log(hours,minutes,seconds);
				var data = new Date();
				console.log(data);
				$Weather.append("<i class='fa " +  icon + " fa-2x' aria-hidden='true'></i>")
				$Weather.append("<h2 id = 'temp'> " + tempCelsius + " &deg; <span id = 'cOrF'> C</span> </h2>");
				$Weather.append("<i class='fa fa-toggle-on fa-2x' id='toggle-on' aria-hidden='true'></i>")
				$Weather.append("<i class='fa fa-toggle-off fa-2x' id = 'toggle-off' aria-hidden='true'></i>");
				$Weather.append("<h2 id= 'description'>" + description + "</h2>");
				$Weather.append("<i class='owf " + getWeatherIcon(description) +" owf-5x'></i>");
				$Weather.append("<h2 id='time'></h2>" )
				document.getElementById("reload").style.display = "none";
				clicks();
				startTime();
			}
		});
	}

	//displays Time
	function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
	}
	function checkTime(i) {
	    if (i < 10) {i = "0" + i};
	    return i;
	}

	//Get Location Info

	$.getJSON("https://ipinfo.io",function(data) {
	  lat  = data.loc.split(",")[0];
		lon = data.loc.split(",")[1];
	  cityState = data.city;
		document.getElementById("city").textContent = cityState + ", " + data.country;
		callback();
	});



	//Function to control styling when toggling between Celsius and Fahrenheit
	var clicks = function() {
		document.getElementById("toggle-on").addEventListener("click",function() {
			document.getElementById("toggle-on").style.display = "none";
			document.getElementById("toggle-off").style.display = "inline";
			document.getElementById("temp").innerHTML = " " + tempFahrenheit + "&deg; " + "<span id='cOrF'> F</span>";
		});
		document.getElementById("toggle-off").addEventListener("click",function() {
			document.getElementById("toggle-off").style.display = "none";
			document.getElementById("toggle-on").style.display = "inline";
			document.getElementById("temp").innerHTML = " " + tempCelsius + " &deg; " + "<span id='cOrF'> C </span>";
		});
	}


	//This Function will choose the right icon from font Awesome Thermometers to display
	var getThermometerIcon = function (temp) {
		if (temp < 10) {
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
	};
	var getWeatherIcon = function (description) {
		var dayOrNight;
		if ((new Date()).getHours() > 5 && (new Date()).getHours() < 18) {
			dayOrNight = "d";
		} else {
			dayOrNight = "n";
		}
		if (dayOrNight == "d") {
			document.querySelector("body").style.backgroundColor = "#4174eb";
		} else {
			document.querySelector("body").style.backgroundColor = "#060606";
		}
		switch (description) {
			case "Mostly Cloudy" :
			case "Cloudy":
				return "owf-804-n";
				break;
			case "Sunny":
			case "Clear":
			case "Fair" :
				return "owf-800-" + dayOrNight;
				break;
			case "Showers":
					return "owf-522";
					break;
			case "Rain":
				return "owf-520";
				break;
			case "Partly Cloudy" :
				return "owf-801-" + dayOrNight;
				break;
			case "Blustery" :
				return "owf-957";
		}
	};

}());
