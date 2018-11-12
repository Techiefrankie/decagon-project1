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
                    let display = `<div class='each-list'><p class=''><img src='${data[i].image}' height='300px' width='400px' alt='image'/></p>
                        <p class=''> ${data[i].title}<span class='location'> - Location: <b>  ${data[i].location} </span></b>
                         | ₦${numeral(data[i].price).format('0,0')} per anum
                        <p>Property Owner: ${data[i].owner}</p>
                        <p class='form-group'>
                        <h4>Rent Duration(years)</h4>
                        <input type="number" id="duration" class="bottom-margin" onchange="setDuration();"/>
                        <button class='btn btn-warning bottom-margin' onclick='rentProperty();' type='button'><span class='glyphicon glyphicon-book'> Rent House</span></button> 
                        </p>
                    </div><br/>`;
                    $('.a-list').append(display);
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
    alert('rent')
}

function setDuration() {

}