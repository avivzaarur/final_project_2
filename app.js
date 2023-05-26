
import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from "fs";
import https from "https";
import bodyParser from "body-parser";
import {ClientRegisterApi} from "./api/usersApi.js";
import axios from "axios";

const url  = ''
const __dirname = path.resolve();

//const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.post("/", function (req, res) {

    const userData = req.body;
    // Logging the form body
    console.log(req.body);
    res.json({ message: 'Form submitted successfully' });

    // Redirecting to the root
    //res.redirect("/");
});



/*axios.get('http://localhost:8081/login.html')
    .then(response => {
        // Process the response data from the backend
        console.log(response.data);
    })
    .catch(error => {
        // Handle any error that occurred during the request
        console.error(error);
    });*/

/*app.use('/',(req,res,next)=>{
    res.send('hello I am SSL Server !')
})*/
const options={
    key:fs.readFileSync(path.join(__dirname,'./cert/key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'./cert/cert.pem'))
}
https.createServer(options, app)
    .listen(8081, function (req, res) {
        console.log("Server started at port 8081");
    });
/*const sslServer=https.createServer(options,app);
sslServer.listen(1337,()=>{
    console.log('Secure server is listening on port 1337')
})*/

/*app.listen(port, () => {
    console.log(`Server Started at https://localhost:${port}`)
});*/

const onFinish = async (values) => {
    console.log(values);
    const dataFromServer = await ClientRegisterApi(values);
    if (dataFromServer) {
        console.log(dataFromServer);
        console.log("Registration successful!");
    } else {
        console.log("something went wrong");
    }
}










/*app.post("/", (req, res) => {
    res.sendFile(__dirname + "/system.html");
});*/



