$(document).ready(function () {
    let id = getId();
    let path = "http://localhost:3000/houses?id="+id;
    $(function () {
        $.ajax({
            url: path,

            method: "get",
            success: function (data) {
                for (let i = 0; i < data.length; i++){
                    let display = `<div class='each-list'>
                        <p class=''><img id="img" src='${data[i].image}' height='250px' width='300px' alt='image'/></p>
                        <p class=''> ${data[i].title}<span class='location'> - Location: <b>  ${data[i].location} </span></b>
                         | ₦${numeral(data[i].price).format('0,0')} per anum
                        <p>Property Owner: ${data[i].owner}</p>
                        <p class='form-group'>
                        <h4>Rent Duration(years)</h4><span id="rent-price"></span><br/>
                        <input type="number" id="duration" class="bottom-margin" onchange="setDuration();"/>
                        <input type="hidden" id="price"  value="${data[i].price}"/>
                        <input type="hidden" id="owner"  value="${data[i].owner}"/>
                        <input type="hidden" id="title"  value="${data[i].title}"/>
                        <input type="hidden" id="location"  value="${data[i].location}"/>
                        <input type="hidden" id="image"  value="${data[i].image}"/>
                        <input type="hidden" id="propertyId"  value="${id}"/>
                        <button class='btn btn-warning bottom-margin' onclick='rentProperty();' type='button'><span class='glyphicon glyphicon-book'> Rent House</span></button> 
                        </p>
                    </div><br/>`;
                    $('.a-list').append(display);
                    $('#duration').val(1);
                }
            },
            error: function () {
                document.getElementById("error").innerHTML = "Error occured, please try again";
            }
        })
    })
});


function getId() {
    let url_string = document.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get('id');
    return id;
}

function rentProperty() {
    let user = sessionStorage.getItem('email');
    let title = $('#title').val();
    let price = $('#price').val();
    let location = $('#location').val();
    let duration = $('#duration').val();
    let newPrice = duration * price;
    let owner = $('#owner').val();
    let image = $('#image').val();
    let id = Math.floor(Math.random() * 101);
    let propId = $('#propertyId').val();

    let data = {
        id: id,
        user: user,
        title: title,
        location: location,
        duration: duration,
        annualPrice: price,
        pricePaid: newPrice,
        owner: owner,
        image: image,
        propertyId: propId
    };

    $.ajax({
        url: 'http://localhost:3000/rentals',
        method: "POST",
        data: data,
        success: function (data) {
            let  msg = duration > 1 ? duration + " years" : "1 year";
            swal({
                title: "Success!",
                text:  "₦" + numeral(newPrice).format('0,0') + ", has been paid for this property\nfor a period of " + msg,
                icon: "success",
                button: "Ok",
            }).then((ok) => {

            });
        }
    });
}

function setDuration() {
    let duration = $('#duration').val();
    if(duration <= 0){
        swal({
            title: "Caution!",
            text: "Rent duration rent must not be less than a year!",
            icon: "warning",
            button: "Got It",
        }).then((ok) => {
            $('#duration').val(1);
        });
    }
    else{
        let price = $('#price').val();
        let newPrice = duration * price;
        $('#rent-price').html("₦" + numeral(newPrice).format('0,0'));
    }

}