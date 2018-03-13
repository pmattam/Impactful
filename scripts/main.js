var imgGallery = [ 
    {
        link: "images/pg0.jpg",
    },
    {
        link: "images/pg1.jpg"
    },
    {
        link: "images/pg2.jpg",
    },
    {
        link: "images/pg3.jpg",
    },
    {
        link: "images/pg4.jpg",
    },
    {
        link: "images/pg5.jpeg",
    },
    {
        link: "images/pg6.jpg",
    },
    {
        link: "images/pg7.jpg",
    },

];

var imageDisplay = function(gallery) {
    var photoGallery = document.querySelector('#photos');
    for (var i=0; i<gallery.length; i++) {
        var image = document.createElement('img');
        image.setAttribute('src', gallery[i].link);
        if (i < 4) {
            photoGallery.appendChild(image);
        }
    }
}


var rightArrow = document.querySelector('.rightarrow')
var leftArrow = document.querySelector('.leftarrow')

var findImageSource = function(picture) {
    var source = Number(((((picture.src).split('/pg'))[1]).split("."))[0]);
    return source;
}

var rightArrowScrollThroughPictures = function() {
    var firstPicture = document.querySelector('#photos > img:nth-child(1)')
    var secondPicture = document.querySelector('#photos > img:nth-child(2)')
    var thirdPicture = document.querySelector('#photos > img:nth-child(3)')
    var lastPicture = document.querySelector('#photos > img:nth-child(4)')
    var source = findImageSource(lastPicture);
    firstPicture.setAttribute('src', secondPicture.src) 
    secondPicture.setAttribute('src', thirdPicture.src)
    thirdPicture.setAttribute('src', lastPicture.src)
    if (source===(imgGallery.length-1)) {
        lastPicture.setAttribute('src', imgGallery[0].link)
    }   else {
        lastPicture.setAttribute('src', imgGallery[source+1].link) 
    }
}

var leftArrowScrollThroughPictures = function() {
    var firstPicture = document.querySelector('#photos > img:nth-child(1)')
    var secondPicture = document.querySelector('#photos > img:nth-child(2)')
    var thirdPicture = document.querySelector('#photos > img:nth-child(3)')
    var lastPicture = document.querySelector('#photos > img:nth-child(4)')
    var source = findImageSource(firstPicture);
    lastPicture.setAttribute('src', thirdPicture.src) 
    thirdPicture.setAttribute('src', secondPicture.src)
    secondPicture.setAttribute('src', firstPicture.src)
    if (source=== 0) {
        firstPicture.setAttribute('src', imgGallery[imgGallery.length-1].link)
    }   else {
        firstPicture.setAttribute('src', imgGallery[source-1].link) 
    }
}

rightArrow.addEventListener('click', function(e) {
    e.preventDefault();
    rightArrowScrollThroughPictures();
    
})

leftArrow.addEventListener('click', function(e) {
    e.preventDefault();
    leftArrowScrollThroughPictures();
    
})






imageDisplay(imgGallery);

