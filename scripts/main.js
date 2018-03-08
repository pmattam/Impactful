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

