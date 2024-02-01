let form = document.querySelector(".contact-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("submitted");
  let username, email, message, formObj;
  username = document.querySelector("#username").value;
  email = document.querySelector("#inputEmail").value;
  message = document.querySelector("#message").value;

  console.log({username, email, message});
})