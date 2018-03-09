//Opens login menu from navigator bar
document.addEventListener('click', function(e) {
    var loginButton = document.querySelector('#login-trigger');
    var loginMenu = document.querySelector('.login-content');
    var loginForm = document.querySelector('.login-form');
    if (e.target === loginButton) {
        loginMenu.classList.remove('inactive');
    } else if (e.target.parentElement === loginForm) {
        loginMenu.classList.remove('inactive');
    } else {
        loginMenu.classList.add('inactive');
    }
});

var dropdownContent = document.querySelector('.dropdown-content');
var dropbtn = document.querySelector('.dropbtn');
dropbtn.addEventListener('click', function(event) {
    dropdownContent.classList.toggle('active');  
    })