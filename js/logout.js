$(document).ready(function () {
    //check if logged in
    let userEmail = sessionStorage.getItem('email');
    if (userEmail === null){
        document.location.href = 'index.html';
        //alert('no seesion')
    }

    $('#logout').click(function () {
        sessionStorage.clear();
        document.location.href = "index.html";
    });

});