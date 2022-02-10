require('dotenv').config()
const express = require('express')
const app = express()

const path = require('path')
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})


app.use(express.json());

const students = ['jimmy', 'johnny', 'billy', 'teddy']

//mk first endpts
//below = landing page
app.get('/', (req, res) => {
    console.log('hit')

    rollbar.log('someone hit the server?')

    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/api/students', (req, res) => {
    rollbar.info('someone got all the students?')
    res.status(200).send(students)
})


app.post('/api/students', (req, res) => {
    const { name } = req.body
    
    students.unshift(name)

    res.status(200).send(students)

})

app.delete('/api/students/:banana', (req, res) => {
    
    if (req.params.edx === '0')


    rollbar.info(`someone deleted ${students[+req.params.idx]}`)
    students.splice(+req.params.idx, 1)
    res.status(200).send(students)
})

const port = process.env.PORT || process.env.SERVER_PORT

app.listen(port, () => console.log(`server running on ${port}`))