var currentCityName = $("#cityName");
var currentCityTemp = $("#cityTemp");
var currentCityWind = $("#cityWind");
var currentCityUV = $("#cityUV");

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

searchBtn.on("click", function() {
    console.log("hey")
    searchCity()
    searchCityForecast()
})

function searchCityForecast() {
    
    var searchTerm = userInput.val()
    console.log(searchTerm)
    var key = "bda2f2ea374379c994c54cc335a5e52b";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&APPID=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            console.log(response)
            console.log(response.list[7].main.temp)
            console.log(response.list[7].main.humidity)
            
            
            
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
            console.log(response.name)
            console.log(response.main.temp)
            console.log(response.wind.speed)
            console.log(response.main.humidity)
            
            currentCityName.html(response.name)
            currentCityTemp.html(response.main.temp)
            currentCityWind.html(response.wind.speed)
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
