const siteKey = "Your_site_key"
var contactUs= new Object()

grecaptcha.ready(function(){
    grecaptcha.execute(siteKey, {action: 'contact-us'}).then(function(token) {
        contactUs['token'] = token
    })
})

function initialize()
{
    contactUs['firstName'] = document.getElementById('firstName')
    contactUs['lastName'] = document.getElementById('lastName')
    contactUs['emailId'] = document.getElementById('emailId')
    contactUs['comments'] = document.getElementById('comments')
    contactUs['result'] = document.getElementById('result')
}

//To send token to the server and verify the response as success or failure
function sendResponse()
{
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:3000/recaptcha?token="+contactUs.token, true)
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if(this.status == 200)
            {
                if(this.responseText == "OK")
                {
                    console.log("First Name:"+contactUs.firstName.value)
                    console.log("Last Name:"+contactUs.lastName.value)
                    console.log("Email ID:"+contactUs.emailId.value)
                    console.log("Comments:"+contactUs.comments.value)
                }
                else
                {
                    contactUs.result.innerHTML = "<p> Form Submission Failed. Please reload the page and submit. </p>"
                }

            }
            else
            {
                console.log(this.response)
            }
        }
    }
    xhr.send()
}