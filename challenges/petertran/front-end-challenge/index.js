let contactData = {};

function submitForm() {
  $('#contact').on('submit', e => {
    e.preventDefault();
    const fields = ['first-name', 'last-name', 'email', 'phone'];

    for (let field of fields) {
      contactData[field] = e.target[field].value;
    }

    grecaptcha.execute('6LfltbYUAAAAALTUQnldvI439ba0lyamcx_0Mi9r', {action: 'contact_form'})
      .then(verify);
  });
}

function verify(token) {
  const settings = {
    contentType: 'application/json',
    dataType: 'json',
    method: 'GET',
    url: `http://localhost:8080/grecaptcha?response=${token}`
  }

  $.ajax(settings)
    .done(onSuccess)
    .fail(onErr)
}

function onSuccess() {
  console.log(contactData);
  $('#contact')[0].reset();
  contactData = {};
}

function onErr({responseJSON: {message}}) {
  $('.error').html(message);
}

$(submitForm());