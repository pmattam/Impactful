// Charity Organization List to Choose From When Donating
var $charityName = $('.charity-name');
var URL = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=b57044da&app_key=f5ee4219833b3800a76f5ff48f56bcc1&pageSize=200&city=Atlanta&state=GA';
var charityRawData = [];

var getCharityApiData = function() {
    fetch(URL, {method: 'GET'})
         .then(function(response) {
            return response.json();
        })
        .then(processGetData)
        .then(getCharityList)
        .then(charityDisplay)
        .then(donateFormSubmitEventListener);
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
};

var charityDisplay = function(charityList) {
    $charityName.click(function() {
        charityList.forEach(function(name) {
            var $option = $('<option>', {'text': name});
            $charityName.append($option);
        });
    }); 
};

var getFormData = function() {
    var obj = {};
    obj.firstName = document.querySelector("[name='firstName']").value;
    obj.lastName = document.querySelector("[name='lastName']").value;
    obj.charityName = document.querySelector("[name='charityName']").value;
    obj.amount = document.querySelector("[name='amount']").value;
    obj.creditCard = document.querySelector("[name='creditCard']").value;
    obj.dateMonth = document.querySelector("[name='expirationDate']").value;
    obj.cvv = document.querySelector("[name='cvv']").value;
    // console.log("Object Values", obj);
    return obj;
};

var donateFormSubmitEventListener = function() {
    var donateForm = document.querySelector("[data-donate-form='form']");
    donateForm.addEventListener('submit', function(event) {
        // console.log("Coming here");
        event.preventDefault();
        var formData = getFormData();
        // console.log("Form Data", formData);
        // var formDataJSON = JSON.stringify(formData);
        var firebaseRef = firebase.database().ref();
        firebaseRef.child(formData.lastName).set(formData);
        window.alert(" Thankyou for your Donation! ")
        donateForm.reset();
    });
};

getCharityApiData();

