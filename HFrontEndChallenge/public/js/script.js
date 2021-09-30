//var for submitting form 
var isSubmitted = false; 

//submit the form on submit 
function onSubmit(token) { 
    console.log("submitted called"); 
    $('#comment_form').submit(); 
    //Disabling the page from refreshing
    return false;
}
//when the document has loaded 
$(document).ready(function() {
  $('#comment_form').submit(function() {
    $(this).ajaxSubmit({
      error: function(xhr) {
        console.log("Error"); 
      },
     success: function(response) {
      try {
        var parsed_data = JSON.parse(response.responseCode);
        if (parsed_data==1)
        {
          console.log("Recaptcha failed, alert user & return"); 
          alert("Recaptcha failed, try again :(")
          return;
        }
      } catch (error) {
        console.log("responseCode is undefined, must have passed");
      }
      //if it made it to here, it passed the recaptcha check so display info 
      var name = document.getElementById("name");
      var email = document.getElementById("email");
      var phoneNumber = document.getElementById("phoneNumber");
      var questions = document.getElementById("questions");
      console.log("Form submission: ------------------");
      console.log("Name: " + name.value);
      console.log("Email: " + email.value);
      console.log("Phone Number: " + phoneNumber.value);
      console.log("Questions: " + questions.value);
      console.log("End form submission: ---------------");
      console.log("The recaptcha worked, the response is below: ");
      console.log(response); 
      isSubmitted=true; 
      //switch form to close form 
      toggleOnSubmit(); 
     }
    });
    //disables refresh
    return false;
  });
});

//switch to new form upon submit/recaptcha pass & then reload once switched close is clicked
function toggleOnSubmit() { 
    if (isSubmitted==false) {
    document.getElementById("comment_form").innerHTML=
            `<div class="form-row">
                  <label id="namelabel" for="name">Name</label>
                  <input type="text" class="form-control" id="name" placeholder="Emily Miller">
              </div>
              <div class="form-row">
                <label id="emaillabel" for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="email" placeholder="miller24emily@gmail.com">
              </div>
              <div class="form-row">
                <label id="phonenumberlabel" for="phoneNumber">Phone Number (form XXX-XXX-XXXX)</label>
                <input type="tel" class="form-control" id="phoneNumber" placeholder="330-987-0225">
              </div>
              <div class="form-row">
                <label id="questionlabel" for="questions">Questions</label>
                <input type="text" class="form-control" id="questions" placeholder="Any questions? How can we help you!">
              </div>
              <br>
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
              isSubmitted=true;
    }

    else {
    document.getElementById("comment_form").innerHTML=
        `Thank you! We will be in touch soon. <br><br> <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick="window.location.reload();">Close</button>`;
    isSubmitted=false;
    }
    
}