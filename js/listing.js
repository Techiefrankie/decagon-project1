$(document).ready(function () {

    let id = getId();
    let path = "http://localhost:3000/houses?id="+id;
    $(function () {
        $.ajax({
            url: path,

            method: "get",
            success: function (data) {
                for (let i = 0; i < data.length; i++){
                    let id = data[i].id;
                    let display = "<div class='each-list'><p class=''><img src='" + data[i].image +"' height='300px' width='400px' alt='image'/></p>" +
                        " <p class=''>" + data[i].title +
                        "<span class='location'> - Location: <b> " + data[i].location +"</span></b>" +
                        " | ₦" + data[i].price   +
                        "<p>Property Owner: "+ data[i].owner +"</p>"+
                        "<p class='form-group'>" +
                        "<button style='margin-bottom: 10px;' class='btn btn-warning' onclick='updateProperty();' type='button'><span class='glyphicon glyphicon-edit'> Edit House</span></button> " +
                        "<button style='margin-bottom: 10px;' id='deleteProp' onclick='deleteProperty();' class='btn btn-danger' type='button'><span class='glyphicon glyphicon-trash'> Delete House</span></button> " +
                        "</p>"
                    "</div><br/>";
                    $('.a-list').append(display);
                }
            },
            error: function () {
                document.getElementById("error").innerHTML = "Error occured, please try again";
            }
        })
    })


})

function deleteProperty() {
    let id = getId();
    if (confirm('Do you want to delete the selected property?')){
        let path = "http://localhost:3000/houses/"+id;
        $.ajax({
           url: path,
           method: 'delete',
           success: function (response) {
               alert('Property was deleted successfully');
               document.location.href = 'dashboard.html';
           },
            error: function (response) {
                alert(response)
            }
        });
    }
}

function updateProperty() {
    let path = `http://localhost:3000/houses?id=${getId()}`;
    $(function () {
        $.ajax({
            url: path,

            method: "get",
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    let title = data[i].title;
                    let location = data[i].location;
                    let owner = data[i].owner;
                    let price = data[i].price;
                    let img = data[i].image;

                    $('#single-list').append(`<div class='row'>`);
                    $('#single-list').append(`<div class='col-md-4'>`);
                    $('#single-list').append(`<div class='panel panel-default'>`);

                    $('#single-list').append(`<div class='panel-heading'>`);
                    $('#single-list').append(`<div class='panel-title'><h2 style='color: orangered;'>Update Property</h2></div>`);
                    $('#single-list').append(`</div>`);

                    $('#single-list').append(`<div class='panel-body'>`);

                    $('#single-list').append(`<div class='form-group'><input type='text' class='form-control' id='title' value='${title}'/></div>`);
                    $('#single-list').append(`<div class='form-group'><input type='text' class='form-control' id='location' value='${location}'/></div>`);
                    $('#single-list').append(`<div class='form-group'><input type='text' class='form-control' id='owner' value='${owner}'/></div>`);
                    $('#single-list').append(`<div class='form-group'><input type='text' class='form-control' id='price' value='${price}'/></div>`);
                    $('#single-list').append(`<div class='form-group'><input type='hidden' id='image' value='${img}'/></div>`);

                    $('#single-list').append(`<div class='form-group'><button onclick="saveUpdate();" type="button" class="btn btn-success">Update Property</button></div>`);

                    $('#single-list').append(`</div>`);

                    $('#single-list').append(`</div>`);
                    $('#single-list').append(`</div>`);
                    $('#single-list').append(`</div>`);
                }
            },
            error: function () {
                document.getElementById("error").innerHTML = "Error occured, please try again";
            }
        })
    })
}

function getId() {
    let url_string = document.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get('id');
    return id;
}

function saveUpdate() {
    let id = getId();
    let path = `http://localhost:3000/houses/${id}`;
    $(function () {
        $.ajax({
            url: path,
            data: {
                id : id,
                title: $('#title').val(),
                location: $('#location').val(),
                owner: $('#owner').val(),
                price: $('#price').val(),
                image : $('#image').val()
            },
            method: "put",
            success: function (data) {
                alert('Property updated successfully');
                document.location.href = `view-listing.html?id=${getId()}`;
            },
            error: function (err) {
                alert('Error occured. Please try again');
            }
        })
    })
}

