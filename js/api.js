$(document).ready(function () {

    $('#login').click(function () {
        let email = $('#email').val();
        let password = $('#password').val();
        if ( email === ''  || password == ''){
            document.getElementById("error").innerHTML = "Please enter username and password";
        }
        else{
            document.getElementById("error").innerHTML = "";
            let query = " http://localhost:3000/users?email="+email+"&password="+hashCode(password);
            $.get(query, function( data ) {
                if (data.length > 0){
                    document.cookie = "email="+email;
                    document.location.href = "dashboard1.html";
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

    $('#signup').click(function () {
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let confirm = $('#confirm').val();
        if (name.length === 0){
            $('#error').html('Name cannot be empty');
        }
        else if (!emailCheck(email)) {
            document.getElementById("error").innerHTML = "Invalid E-mail ID";
        }
        else if (password.length === 0) {
            document.getElementById("error").innerHTML = "Password cannot be empty";
        }
        else if (password.length < 6){
            document.getElementById("error").innerHTML = "Password cannot be less than 6 characters";
        }
        else if (password !== confirm) {
            $('#error').html('password mismatch');
        }
        else {
            $('#error').html('');
            let hashedPass = hashCode(password);

            //get next id
            let id = Math.floor(Math.random() * 101)
            //post data to json
            let user = {id: id, name: name, email: email, password: hashedPass};
            let path = "http://localhost:3000/users";
            $.ajax(
                {
                    url : path,
                    method : 'post',
                    data : user,
                    success : function (response) {
                        alert("User registered successfully");
                        document.location.href = 'index.html';
                    }
                }
            );
        }
    });

    function getNextID() {
        var count = 0;
        $.ajax({
           url: "http://localhost:3000/users",
            success: function (data) {

                for (let i = 0; i < data.length; i++){
                    count++;
                }
                console.log(count);
                return count;
            }
        });
    }

    function hashCode(s) {
        for(var i = 0, h = 0; i < s.length; i++)
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        return h;
    }

});

function isValidEmail() {
    let email = $('#email').val();
    if (!emailCheck(email)){
        document.getElementById("error").innerHTML = "Invalid E-mail ID";
    }
    else{
        document.getElementById("error").innerHTML = "";
    }
}

function emailCheck(str) {
    var at="@"
    var dot="."
    var lat=str.indexOf(at)
    var lstr=str.length
    var ldot=str.indexOf(dot)
    if (str.indexOf(at)==-1){
        document.getElementById("error").innerHTML = "Invalid E-mail ID";
        return false
    }

    if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
        document.getElementById("error").innerHTML = "Invalid E-mail ID";
        return false
    }

    if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
        document.getElementById("error").innerHTML = "Invalid E-mail ID";
        return false
    }

    if (str.indexOf(at,(lat+1))!=-1){
        document.getElementById("error").innerHTML = "Invalid E-mail ID";
        return false
    }

    if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
        document.getElementById("error").innerHTML = "Invalid E-mail ID";
        return false
    }

    if (str.indexOf(dot,(lat+2))==-1){
        document.getElementById("error").innerHTML = "Invalid E-mail ID";
        return false
    }

    if (str.indexOf(" ")!=-1){
        document.getElementById("error").innerHTML = "Invalid E-mail ID";
        return false
    }
    document.getElementById("error").innerHTML = "";
    return true
}

function checkPass() {
    let password = $('#password').val();
    let confirm = $('#confirm').val();
    if (password !== confirm) {
        $('#error').html('password mismatch');
    }
}

function isStrongPassword() {
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
    let password = $('#password').val();
    if (!passCheck(password)) {
        $('#error').html('password must be not less than 6 characters, contain upper case, lower case and special symbols');
    }
    else{
        $('#error').html('');
    }
}

function passCheck(password) {
    return password.length >= 6;
    //return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/);
    //return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/);
}

function nameCheck() {
    let name = $('#name').val();
    if (name.length === 0){
        $('#error').html('Name is required');
    }
    else{
        $('#error').html('');
    }
}