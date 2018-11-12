$(document).ready(function () {
    $('#logout').click(function () {
        document.cookie = "email=''";
        document.location.href = "index.html";
    });

});