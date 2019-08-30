function logFormInfo(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  console.log(sessionStorage.getItem("captchaResponse"));
  if (sessionStorage.getItem("captchaResponse") === "true") {
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Message: " + message);
  } else console.log("Something seems fishy... you don't seem human!");
}
