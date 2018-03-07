
//introduction image insertion
var introSetup = function() {
    var intro = document.querySelector('.introduction');
    var introImage= document.createElement('img');
    introImage.src = 'https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
    intro.appendChild(introImage);
}
introSetup();


