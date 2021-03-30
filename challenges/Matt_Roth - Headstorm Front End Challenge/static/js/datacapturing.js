let contact_name = document.getElementById("contact_name");
let contact_email = document.getElementById("contact_email");
let contact_message = document.getElementById("contact_message");

let count = 0;

function data_grab(){
    count += 1;
    console.log("------------------");
    console.log(`User Submission #${count}`);
    console.log(`Name: ${contact_name.value}`);
    console.log(`Email: ${contact_email.value}`);
    console.log(`Message: ${contact_message.value}`);
    document.getElementById("send_message").innerHTML = "Thank you! <br> We'll get back to you shortly.";
}