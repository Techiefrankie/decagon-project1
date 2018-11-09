$(document).ready(function () {
    function isValidUser(email,pass) {
        let query = " http://localhost:3000/users?email="+email+"&password="+pass;
        alert(query);
        $.get(query, function( data ) {
            if (data.length > 0){
            }
            else{

            }
        }, "json" );
        return login;
    }

    $('#login').click(function () {
        let email = $('#email').val();
        let password = $('#password').val();
        if ( email === ''  || password == ''){
            document.getElementById("error").innerHTML = "Please enter username and password";
        }
        else{
            document.getElementById("error").innerHTML = "";
            let query = " http://localhost:3000/users?email="+email+"&password="+password;
            $.get(query, function( data ) {
                if (data.length > 0){
                    document.location.href = "dashboard.html";
                }
                else{
                    document.getElementById("error").innerHTML = "Username or password incorrect";
                }
            }, "json" );
        }
    });

    $('.logout').click(function () {
        document.location.href = "index.html";
    });
});