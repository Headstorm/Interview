let contactData = {};

function submitForm() {
  $('#contact').on('submit', e => {
    e.preventDefault();

    const fields = ['first-name', 'last-name', 'email', 'phone'];
    const errMsg = 'Must provide at least one form of contact!';
    
    for (let field of fields) {
      contactData[field] = e.target[field].value;
    }

    if (!(contactData.email || contactData.phone)) {
      $('.error').html(errMsg);
    } else {
      grecaptcha
        .execute(
          '6LfltbYUAAAAALTUQnldvI439ba0lyamcx_0Mi9r', 
          {action: 'contact_form'}
        )
        .then(verify);
    }
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
  $('.error').empty();
  contactData = {};
}

function onErr(error) {
  if (!error.responseJSON) {
    $('.error').html('Something went wrong :(');
  }

  $('.error').html(error.responseJSON.message);
}

$(submitForm());