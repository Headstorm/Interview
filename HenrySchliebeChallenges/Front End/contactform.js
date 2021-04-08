function contactForm(event){
                event.preventDefault();
                var n = document.getElementById("name");
                var e = document.getElementById("email");
                var p = document.getElementById("phone");
                var m = document.getElementById("message");
                console.log("Name: "+n.value);
                console.log("Email: "+e.value);
                console.log("Phone: "+p.value);
                console.log("Message: "+m.value);
                console.log("Successfully submitted!");
}

function captchasubmit(token){
                document.getElementById("contactform").submit();
}