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