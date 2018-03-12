var dropdownContent = document.querySelector('.dropdown-content');
var dropbtn = document.querySelector('.dropbtn');
dropbtn.addEventListener('click', function(event) {
    dropdownContent.classList.toggle('active');  
    })