const fs = require('fs');
const pg = require('pg');
const http = require('http');   //Importing package http
require('dotenv').config(
);

const htmlPath = __dirname + '/../index.html';
const cssPath = __dirname + '/../style.css';
const jsPath = __dirname + '/../script.js';
const imgPath = __dirname + '/../image.jpeg';

const htmlFile = fs.readFileSync(htmlPath);
const cssFile = fs.readFileSync(cssPath);
const jsFile = fs.readFileSync(jsPath);
const imgFile = fs.readFileSync(imgPath);


const hostName = process.env.HOSTNAME;
const port = process.env.PORT;

const client = new pg.Client(process.env.PG_URL);

client.connect((err) => {
    if (err)
    {
        console.log(`Error Occured: ${err}`);
    } else {
        console.log('Connected to database');
        client.query('CREATE TABLE IF NOT EXISTS tbl_data (firstName VARCHAR(50), lastName VARCHAR(50), rollNumber VARCHAR(50), age INT );', (err, result)=>
        {
            if (err) {
                console.log('Error creating table');
            } else {
                console.log('Created Table');
            }
        })
        }
})


const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html'),
                res.write(htmlFile);
        }
        else if (req.url == '/style.css') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css'),
                res.write(cssFile);
        }
        else if (req.url == '/script.js') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/script'),
                res.write(jsFile);
        }
        else if (req.url == '/image.jpeg') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'image/jpeg'),
                res.write(imgFile);
        }
        res.end();
    } else if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk=>{
            body += chunk;
        });

        req.on('end', ()=>{
            if (req.url === '/submit') { 
                const json = JSON.parse(body);
                client.query(`INSERT INTO tbl_data (firstName, lastName, rollNumber, age) VALUES ('${json.fname}', '${json.lname}', '${json.froll}', ${json.age})`, function (err, result) {
                    if (err)
                    {
                        console.log(`Insertion error: ${err}`);
                    } else {
                        console.log('INSERTED DATA');
                        }
                });
                res.end();
            }

        });

     }
});

server.listen(port, hostName, ()=>{
    console.log(`Server running at http://${hostName}:${port}/`);
});