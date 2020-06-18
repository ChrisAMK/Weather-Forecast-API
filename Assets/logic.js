var currentCityName = $("#cityName");
var currentCityTemp = $("#cityTemp");
var currentCityWind = $("#cityWind");
var currentCityUV = $("#cityUV");
var CityLat = $("#cityLat")
var CityLon = $("#cityLon")

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

var searchBtn = $("#searchBtn");
var userInput = $("#userInput");

var userLat = CityLat.val();
var userLon = CityLon.val();

var today = moment().format("MMM Do");

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
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&APPID=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            console.log(response)
            forecastDate1.html(oneDays)
            forecastTemp1.html(response.list[7].main.temp)
            forecastHumidity1.html(response.list[7].main.humidity)

            forecastDate2.html(twoDays)
            forecastTemp2.html(response.list[14].main.temp)
            forecastHumidity2.html(response.list[14].main.humidity)

            forecastDate3.html(threeDays)
            forecastTemp3.html(response.list[21].main.temp)
            forecastHumidity3.html(response.list[21].main.humidity)

            forecastDate4.html(fourDays)
            forecastTemp4.html(response.list[28].main.temp)
            forecastHumidity4.html(response.list[28].main.humidity)

            forecastDate5.html(fiveDays)
            forecastTemp5.html(response.list[35].main.temp)
            forecastHumidity5.html(response.list[35].main.humidity)
        }
    )
}

function searchCity() {
    
    var searchTerm = userInput.val()
    console.log(searchTerm)
    var key = "bda2f2ea374379c994c54cc335a5e52b";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&APPID=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            console.log(response)
    
            userLat = response.coord.lat
            userLon = response.coord.lon

            currentCityName.html(response.name + today)
            currentCityTemp.html(response.main.temp)
            currentCityWind.html(response.wind.speed)

            console.log(userLat)
            console.log(userLon)
            var UVkey = "bda2f2ea374379c994c54cc335a5e52b";
            var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + UVkey + "&lat=" + userLat + "&lon=" + userLon;
            //var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=-31.93&lon=115.83";

            $.ajax({
                url: UVqueryURL,
                method: "GET"
            }).then(function(UVresponse) {
            console.log(UVresponse)
            currentCityUV.html(UVresponse.value);

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
















function addArticles(newsArticles) {
    for (i = 0; i < newsArticles.length; i++) {
        var lineItem = $("<li>");
        $("#articles-appear-here").append(lineItem);
        const newsArticle = newsArticles[i].headline.main;
        const author = newsArticles[i].byline.original;
        const snippet = newsArticles[i].snippet;
        const url = newsArticles[i].web_url;
        console.log(newsArticle);
        var headline = $("<a>").text(newsArticle);
        lineItem.append(headline);
        headline.attr("href", url);
        headline.attr("target", "_blank");
        var authorName = $("<p>").text(author);
        lineItem.append(authorName);
        var snippetText = $("<p>").text(snippet);
        lineItem.append(snippetText);
    }
}
