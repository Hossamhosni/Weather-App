(function () {
	"use strict";
	var lat, lon, cityState, tempKelvin, tempCelsius, tempFahrenheit, humidity, description, icon;
	var $Weather = $("#weather");
	var callback = function () {
		$.ajax({
			url: "https://simple-weather.p.mashape.com/weatherdata?",
			headers: {
				"X-Mashape-Key": "ASlvvienCDmshcxWF6e0ztOgSDN1p1FpF81jsn1TK5LnWSHKt6"
			},
			data: "lat=" + lat + "&lng=" + lon,
			success: function (data) {
				try {
					data = JSON.parse(data);
					console.log(data);
					document.getElementById("city").textContent = data.query.results.channel.location.city + ", " + data.query.results.channel.location.country.slice(0,2).toUpperCase();
					var conditionCode = Number(data.query.results.channel.item.condition.code);
					tempCelsius = data.query.results.channel.item.condition.temp;
					tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);
					humidity = data.query.results.channel.atmosphere.humidity;
					description = data.query.results.channel.item.condition.text;
					var icon = getThermometerIcon(tempCelsius);
					$Weather.append("<i class='fa " +  icon + " fa-2x' aria-hidden='true'></i>");
					$Weather.append("<h2 id = 'temp'> " + tempCelsius + " &deg; <span id = 'cOrF'> C</span> </h2>");
					$Weather.append("<i class='fa fa-toggle-on fa-2x' id='toggle-on' aria-hidden='true'></i>");
					$Weather.append("<i class='fa fa-toggle-off fa-2x' id = 'toggle-off' aria-hidden='true'></i>");
					$Weather.append("<h2 id= 'description'>" + description + "</h2>");
					$Weather.append("<i class='owf " + getWeatherIcon(conditionCode) + " owf-5x'></i>");
					$Weather.append("<h2 id='time'></h2>");
					document.getElementById("reload").style.display = "none";
				 	if (tempCelsius < 25) {
						$("#temp").css("color","#34639e");
					} else {
						$("#temp").css("color","#d8223a");
					}
					clicks();
					startTime();
				} catch (e) {
					$Weather.append("<h2 id= 'description'>" + "Sorry, Couldn't find your Weather!" + "</h2>");
					$Weather.append("<i class='fa fa-meh-o fa-4x' aria-hidden='true'></i>");
					document.getElementById("reload").style.display = "none";
				}
			},
			Error: function () {
				$Weather.append("<h2 id= 'description'>" + "Sorry, Couldn't find your data" + "</h2>");
			}
		});
	};

	//displays Time
	function startTime() {
	  var today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds();
    	  m = checkTime(m);
    	  s = checkTime(s);
		if (h > 11) {
			h -= 12;
			h = checkTime(h);
			document.getElementById('time').innerHTML =
	    	h + ":" + m + ":" + s + " PM";
		} else {
			document.getElementById('time').innerHTML =
			h + ":" + m + ":" + s + " AM";
		}
    setTimeout(startTime, 1000);
	}
	function checkTime(i) {
	    if (i < 10) {i = "0" + i};
	    return i;
	}

	//Get Location Info

	$.getJSON("https://ipinfo.io",function(data) {
	  lat  = data.loc.split(",")[0];
		lon = data.loc.split(",")[1];
		console.log(data);
		callback();
	});


	//Function to control styling when toggling between Celsius and Fahrenheit
	var clicks = function() {
		document.getElementById("toggle-on").addEventListener("click",function() {
			document.getElementById("toggle-on").style.display = "none";
			document.getElementById("toggle-off").style.display = "inline";
			document.getElementById("temp").innerHTML = " " + tempFahrenheit + " &deg; " + "<span id='cOrF'> F </span>";
		});
		document.getElementById("toggle-off").addEventListener("click",function () {
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

	//This Function will get the Weather Icon based on the weather description
	var getWeatherIcon = function (conditionCode) {
		var dayOrNight;
		if ((new Date()).getHours() > 5 && (new Date()).getHours() < 18) {
			dayOrNight = "d";
		} else {
			dayOrNight = "n";
		}
		switch (conditionCode) {
			case	0	:
				return "owf-900";
			case	1	:
			 return "owf-901";
			case	2	:
				return "owf-902";
			case	3	:
			  return "owf-212";
			case	4	:
				return "owf-211";
			case	5	:
				return "owf-616";
			case	6	:
			case	7	:
				return "owf-612";
			case	8	:
			case	9	:
				return "owf-302";
			case	10:
				return "owf-511";
			case	11:
			case	12:
			case	40:
				return "owf-521";
			case	13:
				return "owf-600";
			case	14:
			case	42:
				return "owf-620";
			case	15:
			case	16:
			case	41:
			case	43:
				return "owf-602";
			case	17:
				return "owf-622";
			case	18:
				return "owf-611";
			case	19:
				return "owf-761";
			case	20:
				return "owf-741";
			case	21:
				return "owf-721";
			case	22:
				return "owf-711";
			case	23:
			case	24:
				return "owf-955";
			case	25:
				return "owf-903";
			case	26:
				return "owf-804";
			case	27:
			case	28:
				return "owf-802-" + dayOrNight;
			case	29:
			case	30:
			case	44:
				return "owf-801-" + dayOrNight;
			case	31:
			case	32:
			case	36:
			case	33:
			case	34:
				return "owf-800-" + dayOrNight;
			case	35:
				return "owf-616";
			case	37:
			case	38:
			case	39:
				return "owf-211";
			case	45:
			case	47:
				return "owf-202";
			case	46:
				return "owf-621";
			default :
				return;
		}
	};

}());
