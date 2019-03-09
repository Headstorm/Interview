//Print object to console




document.querySelector('.btn-enter').addEventListener('click', function() {
    
    //Gather values in form input in an object and Print to log
    var information = {
        firstName: document.getElementById("first").value,
        lastName: document.getElementById("last").value,
        email: document.getElementById("email").value,
        tel: document.getElementById("tel").value,
        comment: document.getElementById("comment").value,
    };
    
    console.log(information);
    
    onloadCallback();
    
    //reset values to nothing
    document.getElementById("first").value = "";
    document.getElementById("last").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("comment").value = "";
    
})


//when form is submit
function onloadCallback() {
    // we stoped it
    event.preventDefault();
    
    /*
    var verifyCallback = function(response) {
        alert(response);
      };
      var widgetId1;
      var widgetId2;
      var onloadCallback = function() {
        // Renders the HTML element with id 'example1' as a reCAPTCHA widget.
        // The id of the reCAPTCHA widget is assigned to 'widgetId1'.
        widgetId1 = grecaptcha.render('first', {
          'sitekey' : '6LcwspUUAAAAAI5lFFsGSsQLwGMNcMp4fIUgu4Hf',
          'theme' : 'light'
        });
        widgetId2 = grecaptcha.render(document.getElementById('last'), {
          'sitekey' : '6LcwspUUAAAAAI5lFFsGSsQLwGMNcMp4fIUgu4Hf'
        });
        grecaptcha.render('email', {
          'sitekey' : '6LcwspUUAAAAAI5lFFsGSsQLwGMNcMp4fIUgu4Hf',
          'callback' : verifyCallback,
          'theme' : 'dark'
        });
      };*/
    
    
    
    
    /*
    grecaptcha.ready(function() {
        grecaptcha.execute('6LcwspUUAAAAAI5lFFsGSsQLwGMNcMp4fIUgu4Hf', {action: 'homepage'}).then(function(token) {
            if(result.success) {
                alert('Thank you for your input!')
            } else {
                alert('Not valid!')
            }
        });
    });
    */
    
  };






