var URL = `https://api.data.charitynavigator.org/v2/Organizations?app_id=b57044da&app_key=f5ee4219833b3800a76f5ff48f56bcc1&rated=true&state=GA&city=Atlanta&minRating=2`;
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
        .then(getGeocodes)
        .then(asyncCall)
        .then(initMap);
};

var processGetData = function(apiData) {
    charityRawData = Object.values(apiData);
    // console.log(charityRawData);
    return charityRawData;
};

var getCharityList = function() {
    var charityList = charityRawData.map(function(obj) {
        var charityInformation = {'Name': obj.charityName, 'Address': obj.mailingAddress, 'Rating': obj.currentRating, 'Website': obj.websiteURL};
        return charityInformation;
    });
    // console.log(charityList);
    charityDataList = charityList; // Making charityList global using charityDataList because I couldn't access charityList as second argument in the promise
    // console.log("CharityDatalist", charityDataList);
    return charityList;
};

var getGeocodes = function(charityList) {
    charityList.forEach(function(obj) {
    // for(i=0; i<charityDataList.length; i++) {
        // var address = charityList.Address.streetAddress1 + ", " + charityDataList.Address.city + ", " + charityDataList.Address.stateOrProvince + " " + charityDataList.Address.postalCode;
        if(!(obj.Address.streetAddress1.startsWith("PO B")) && !(obj.Address.streetAddress1.startsWith("P.O. B"))) {
        var address = obj.Address.streetAddress1 + ", " + obj.Address.city + ", " + obj.Address.stateOrProvince + " " + obj.Address.postalCode;
        var geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDhUOOJ3zqFcsqCSl9pyYMXXiyMw03wH4E`;
        fetch(geoURL, {method: 'GET'})
            .then(function(response) {
                //console.log("Response", response);
                // console.log("datalist", charityDataList);
                return response.json();
            })
            .then(function(apiObjData) {
                geoData.push(apiObjData.results[0]);
                // console.log("Stringified Inside", JSON.stringify(geoData));
            });
            // .then(processGetGeocodesData);
            // console.log("Geo", geoData);
            // .then(function(rawObjData) {
            // console.log("data", rawObjData);
            // console.log("datalist", charityDataList[i]); 
            // console.log("Name", charityList[i].charityName);
            // });
        }
    });
    // console.log("Stringified", JSON.stringify(geoData));
    // return geoData;
};

function resolveAfterWait() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 500);
    });
}
  
async function asyncCall() {
    console.log('calling');
    var result = await resolveAfterWait();
    console.log(result);
    // expected output: "resolved"
    return geoData; // Returning here so it won't come empty
}

// google maps API //
// Note: This example requires that you consent to location sharing when //
// prompted by your browser. If you see the error "The Geolocation service //
// failed.", it means you probably did not give permission for the browser to //
// locate you. //
var map, infoWindow;
var  initMap = function(geoCodesData) {
    // console.log("Geocodes Data", geoCodesData);
    map = new google.maps.Map(document.getElementById('map'), {
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
        //console.log("location", geoData[i].geometry.location);
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

getCharityApiData();

var getCharityNameByAddress = function(geoDataAddress) {
    //console.log("Actual geoData Address", geoDataAddress);
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