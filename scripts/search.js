// Populate Search Results
var url = window.location.href;
var urlSplit = url.split('=')
var search = urlSplit[1]  
var URL = `https://api.data.charitynavigator.org/v2/Organizations?app_id=b57044da&app_key=f5ee4219833b3800a76f5ff48f56bcc1&pageSize=200&search=${search}&rated=true&state=GA&city=Atlanta&minRating=2&sort=RATING:DESC`;
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
    var charityList = charityRawData.map(function(obj) {
        var charityInformation = {'Name': obj.charityName, 'Address': obj.mailingAddress, 'Rating': obj.currentRating, 'Website': obj.websiteURL};
        return charityInformation;
    });
    return charityList;
};

var charityDisplay = function(charityList) {
    addCharityListToTable(charityList);
};

var addCharityListToTable = function(charityList) {
    var searchDiv = document.querySelector('.search-results');
    var table = document.createElement('table');
    var headerRow = table.insertRow(-1);
    var headerNameCell = document.createElement('TH');
    headerNameCell.textContent = 'ORGANIZATION NAME';
    headerRow.appendChild(headerNameCell);

    var headerAddressCell = document.createElement('TH');
    headerAddressCell.textContent = 'ADDRESS';
    headerRow.appendChild(headerAddressCell);

    var headerRatingCell = document.createElement('TH');
    headerRatingCell.textContent = 'RATING';
    headerRow.appendChild(headerRatingCell);
    searchDiv.appendChild(table);
    
    charityList.forEach(function(charity) {
        var img = document.createElement('img');
        var row = table.insertRow();
        var nameCell = row.insertCell(0);
        nameCell.classList.add('name-cell');
        nameCell.textContent = charity.Name;
        var addressCell = row.insertCell(1);
        addressCell.textContent = charity.Address.streetAddress1 + ", " + charity.Address.city + ", " + charity.Address.stateOrProvince + ", " + charity.Address.postalCode;
        var ratingCell = row.insertCell(2);
        img.setAttribute('src', charity.Rating.ratingImage.large);
        ratingCell.appendChild(img);
        nameCell.addEventListener('click', function() {
            openInNewTab(charity.Website);
        });
    });
    searchDiv.appendChild(table);
};

var openInNewTab = function (url) {
    var win = window.open(url, '_blank');
    console.log(url);
    win.focus();
}

getCharityApiData();

