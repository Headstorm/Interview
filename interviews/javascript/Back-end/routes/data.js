const router = require('express').Router()

let state = []

// Get endpoint that displays the data in the console and in the response
router.get('/', (req, res) => {
    console.log(state)
    res.status(200).send(state)
    
})


// Post endpoint
router.post('/', (req, res) => {

    const length = req.body.length
    if (length == 500) {
        // Checks if the lenght of the request is correct
        req.body.map(
            (number) => {
                if (typeof number == 'number') {
                    // Checks to see if user input is a number
                    // If it is a number. then pushes back the number into state
                    state.push(number)
                } else {
                    // If input contains even 1 number, then it clears the state, and returns an error
                    state = []
                    res.status(400).send('input contained a non-number')
                }
            }
        )
    } else {
        // Status returned if input is not of the correct size
        res.status(400).send('request size is wrong')
    }
    // Sorts the state and returns OK status
    state.sort()
    res.status(200).send('added number')

})

// BONUS Patch endpoint
router.patch('/', (req, res) => {
    // Creates a copy of the state, so if user input is wrong, state can revert back to
    // what it was before being called. 
    const copyOfState = state
    req.body.map(
        (number) => {
            if (typeof number == 'number') {
                // If the input is a number, then it is pushed back into the state
                state.push(number)
            } else {
                // If the input contains on non-number then state is reverted back to what it was
                // before being called by the PATCH endpoint
                state = copyOfState
                res.status(400).send('that is not a number')
            }
        }
    )
    // State is sorted and status OK is returned
    state.sort()
    res.status(200).send('added number')
})

module.exports = router