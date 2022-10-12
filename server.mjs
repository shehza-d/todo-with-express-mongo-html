import express, { response } from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/',(request, response)=>{
	response.send("Server hello world shehzad")
})
// console.log("sh");//to remove

app.listen(PORT, () => {
	console.log(`Examples app listening on port ${PORT}`)
  })


  console.log(`Im sever file from Shehzad`)
// deploped on Cyclic with repo of https://github.com/shehza-d/starter-express-api


// code from Express Website  https://expressjs.com/en/starter/hello-world.html

import express from 'express' //new way
const app = express()
const port = 3000

app.get('/', (req, res) => {
	console.log(`someone is requesting on this server `,new Date());
	
	
	setTimeout( () => {
		res.send('Assalam-O-Alaikum World from SHEHZAD Server written in ExpressJS hosted on Cyclic Cloud! 1')
	}, 4000);
//	res.send('Assalam-O-Alaikum World from SHEHZAD Server written in ExpressJS hosted on Cyclic Cloud! 2')
})
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

