
//fetches information from Charity Navigator API

fetch("https://api.data.charitynavigator.org/v2/Organizations?app_id=b57044da&app_key=f5ee4219833b3800a76f5ff48f56bcc1&pageSize=50&state=GA")
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        return (Object.values(data))
    })
    .then(function(data) {        
        for (var i=1; i<data.length; i++) {
            var text = data[i];
            text = JSON.stringify(text);
        var searchResults = document.querySelector('.searchResults');
        var newDiv = document.createElement('div');
        newDiv.textContent = text;
        searchResults.appendChild(newDiv);
        }
    });