function handleSubmit(e) {
  e.preventDefault();
  const file = document.getElementById('upload-input').files[0];

  if (!file) {
    return onError({message: 'Please select a file.'})
  }
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
    const res = await fetch(url, settings);
    const data = await res.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
}

function onSuccess(data) {
  const status = document.querySelector('.status');
  const input = document.getElementById('upload-input');
  input.value = '';
  status.innerHTML = `<p>${data.message}</p>`;
}

function onError(error) {
  const status = document.querySelector('.status');
  status.innerHTML = `<p>${error.message}</p>`;
}

function addEvents() {
  const form = document.getElementById('upload');
  form.addEventListener('submit', handleSubmit);
}

addEvents();