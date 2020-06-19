// Declaring all my Variables to Simpilify Code

var cityInfo = $("#cityInfo")
var currentCityName = $("#cityName");
var currentCityTemp = $("#cityTemp");
var currentCityWind = $("#cityWind");
var currentCityUV = $("#cityUV");
var currentCityHumidity = $("#cityHumidity");
var currentCityUVDiv = $("#cityUvDiv");
var searchHistory = $("#searchHistory");
var clearBtn = $("#clearBtn");
var historyBtn = $(".col-11.historyBtn");
var forecastCards = $("#forecast-cards");

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
var pastSearches = []

var today = moment().format("MMM Do YYYY");

var oneDays = moment().add(1, 'days').format("MMM Do dddd");
var twoDays = moment().add(2, 'days').format("MMM Do dddd"); 
var threeDays = moment().add(3, 'days').format("MMM Do dddd");
var fourDays = moment().add(4, 'days').format("MMM Do dddd");
var fiveDays = moment().add(5, 'days').format("MMM Do dddd");

// This function is triggered when the Search Button is pressed.
function searchCityForecast() {
    // This grabs the Users input for which city they want to search.
    var searchTerm = userInput.val()
    var key = "bda2f2ea374379c994c54cc335a5e52b";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&units=metric&APPID=" + key;
    // Ajax Call grabs the information from the API and presents the data in an object
    $.ajax({
        url: queryURL,
        method: "GET"
        // Once the request is completed, the Then Function is triggered and the code below can execute with the required information
    }).then(function(response) {
            // I am setting all the 5 day forecast card information here. I need date (moment.js), Temp, Humidity, and the Icon to represent the temperature.
            // This request is a different API, it is the OpenweatherMaps Forecast API. slightly different to the weather and UV.
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
            forecastCards.removeClass("hide")
        }
    )
}

// This function requests information on a city and is all current Values. i had to chain the UV request inside this request because the UV request needs
// Latitude and Longitude as a perimiter that is returned in the First API request.
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
    
            // This is capturing the Longitude and Latitude of the cities so i can use it for the second Request.
            userLat = response.coord.lat
            userLon = response.coord.lon

            // This code sets all the target cities information in the Big section.
            currentCityName.html(response.name + " (" + today + ") " + '<img src="Assets/' + response.weather[0].icon + '@2x.png"></img>')
            currentCityTemp.html("Temperature: " + response.main.temp + " °C")
            currentCityHumidity.html("Humidity: " + response.main.humidity + " % ")
            currentCityWind.html("Wind Speed: " + response.wind.speed + " MPH")

            // Code below is a different API request that is executed once the first one returns because i need the Lat and Longitude to go into this request.
            var UVkey = "bda2f2ea374379c994c54cc335a5e52b";
            var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + UVkey + "&lat=" + userLat + "&lon=" + userLon;

            // This Request is for the UV Index, as it is a seperate API
            $.ajax({
                url: UVqueryURL,
                method: "GET"
            }).then(function(UVresponse) {
            console.log(UVresponse)
            currentCityUV.html(UVresponse.value);
            currentCityUVDiv.removeClass( "hide" );
                /// Sets the class for UV depending on Values
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

function renderSearches() {
    // Clears the HTML
    searchHistory.empty();
    // Render a new button for each search
    for (var i = 0; i < pastSearches.length; i++) {
    var search = pastSearches[i];
    // Defining the New button to be prepended
    var btn = document.createElement("button");
    btn.textContent = search;
    btn.setAttribute("class", "col-12 col-sm-12 col-md-12 col-lg-11 historyBtn");
    btn.setAttribute("data-link", search)
    searchHistory.prepend(btn);
  }
}
// This function grabs the Local Storage and puts in to a variable to be used
function init() {
    var storedHistory = JSON.parse(localStorage.getItem("history"));
    if (storedHistory !== null) {
        pastSearches = storedHistory
    }
    // Initial render updates the screen on load
    renderSearches()
}

// This function simpliy stores the whatever to Local Storage under the "history" Key
function storeHistory() {
    localStorage.setItem("history", JSON.stringify(pastSearches));
}

// This Function Clears the History SideBar
function clearLocalStorage() {
    localStorage.clear()
    pastSearches = [];
    renderSearches()
    searchHistory.empty()
}

/// This function for some reason needs to be made as a repeat of the one below
/// To access $(this) i cant just call the same function above. for the future i'll refactor
function startingHistory() {
    var pastUserSearch =  $("#searchHistory").find("button")

    pastUserSearch.on("click", function() {
        
        var searchTerm = $(this).attr("data-link")
        var key = "bda2f2ea374379c994c54cc335a5e52b";
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&units=metric&APPID=" + key;
        // Ajax Call grabs the information from the API and presents the data in an object
        $.ajax({
            url: queryURL,
            method: "GET"
            // Once the request is completed, the Then Function is triggered and the code below can execute with the required information
        }).then(function(response) {
                // I am setting all the 5 day forecast card information here. I need date (moment.js), Temp, Humidity, and the Icon to represent the temperature.
                // This request is a different API, it is the OpenweatherMaps Forecast API. slightly different to the weather and UV.
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
                forecastCards.removeClass("hide")
            }
        )
    
        var searchTerm = $(this).attr("data-link")
        console.log(searchTerm)
        var key = "bda2f2ea374379c994c54cc335a5e52b";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=metric&APPID=" + key;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
                console.log(response)
        
                // This is capturing the Longitude and Latitude of the cities so i can use it for the second Request.
                userLat = response.coord.lat
                userLon = response.coord.lon
    
                // This code sets all the target cities information in the Big section.
                currentCityName.html(response.name + " (" + today + ") " + '<img src="Assets/' + response.weather[0].icon + '@2x.png"></img>')
                currentCityTemp.html("Temperature: " + response.main.temp + " °C")
                currentCityHumidity.html("Humidity: " + response.main.humidity + " % ")
                currentCityWind.html("Wind Speed: " + response.wind.speed + " MPH")
    
                // Code below is a different API request that is executed once the first one returns because i need the Lat and Longitude to go into this request.
                var UVkey = "bda2f2ea374379c994c54cc335a5e52b";
                var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + UVkey + "&lat=" + userLat + "&lon=" + userLon;
    
                // This Request is for the UV Index, as it is a seperate API
                $.ajax({
                    url: UVqueryURL,
                    method: "GET"
                }).then(function(UVresponse) {
                console.log(UVresponse)
                currentCityUV.html(UVresponse.value);
                currentCityUVDiv.removeClass( "hide" );
                /// Sets the class for UV depending on Values
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
    })
}
/// This function is the same as above but for some reason it can only be executed after a 
/// search is completed, while the function above will only work while no search has been completed.
function historySearch() {
    pastUserSearch =  $("#searchHistory").find("button")

    pastUserSearch.on("click", function() {
        var searchTerm = $(this).attr("data-link")
        var key = "bda2f2ea374379c994c54cc335a5e52b";
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&units=metric&APPID=" + key;
        // Ajax Call grabs the information from the API and presents the data in an object
        $.ajax({
            url: queryURL,
            method: "GET"
            // Once the request is completed, the Then Function is triggered and the code below can execute with the required information
        }).then(function(response) {
                // I am setting all the 5 day forecast card information here. I need date (moment.js), Temp, Humidity, and the Icon to represent the temperature.
                // This request is a different API, it is the OpenweatherMaps Forecast API. slightly different to the weather and UV.
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
                forecastCards.removeClass("hide")
            }
        )
            /// Users the data-link Attribute as the search term in the API
        var searchTerm = $(this).attr("data-link")
        console.log(searchTerm)
        var key = "bda2f2ea374379c994c54cc335a5e52b";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=metric&APPID=" + key;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
                console.log(response)
        
                // This is capturing the Longitude and Latitude of the cities so i can use it for the second Request.
                userLat = response.coord.lat
                userLon = response.coord.lon
    
                // This code sets all the target cities information in the Big section.
                currentCityName.html(response.name + " (" + today + ") " + '<img src="Assets/' + response.weather[0].icon + '@2x.png"></img>')
                currentCityTemp.html("Temperature: " + response.main.temp + " °C")
                currentCityHumidity.html("Humidity: " + response.main.humidity + " % ")
                currentCityWind.html("Wind Speed: " + response.wind.speed + " MPH")
    
                // Code below is a different API request that is executed once the first one returns because i need the Lat and Longitude to go into this request.
                var UVkey = "bda2f2ea374379c994c54cc335a5e52b";
                var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + UVkey + "&lat=" + userLat + "&lon=" + userLon;
    
                // This Request is for the UV Index, as it is a seperate API
                $.ajax({
                    url: UVqueryURL,
                    method: "GET"
                }).then(function(UVresponse) {
                console.log(UVresponse)
                currentCityUV.html(UVresponse.value);
                currentCityUVDiv.removeClass( "hide" );
                    /// Sets the class for UV depending on Values
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
    })
}


// This is the starting code that is executed upon Loading.
init();
startingHistory();

// This is the Event Listener For the Search Button. When Clicked, the function is be executed.
searchBtn.on("click", function(event) {
    
    event.preventDefault()

    if (userInput.val() === "") {
        return;
    }

    searchCity()
    searchCityForecast()

    if (pastSearches.includes(userInput.val())) {
        return;
    }

    var pastSearch = userInput.val().trim()
    pastSearches.push(pastSearch)
    userInput.val("");

    storeHistory()
    renderSearches()
    historySearch()
})

/// This little code is the Event Listener for the clear Local Storage Function
clearBtn.on("click", clearLocalStorage)



