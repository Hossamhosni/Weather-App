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
			data:"lat="+ lat +"&lng="+ lon,
			success:function(data) {
				try {
					var data = JSON.parse(data);
					var conditionCode = Number(data.query.results.channel.item.condition.code);
					tempCelsius = data.query.results.channel.item.condition.temp;
					tempFahrenheit = Math.round(tempCelsius * 9/5 + 32);
					humidity = data.query.results.channel.atmosphere.humidity;
					description = data.query.results.channel.item.condition.text;
					var icon = getThermometerIcon(tempCelsius);
					$Weather.append("<i class='fa " +  icon + " fa-2x' aria-hidden='true'></i>")
					$Weather.append("<h2 id = 'temp'> " + tempCelsius + " &deg; <span id = 'cOrF'> C</span> </h2>");
					$Weather.append("<i class='fa fa-toggle-on fa-2x' id='toggle-on' aria-hidden='true'></i>")
					$Weather.append("<i class='fa fa-toggle-off fa-2x' id = 'toggle-off' aria-hidden='true'></i>");
					$Weather.append("<h2 id= 'description'>" + description + "</h2>");
					$Weather.append("<i class='owf " + getWeatherIcon(conditionCode) +" owf-5x'></i>");
					$Weather.append("<h2 id='time'></h2>" )
					document.getElementById("reload").style.display = "none";
					clicks();
					startTime();
				}
				catch (e) {
					$Weather.append("<h2 id= 'description'>" + "Sorry, Couldn't find your Weather!" + "</h2>");
					$Weather.append("<i class='fa fa-meh-o fa-4x' aria-hidden='true'></i>")
					document.getElementById("reload").style.display = "none";
				};
			} ,
			Error: function() {
				$Weather.append("<h2 id= 'description'>" + "Sorry, Couldn't find your data" + "</h2>");
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
		if (h > 11)
		{
			h -= 12;
			h = checkTime(h);
			document.getElementById('time').innerHTML =
	    h + ":" + m + ":" + s + " PM";
		}
		else {
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
	  cityState = data.city;
		document.getElementById("city").textContent = cityState + ", " + data.country;
		callback();
	});



	//Function to control styling when toggling between Celsius and Fahrenheit
	var clicks = function() {
		document.getElementById("toggle-on").addEventListener("click",function() {
			document.getElementById("toggle-on").style.display = "none";
			document.getElementById("toggle-off").style.display = "inline";
			document.getElementById("temp").innerHTML = " " + tempFahrenheit + " &deg; " + "<span id='cOrF'> F </span>";
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
				break;
			case	1	:
			 return "owf-901";
			 break;
			case	2	:
				return "owf-902";
				break;
			case	3	:
			  return "owf-212";
			  break;
			case	4	:
				return "owf-211";
				break;
			case	5	:
				return "owf-616";
				break;
			case	6	:
			case	7	:
				return "owf-612";
				break;
			case	8	:
			case	9	:
				return "owf-302";
				break;
			case	10:
				return "owf-511";
				break;
			case	11:
			case	12:
				return "owf-521";
				break;
			case	13:
				return "owf";
				break;
			case	14:
				return "owf";
				break;
			case	15:
				 return "owf";
				 break;
			case	16:
				return "owf";
				break;
			case	17:
				return "owf";
				break;
			case	18:
				return "owf";
				break;
			case	19:
				return "owf";
				break;
			case	20:
				return "owf";
				break;
			case	21:
				return "owf";
				break;
			case	22:
				return "owf";
				break;
			case	23:
				return "owf";
				break;
			case	24:
				return "owf";
				break;
			case	25:
				return "owf";
				break;
			case	26:
				return "owf-804";
				break;
			case	27:
				return "owf";
				break;
			case	28:
				return "owf";
				break;
			case	29:
				return "owf";
				break;
			case	30:
				return "owf";
				break;
			case	31:
				return "owf";
				break;
			case	32:
			case	36:
				return "owf";
				break;
			case	33:
				return "owf";
				break;
			case	34:
				return "owf";
				break;
			case	35:
				return "owf";
				break;
			case	37:
			case	38:
			case	39:
				return "owf";
			case	40:
			return "owf";
			break;
			case	41:
				return "owf";
				break;
			case	42:
				return "owf";
				break;
			case	43:
				return "owf";
				break;
			case	44:
			return "owf";
			break;
			case	45:
				return "owf";
				break;
			case	46:
				return "owf";
				break;
			case	47:
				return "owf";
				break;
			case	3200:
				return "owf";
				break;
		}
	};

}());
