const express = require('express')
const cors = require('cors')
const fileSystem = require('fs'); //fileSystem
const app = express()
const PORT = 1234;
app.use(express.json())
app.use(cors({
    origin: "*",
    /*methods: [],
    allowedHeaders: []*/
}))
//root directory
app.get('/', function (req, res) {
  res.send('Hello World')
})

//new page example
app.get('/people-in-class', (req, res)=> {
    res.send(["Josh", "Racheal", "Simon"])
})

app.get('/absent-students', (req, res)=> {
    res.send(["adam", "braydon", "micheal"])
})

app.post('/save-patient-data', (req, res) => {
    const collectedPatientData = req.body;

    fileSystem.readFile('patientData.json', (err, data) => {
        let jsonData = [];
        if(!err) {
            jsonData = JSON.parse(data)
        }
        jsonData.push(collectedPatientData);
    })

    fileSystem.writeFile('patientData.json', jsonData, (err) => {
        if(err) {
            console.log("ERRROR WIRITNG TO FILE", err);
            //return res.send("DATA FAILED"),
            return res.status(500).send({ message : "Failed to save data"})
        } else {
            return res.send({ message : "Failed to save data"})
        }

    } )
})

// App listner to port 1234
app.listen(PORT, () => {
    console.log("I am listening to the port number now", PORT)
})