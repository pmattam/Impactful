//introduction image insertion
// var introSetup = function() {
//     var intro = document.querySelector('.introduction');
//     var introImage= document.createElement('img');
//     introImage.src = 'https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
//     intro.appendChild(introImage);
// }
// introSetup();

var $photoGallery = $('.photos');
var imgGallery = [ 
    {
        link: "images/pg1.jpg"
    },
    {
        link: "images/pg2.jpg"
    },
    {
        link: "images/pg3.jpg"
    },
    {
        link: "images/pg4.jpg"
    }
];

var imageDisplay = function(gallery) {
    gallery.forEach(function(image) {
        var $imageTag = $('<img>', {'src': image.link});
        $photoGallery.append($imageTag);
    });
};

imageDisplay(imgGallery);

document.addEventListener('click', function(e) {
    var loginButton = document.querySelector('#login-trigger')
    var loginMenu = document.querySelector('.login-content');
    var loginForm = document.querySelector('.login-form')
    console.log(loginForm)
    console.log(e.target.parentElement)
    if (e.target === loginButton) {
        loginMenu.classList.remove('inactive');
    } else if (e.target.parentElement === loginForm) {
        loginMenu.classList.remove('inactive');
    } else {
        loginMenu.classList.add('inactive');
    }
});



//google maps API
  // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    };

