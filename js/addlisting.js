$(document).ready(function () {

});

function House(id,title,location,owner,price,img) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.owner = owner;
    this.price = price;
    this.image = img;
}

function createList() {

}

function previewFile(){
    let preview = document.querySelector('img'); //selects the query named img
    let file    = document.querySelector('input[type=file]').files[0]; //sames as here
    let reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}
previewFile();

$("div#myId").dropzone({ url: "/file/post" });
//loremflickr.com