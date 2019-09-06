function handleSubmit(e) {
  e.preventDefault();
  const file = document.getElementById('upload-input').files[0];
  const reader = new FileReader();
  
  let dataset;

  reader.onload = function (e) {
    dataset = e.target.result
    fetchReq(dataset);
  }

  reader.readAsText(file);
}

async function fetchReq(dataset) {
  const url = '/mergedb';
  const settings = {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: dataset
  }

  try {
    await fetch(url, settings);
    onSuccess();
  } catch (error) {
    onError();
  }
}

function onSuccess() {
  const status = document.querySelector('.status');
  status.innerHTML = `<p>Success!</p>`;
}

function onError() {
  const status = document.querySelector('.status');
  status.innerHTML = `<p>Something went wrong :(</p>`;
}

function addEvents() {
  const form = document.getElementById('upload');
  form.addEventListener('submit', handleSubmit);
}

addEvents();