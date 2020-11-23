var fireSubmit = function(){
    var formElement = document.querySelector("#contact-us");
    var formData = new FormData(formElement);
    for (var value of formData.values()) {
        console.log(value); 
     }
}