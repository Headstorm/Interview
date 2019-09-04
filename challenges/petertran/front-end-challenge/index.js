function submitForm() {
  $('#contact').on('submit', (e) => {
    e.preventDefault();
    const fields = ['first-name', 'last-name', 'email', 'phone'];
    const data = {};

    for (let field of fields) {
      data[field] = e.target[field].value;
    }

    grecaptcha.execute('6LfltbYUAAAAALTUQnldvI439ba0lyamcx_0Mi9r', {action: 'contact_form'}).then(function(token) {
      console.log(data);
   });
  });
}

$(submitForm());