const fileInput = document.getElementById('upload');

async function fetchReq(files) {
  const url = '/mergeDB';
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type' : 'multipart/form-data'
    },
    body: {noSQL: files}
  }
  const res = await fetch()
}

function handleSubmit(e) {
  e.preventDefault();

}

function handleChange(event) {

  console.log(event.target.files[0]);
}

function addEvents() {
  fileInput.addEventListener('submit', handleSubmit);
  fileInput.addEventListener('change', handleChange);
}


addEvents();