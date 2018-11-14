$(document).ready(function () {
    let email = sessionStorage.getItem('email');
    let path = "http://localhost:3000/rentals?user=" + email;
    $(function () {
        $.ajax({
            url: path,
            method: "get",
            success: function (data) {
                for (let i = 0; i < data.length; i++){
                    let display = `<tr>
                        <td><img id="img" src='${data[i].image}' height='250px' width='300px' alt='image'/></td>
                        <td> ${data[i].title}</td>
                        <td><span class='location'> ${data[i].location} </span></b>
                        <td>${data[i].owner}</td>
                        <td>${data[i].duration}</td>
                        <td>${numeral(data[i].annualPrice).format('0,0')}</td>
                        <td>₦${numeral(data[i].pricePaid).format('0,0')}</td>
                        <td><span class="btn btn-success">Active</span> </td>
                        <td><button type="button" class="btn btn-info" onclick="renew();"><span class="glyphicon glyphicon-refresh"> Renew</span> </button> </td>
                        </tr>
                    </tr>`;
                    $('.rentals').append(display);
                }
            },
            error: function () {
                document.getElementById("error").innerHTML = "Error occured, please try again";
            }
        })
    })
});

function renew() {
    swal({
        title: "Success!",
        text: "Rent successfully renewed!",
        icon: "success",
        button: "Ok!",
    })
}