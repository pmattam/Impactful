// Populate Search Results

var url = window.location.href;
var urlSplit = url.split('=')


var search = urlSplit[1]  
console.log(search)
var URL = `https://api.data.charitynavigator.org/v2/Organizations?app_id=b57044da&app_key=f5ee4219833b3800a76f5ff48f56bcc1&pageSize=15&search=${search}&rated=true&state=GA&city=Atlanta&sort=RATING`;
var charityRawData = [];




var getCharityApiData = function() {
    fetch(URL, {method: 'GET'})
         .then(function(response) {
            return response.json();
        })
        .then(processGetData)
        .then(getCharityList)
        .then(charityDisplay);
};

var processGetData = function(apiData) {
    charityRawData = Object.values(apiData);
    return charityRawData;
};

var getCharityList = function() {
    var fullCharityList = [];
    var charityList = charityRawData.map(function(obj) {
        var charityInformation = {'Name': obj.charityName, 'Address': obj.mailingAddress, 'Rating': obj.currentRating};
        var charityInformationString = makeItPretty(charityInformation);
        fullCharityList.push(charityInformationString);
    });
    console.log(fullCharityList)
    return fullCharityList;
};

var makeItPretty = function(text) {
    var textJSON = JSON.stringify(text)
    textJSON = textJSON.replace(/"/g, '');
    textJSON = textJSON.replace(/,/g, ',  ');
    textJSON = textJSON.replace(/:/g, ':  ');
    textJSON = textJSON.replace(/}/g, '');
    textJSON = textJSON.replace(/{/g, '');
    return textJSON;
};

var charityDisplay = function(fullcharityList) {
    var searchResults = document.querySelector('.searchResults');
    fullcharityList.forEach(function(item) {
        var newDiv = document.createElement('div');
        newDiv.textContent = item;
        searchResults.appendChild(newDiv)
    })

};



getCharityApiData();

