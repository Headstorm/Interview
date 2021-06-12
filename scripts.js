function validation() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var error_message = document.getElementById("error_message");
    var text;

    error_message.style.padding = "10px";

    if(name.length <5) {
        text= "Please Enter a Valid Name";
        error_message.innerHTML= text;
        return false;
    }

    if(isNaN(phone) || phone.length !=10) {
        text= "Please Enter a Valid Number";
        error_message.innerHTML= text;
        return false;
    }

    if(email.indexOf("@") == -1 || email.length <6){
        text= "Please Enter a Valid Email";
        error_message.innerHTML= text;
        return false;
    }

    if(subject.length <6) {
        text = "Please Ellaborate";
        error_message.innerHTML= text;
        return false;
    }

    if(message.length <= 150) {
        text = "Please Enter More Than 150 Characters";
        error_message.innerHTML= text;
        return false;
    }


    alert("Form was Submitted Successfully! \n We'll be in touch soon.");
    return true;
}

function submitUserForm() {
    var response = grecaptcha.getResponse();
    if(response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
        return false;
    }
    return true;
}
 
function verifyCaptcha() {
    document.getElementById('g-recaptcha-error').innerHTML = '';
}