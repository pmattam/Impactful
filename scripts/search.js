// Populate Search Results
var url = window.location.href;
var urlSplit = url.split('=')
var search = urlSplit[1]  
var URL = `https://api.data.charitynavigator.org/v2/Organizations?app_id=b57044da&app_key=f5ee4219833b3800a76f5ff48f56bcc1&pageSize=200&search=${search}&rated=true&state=GA&city=Atlanta&minRating=2&sort=RATING:DESC`;
var charityRawData = [];
var charityDataList = [];
var geoData = [];
var getCharityApiData = function() {
    fetch(URL, {method: 'GET'})
         .then(function(response) {
            return response.json();
        })
        .then(processGetData)
        .then(getCharityList)
        .then(charityDisplay)
        .then(getGeocodes)
        .then(asyncCall)
        .then(initMap);
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
    charityDataList = charityList;
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
    // console.log(url);
    win.focus();
};

var getGeocodes = function(charityList) {
    // console.log("Charity List", charityDataList);
    charityDataList.forEach(function(obj) {
        if(!(obj.Address.streetAddress1.startsWith("PO B")) && !(obj.Address.streetAddress1.startsWith("P.O. B"))) {
        var address = obj.Address.streetAddress1 + ", " + obj.Address.city + ", " + obj.Address.stateOrProvince + " " + obj.Address.postalCode;
        var geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDhUOOJ3zqFcsqCSl9pyYMXXiyMw03wH4E`;
        fetch(geoURL, {method: 'GET'})
            .then(function(response) {
                return response.json();
            })
            .then(function(apiObjData) {
                geoData.push(apiObjData.results[0]);
            });
        }
    });
};

function resolveAfterWait() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 500);
    });
}
  
async function asyncCall() {
    var result = await resolveAfterWait();
    return geoData;
}

// google maps API //
// Note: This example requires that you consent to location sharing when //
// prompted by your browser. If you see the error "The Geolocation service //
// failed.", it means you probably did not give permission for the browser to //
// locate you. //
var map, infoWindow;
var  initMap = function(geoCodesData) {
    // console.log("Geocodes Data", geoCodesData);
    map = new google.maps.Map(document.getElementById('search-map'), {
        center: {lat: 33.753, lng: -84.386},
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation. //
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here.');
        infoWindow.open(map);
        map.setCenter(pos);
        }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation //
        handleLocationError(false, infoWindow, map.getCenter());
    }
    // console.log("charity data list", charityDataList);
    // console.log("geoData", geoData);
    var marker, i;
    for (i = 0; i < geoData.length; i++) {
        // console.log("location", geoData[i].geometry.location);
		marker = new google.maps.Marker({
            // position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            // position: new google.maps.LatLng(geoData[i].geometry.location.lat, geoData[i].geometry.location.lng),
            position: geoData[i].geometry.location,
            map: map
        });
        
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
                var charityNameByAddress = getCharityNameByAddress(geoData[i].formatted_address);
                // console.log("Charity Name by Address", charityNameByAddress);
                infoWindow.setContent('<div><strong>' + charityNameByAddress + '</strong><br>' + geoData[i].formatted_address + '</div>');
				infoWindow.open(map, marker);
			}
		})(marker, i));
    }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

var getCharityNameByAddress = function(geoDataAddress) {
    // console.log("Actual geoData Address", geoDataAddress);
    var replacedGeoDataAddress = geoDataAddress.replace(" NW", "").replace(" NE", "").replace(", USA", "")
    .replace(" Avenue", " Ave").replace(" SE", "").replace(", SE", "").replace(" Boulevard", " Blvd").trim();

    var foundMatchingCharityObj = charityDataList.find(function(obj) {
        // console.log("Street Addr", obj.Address.streetAddress1);
        // console.log("Postal Code", obj.Address.postalCode);
        var address = obj.Address.streetAddress1 + ", " + obj.Address.city + ", " + obj.Address.stateOrProvince + " " + obj.Address.postalCode;
        var replacedAddress = address.replace(" Road", " Rd").replace(" Street", " St").replace(", NW", "").replace(" NW", "").replace(", NE", "")
        .replace(" NE", "").replace(" N.E.", "").replace(" Drive,", " Dr").replace(" Drive", " Dr").replace(" Ave,", " Ave").replace(" Avenue", " Ave")
        .replace(", Ste ", " #").replace(" Circle", " Cir")
        .replace(" Boulevard", " Blvd").replace(" Highway", " Hwy").replace(" Parkway,", " Pkwy").replace(" Parkway", " Pkwy").replace(" Deklab", " Dekalb")
        .replace(" SE", "").replace(", SE", "").replace(",,", ",").trim();
        // console.log("RA", replacedAddress);
        // console.log("RGA", replacedGeoDataAddress);
        return replacedAddress === replacedGeoDataAddress;
    });
    if(foundMatchingCharityObj !== undefined) {
        // console.log("Entire Match", foundMatchingCharityObj);
        return foundMatchingCharityObj.Name;
    }else {
        // console.log("Replaced GeoData Address", replacedGeoDataAddress);
        return "Unknown";
    }
};

getCharityApiData();

