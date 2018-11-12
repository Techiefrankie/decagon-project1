$(document).ready(function () {

    //list of property
    $.ajax({
        url: 'http://localhost:3000/houses',
        success: function (data) {
            for (let i = 0; i < 4; i++){
                let title = data[i].title;
                let location = data[i].location;
                let price = data[i].price;
                let img = data[i].image;
                let display = `
                    <div class='col-md-3' style="margin-bottom: 5px">
                        <div class="listing-pane">
                            <img src="${img}" class="list-img">
                            <p>${title}</p>
                            <p><label>${location}</label></p>
                            <p><b>₦${numeral(price).format('0,0')}</b></p>
                            <p><button type="button"  class="btn btn-warning" onclick="rentAlert();">Rent property</button> </p>
                        </div>
                    </div>
                `;

                $('#home-list').append(display);
            }
        },
    });

    //login module
    $('#login').click(function () {
        let email = $('#email').val();
        let password = $('#password').val();
        if ( email === ''  || password == ''){
            document.getElementById("error").innerHTML = "Please enter username and password";
        }
        else if (!emailCheck(email)) {
            document.getElementById("error").innerHTML = "Invalid E-mail ID";
        }
        else{
            document.getElementById("error").innerHTML = "";
            let query = " http://localhost:3000/users?email="+email+"&password="+hashCode(password);
            // $.get(query, function( data ) {
            //     if (data.length > 0){
            //         document.cookie = "email="+email;
            //         document.location.href = "dashboard1.html";
            //     }
            //     else{
            //         document.getElementById("error").innerHTML = "Username or password incorrect";
            //     }
            // }, "json" );


            $.ajax({
                url: query,
                success: function (data) {
                    if (data.length > 0){
                        sessionStorage.setItem("email", email);
                        document.location.href = 'dashboard.html';
                    }
                    else{
                        swal({
                            title: "Oops!",
                            text: "Username or password incorrect!",
                            icon: "warning",
                            button: "Try Again!",
                        });
                    }
                },
                error: function () {
                    document.getElementById("error").innerHTML = "Error occured, please try again";
                }
            });
        }
    });

    //sign up module
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

    //add house for listing section begins
    $('#add-listing').click(function () {
        let title = $('#title').val();
        let location = $('#location').val();
        let owner = $('#owner').val();
        let price = $('#price').val();
        if (title === ''){
            $('#error').html('Please provide a title');
        }
        else if (location === ''){
            $('#error').html('Where is this property located?');
        }
        else if (owner === ''){
            $('#error').html('Who owns this property?');
        }
        else if (price == ''){
            $('#error').html('Price cannot be empty');
        }
        else if (parseInt(price) % 1 !== 0){
            $('#error').html('Price must be a number');
        }
        else{
            $('#error').html('');
            let id = Math.floor(Math.random() * 101)
            //post data to json
            let img = "images/img" +  Math.floor(Math.random() * 21) +".jpg";
            let path = "http://localhost:3000/houses";
            let house = {
                    id : id,
                    title : title,
                    owner : owner,
                    location : location,
                    price : parseInt(price),
                    image : img
                };

            $.ajax({
                url: path,
                method: 'POST',
                data: house,
                success: function (response) {
                    swal({
                        title: "Success!",
                        text: "Property added for listing successfully!",
                        icon: "success",
                        button: "Ok!",
                    }).then((added) =>{
                        if (added){
                            let display = "<p class=''><img src='" + img +"' height='200px' width='200px' alt='image'/></p>" +
                                "<p class=''>" +title +
                                "   <b>" + location + "</b> " +
                                "   ₦" + numeral(price).format('0,0') + "</p>";
                            $('#list-display').append(display);
                        }
                    });

                },
                error: function (response) {
                    alert(response)
                }
            });
        }
    });

    //adding house for listing ends here

    //full list starts here
    $(function () {
        $.ajax({
            url: "http://localhost:3000/houses",
            method: "get",
            success: function (data) {
                for (let i = 0; i < data.length; i++){
                    let id = data[i].id;
                    let url = "view-listing.html?id="+id;
                    let rentUrl = "rent-property.html?id="+id;
                    let display = "<div class='each-list'><p class=''><img src='" + data[i].image +"' height='300px' width='400px' alt='image'/></p>" +
                        " <p class=''><span style='color: green;'>" + data[i].title +
                        "</span><span class='location'> - Location: <b> " + data[i].location + "</span></b> | " +
                        "<span style='color: maroon;'>₦" + numeral(data[i].price).format('0,0') + "</span></p>" +
                        "<a href='" + url + "' style='text-decoration: none; color:#ffffff;'><button class='btn btn-primary' style='margin-bottom: 10px;' type='button'><span class='glyphicon glyphicon-eye-open'> view Property</span></button> </a>" +
                        "<a href='" + rentUrl + "' style='text-decoration: none; color:#ffffff;'><button class='btn btn-warning' style='margin-bottom: 10px;' type='button'><span class='glyphicon glyphicon-book'> Rent Property</span></button> </a>"
                        "<br/></p>"
                        "</div><br/><br/>";
                    $('.full-list').append(display);
                }
            },
            error: function () {
                document.getElementById("error").innerHTML = "Error occured, please try again";
            }
        })
    });
    //full list ends here

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

function rentAlert() {
    swal({
        title: "Just a step to go!",
        text: "Please login or register to rent a property",
        icon: "warning",
        button: "Got It!",
    });
}

