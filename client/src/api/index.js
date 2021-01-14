const LINK = "http://localhost:8000";

// Sends the JSON file as a parameter to NodeJS backend
const postData = async (data) => {
    let req = {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data })
    }
    let results = await fetch(LINK + '/data', req)
    return (results.json());
}

// recieves the sorted JSON file from NodeJS backend
const getData = async () => {
    let results = await fetch(LINK + '/data')
    //.then((res) => res.json());
    return (results.json());
}

export {
    postData,
    getData
}