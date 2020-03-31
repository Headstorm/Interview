console.log("Javascript is loading");
let contactName = document.getElementById("nameInput");
// let company = document.getElementById("companyInput");
// let email = document.getElementById("emailInput");
// let message = document.getElementById("messageInput");
let contactForm = document.getElementById("contactForm");

//SUBMIT WILL NOT CONSOLE LOG ANYTHING
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log(
    "name:",
    contactName.value
    //   "company:",
    //   company.value,
    //   "email",
    //   email.value,
    //   "message:",
    //   message.value
  );
  contactForm.reset();
});
