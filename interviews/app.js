// backend rest api implemented using 
// Node JS (express framework), nodemon, 
// (with Postman http, iTerm2)
const express = require('express');
const app = express();

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'works!'
//     });
// });

// app.get('/', (req, res) => {
//     res.send('hello world!');
// });

// app.get('/api/courses', (req, res) => {
//     res.send([1,2,3,4]);
// });

app.post('/data', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        // 400 bad request 
        res.status(400).send('JSON needs exactly 500 random numbers (double, int)')
    }
})

app.get('/data', (req, res) => {
    
})

// const result = Object.values(obj).map((o) =>
//   Object.entries(o).reduce((r, [k, v]) => typeof v === 'number' ?
//     Object.assign(r, { [k]: v }) : r , {})
// );

console.log(result);

app.patch('/data', (req, res) => {

})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ${port}...'));

module.exports = app;