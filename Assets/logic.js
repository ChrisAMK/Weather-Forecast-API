var cityInfo = $("#cityInfo")
var currentCityName = $("#cityName");
var currentCityTemp = $("#cityTemp");
var currentCityWind = $("#cityWind");
var currentCityUV = $("#cityUV");
var currentCityHumidity = $("#cityHumidity");
var currentCityUVDiv = $("#cityUvDiv");

var forecastDate1 = $("#forecastDate1");
var forecastDate2 = $("#forecastDate2");
var forecastDate3 = $("#forecastDate3");
var forecastDate4 = $("#forecastDate4");
var forecastDate5 = $("#forecastDate5");

var forecastTemp1 = $("#forecastTemp1");
var forecastTemp2 = $("#forecastTemp2");
var forecastTemp3 = $("#forecastTemp3");
var forecastTemp4 = $("#forecastTemp4");
var forecastTemp5 = $("#forecastTemp5");

var forecastHumidity1 = $("#forecastHumidity1");
var forecastHumidity2 = $("#forecastHumidity2");
var forecastHumidity3 = $("#forecastHumidity3");
var forecastHumidity4 = $("#forecastHumidity4");
var forecastHumidity5 = $("#forecastHumidity5");

var forecastPic1 = $("#forecastPic1");
var forecastPic2 = $("#forecastPic2");
var forecastPic3 = $("#forecastPic3");
var forecastPic4 = $("#forecastPic4");
var forecastPic5 = $("#forecastPic5");

var searchBtn = $("#searchBtn");
var userInput = $("#userInput");

var today = moment().format("MMM Do YYYY");

var oneDays = moment().add(1, 'days').format("MMM Do");
var twoDays = moment().add(2, 'days').format("MMM Do"); 
var threeDays = moment().add(3, 'days').format("MMM Do");
var fourDays = moment().add(4, 'days').format("MMM Do");
var fiveDays = moment().add(5, 'days').format("MMM Do");

searchBtn.on("click", function() {
    searchCity()
    searchCityForecast()
})

function searchCityForecast() {
    
    var searchTerm = userInput.val()
    var key = "bda2f2ea374379c994c54cc335a5e52b";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&units=metric&APPID=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            console.log(response)
            forecastDate1.html(oneDays)
            forecastTemp1.html("Temp: " + response.list[7].main.temp + " °C")
            forecastHumidity1.html("Humidity: " + response.list[7].main.humidity + " %")
            forecastPic1.attr ("src", "Assets/" + response.list[7].weather[0].icon + "@2x.png")

            forecastDate2.html(twoDays)
            forecastTemp2.html("Temp: " + response.list[14].main.temp + " °C")
            forecastHumidity2.html("Humidity: " + response.list[14].main.humidity + " %")
            forecastPic2.attr ("src", "Assets/" + response.list[14].weather[0].icon + "@2x.png")

            forecastDate3.html(threeDays)
            forecastTemp3.html("Temp: " + response.list[21].main.temp + " °C")
            forecastHumidity3.html("Humidity: " + response.list[21].main.humidity + " %")
            forecastPic3.attr ("src", "Assets/" + response.list[21].weather[0].icon + "@2x.png")

            forecastDate4.html(fourDays)
            forecastTemp4.html("Temp: " + response.list[28].main.temp + " °C")
            forecastHumidity4.html("Humidity: " + response.list[28].main.humidity + " %")
            forecastPic4.attr ("src", "Assets/" + response.list[28].weather[0].icon + "@2x.png")

            forecastDate5.html(fiveDays)
            forecastTemp5.html("Temp: " + response.list[35].main.temp + " °C")
            forecastHumidity5.html("Humidity: " + response.list[35].main.humidity + " %")
            forecastPic5.attr ("src", "Assets/" + response.list[35].weather[0].icon + "@2x.png")
        }
    )
}

function searchCity() {
    
    var searchTerm = userInput.val()
    console.log(searchTerm)
    var key = "bda2f2ea374379c994c54cc335a5e52b";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=metric&APPID=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            console.log(response)
    
            userLat = response.coord.lat
            userLon = response.coord.lon

            currentCityName.html(response.name + " (" + today + ") " + '<img src="Assets/' + response.weather[0].icon + '@2x.png"></img>')
            currentCityTemp.html("Temperature: " + response.main.temp + " °C")
            currentCityHumidity.html("Humidity: " + response.main.humidity + " % ")
            currentCityWind.html("Wind Speed: " + response.wind.speed + " MPH")

            console.log(response.weather[0].icon)

            Celcius = (response.main.temp - 273.15) * 1.80 + 32
            
            var UVkey = "bda2f2ea374379c994c54cc335a5e52b";
            var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + UVkey + "&lat=" + userLat + "&lon=" + userLon;

            $.ajax({
                url: UVqueryURL,
                method: "GET"
            }).then(function(UVresponse) {
            console.log(UVresponse)
            //currentCityUVDiv.html("<p>UV index: <span id='cityUV'>" + UVresponse.value + "</span></p>")
            currentCityUV.html(UVresponse.value);
            currentCityUVDiv.removeClass( "hide" );

            if (UVresponse.value < 3.3) {
                currentCityUV.attr("class", "UV-green")
                console.log("green")
            } else if (UVresponse.value > 6.6) {
                currentCityUV.attr("class", "UV-red")
                console.log("red")
            } else {
                currentCityUV.attr("class", "UV-yellow")
                console.log("yellow")
            }

                }
            )
        }
    )
}

function searchCityUV() {
    
    var userLat = CityLat.val()
    var userLon = CityLon.val()
    console.log(userLat)
    console.log(userLon)

    var UVkey = "bda2f2ea374379c994c54cc335a5e52b";
    console.log(userLat)
    console.log(userLon)
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + UVkey + "&lat=" + userLat + "&lon=" + userLon;
    //var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=-31.93&lon=115.83";
    console.log(UVqueryURL)


    $.ajax({
        url: UVqueryURL,
        method: "GET"
    }).then(function(UVresponse) {
            console.log(UVresponse)
            
        }
    )
}