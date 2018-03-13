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
    var $photoGallery = $('#photos');
    gallery.forEach(function(image) {
        var $imageTag = $('<img>', {'src': image.link});
        $photoGallery.append($imageTag);
    });
};

imageDisplay(imgGallery);


// //adding click listener to search button, will open new tab
// var searchForm = document.querySelector('#simple-search')
// searchForm.addEventListener('submit', function(e) {
//     var searchTerm = (searchForm.searchCharity.value);
//     window.open('html/search.html', '_blank');
// })

