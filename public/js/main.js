$(function() {

    //VALIDATES AND PRINTS DATA
   $.fn.validate = function(elem) {
    //get form values
    submission.fname = $("#firstname").val();
    submission.lname = $("#lastname").val();
    submission.email = $("#email").val();
    submission.phone = $("#phone").val();
    submission.msg = $("#message").val();
    //validate object
    for (var key in submission) {
        if (submission[key] == null || submission[key] == "")
            return alert("Please complete the form");
    }
    //Dump form info into the browser developer console
    console.log("Client First Name: " + submission.fname);
    console.log("Client Last Name: " + submission.lname);
    console.log("Client Email: " + submission.email);
    console.log("Client Phone: " + submission.phone);
    console.log("Client Message: " + submission.msg);

    //success and clear form 
    alert("We will be in contact with you shortly!");
    $.fn.clearForm();
   }

   //RESETS CONTACT FORM//
   $.fn.clearForm = function() {
    $("#firstname").val("");
    $("#lastname").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#message").val("");
    grecaptcha.reset();
    $("#submit").prop("disabled", true);

   }

});