
var dropdownContent = document.querySelector('.dropdown-content');

var dropbtn = document.querySelector('.dropbtn');
dropbtn.addEventListener('click', function() {
    dropdownContent.classList.toggle('active');
})

var dropdownList = document.querySelectorAll('.dropdown-content a');
dropdownList.forEach(function(element){
    element.addEventListener('click',function(event) {
        dropdownContent.classList.remove('active');
});
})

var close = document.querySelector('.close-button');
close.addEventListener('click', function() {
    dropdownContent.classList.remove('active');
})

