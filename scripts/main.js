var imgGallery = [ 
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
    {
        link: "images/pg8.jpg",
    }
];

// var imageDisplay = function(gallery) {
//     var $photoGallery = $('#photos');
//     gallery.forEach(function(image) {
//         var $imageTag = $('<img>', {'src': image.link});
//         $photoGallery.append($imageTag);
//     });
// };

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
    if (source<8) {
        firstPicture.setAttribute('src', imgGallery[source-2].link)
        secondPicture.setAttribute('src', imgGallery[source-1].link)
        thirdPicture.setAttribute('src', imgGallery[source].link)
        lastPicture.setAttribute('src', imgGallery[source+1].link)
    }
}

var leftArrowScrollThroughPictures = function() {
    var firstPicture = document.querySelector('#photos > img:nth-child(1)')
    var secondPicture = document.querySelector('#photos > img:nth-child(2)')
    var thirdPicture = document.querySelector('#photos > img:nth-child(3)')
    var lastPicture = document.querySelector('#photos > img:nth-child(4)')
    var source = findImageSource(firstPicture);
    if (source <5) {
        firstPicture.setAttribute('src', imgGallery[source].link)
        secondPicture.setAttribute('src', imgGallery[source+1].link)
        thirdPicture.setAttribute('src', imgGallery[source+2].link)
        lastPicture.setAttribute('src', imgGallery[source+3].link)
    } else if (source===5) {
        firstPicture.setAttribute('src', imgGallery[source-1].link)
        secondPicture.setAttribute('src', imgGallery[source].link)
        thirdPicture.setAttribute('src', imgGallery[source+1].link)
        lastPicture.setAttribute('src', imgGallery[7].link)
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

