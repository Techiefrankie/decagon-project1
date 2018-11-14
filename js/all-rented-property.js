$(document).ready(function () {
    let path = "http://localhost:3000/rentals";
    $(function () {
        $.ajax({
            url: path,
            method: "get",
            success: function (data) {
                for (let i = 0; i < data.length; i++){
                    let email = data[i].user;
                    console.log(email);
                    let display = `<tr>
                        <td><img id="img" src='${data[i].image}' height='250px' width='300px' alt='image'/></td>
                        <td> ${data[i].title}</td>
                        <td><span class='location'> ${data[i].location} </span></b>
                        <td>${data[i].owner}</td>
                        <td>${data[i].duration}</td>
                        <td>${numeral(data[i].annualPrice).format('0,0')}</td>
                        <td>₦${numeral(data[i].pricePaid).format('0,0')}</td>
                        <td><span class="btn btn-success">Active</span> </td>
                        <input type="hidden" id="tenantEmail" value="${email}"/>
                        <td>
                        <div class="row">
                            <div class="col-md-6">
                            <a href="view-listing.html?id=${data[i].propertyId}">
                                <button type="button" class="btn btn-warning btn-sm"><span class="glyphicon glyphicon-eye-open"> View Property</span> </button> 
                            </a>
                        </div>
                        
                        <div class="col-md-6">
                            <button type="button" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-eye-open" onclick="viewTenant('${email}');"> View Tenant</span> </button> 
                        </div>
                        </div>
                        
                        </td>
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

function viewTenant(email) {
    $.ajax({
        url: " http://localhost:3000/users?email="+email,
        success: function (data) {
            console.log(data)
            swal({
                title: data[0].name,
                text: "Is the tenant of this property",
                icon: "success",
                button: "Got It!",
            });
        },
        error: function () {
            //document.getElementById("error").innerHTML = "Error occured, please try again";
        }
    });
}