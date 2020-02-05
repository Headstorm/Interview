// Results based on captcha 
function showResult(text) {
    // Checking for success/failure of captcha
    // console.log(JSON.parse(text).google_response.success);
    if (JSON.parse(text).google_response.success) {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        // Dump form information in console if pass captcha
        console.log("Name: " + firstName + " " + lastName)
        console.log("Email: " + email)
        console.log("Message: " + message)

        document.querySelector("#success").innerHTML = "Thank you, your form has been submitted"
    }

    // If captcha fails, send error to client
    else {
        document.querySelector("#success").innerHTML = "Did not pass recaptcha"
    }
}

// Function to handle submit
function handleClick(token) {
    return function () {
        // Capture data inputs
        var firstName = document.querySelector("#firstName").value;
        var lastName = document.querySelector("#lastName").value;
        var email = document.querySelector("#email").value;
        var message = document.querySelector("#message").value;
        var data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message,
            token: token
        };

        // Send captcha and data
        fetch("/send", {
            headers: {
                "Accept": "applicatin/json",
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(text => showResult(text))
            .catch(error => showResult(error));
    }
}

// Load captcha and send token on submit button
grecaptcha.ready(function () {
    grecaptcha.execute("6LeZYtAUAAAAAG63Un50E5HhFtT59FM5Q-sdFxKg", { action: "homepage" })
        .then(function (token) {
            document.querySelector('#submitBtn').addEventListener('click', handleClick(token));
        });
});



