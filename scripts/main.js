//introduction image insertion
var introSetup = function() {
    var intro = document.querySelector('.introduction');
    var introImage= document.createElement('img');
    introImage.src = 'https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
    intro.appendChild(introImage);
}
introSetup();

var photoGallery = document.querySelector('.photos');
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
        var imageTag = document.createElement('img');
        imageTag.setAttribute('src', image.link);
        photoGallery.appendChild(imageTag);
    });
};

imageDisplay(imgGallery);
