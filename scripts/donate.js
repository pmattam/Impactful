// Charity Organization List to Choose From When Donating
var $charityName = $('.charity-name');
var URL = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=b57044da&app_key=f5ee4219833b3800a76f5ff48f56bcc1&pageSize=50&state=GA';
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
    console.log(charityRawData);
};

var getCharityList = function() {
    var charityList = charityRawData.map(function(obj) {
        return obj.charityName;
    });
    return charityList;
}

var charityDisplay = function(charityList) {
    $charityName.click(function() {
        charityList.forEach(function(name) {
            var $option = $('<option>', {'text': name});
            $charityName.append($option);
        });
    }); 
};

getCharityApiData();

