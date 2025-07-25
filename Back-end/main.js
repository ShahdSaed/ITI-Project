const express = require("express");

const server = express();
const mongoose=require('mongoose')
var cors = require('cors')

let movieRoutes=require('./routes/movie')

// key = VjoO0j4oNwMrnM4I
// connection string = mongodb+srv://shahd01278039699:VjoO0j4oNwMrnM4I@cluster0.7jcfh7w.mongodb.net/movieDB?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(`mongodb+srv://shahd01278039699:VjoO0j4oNwMrnM4I@cluster0.7jcfh7w.mongodb.net/movieDB?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
console.log('Connected To DB');
}).catch((err)=>{
console.log(`error connecting to DB :${err}`);
})


server.use(cors())
server.use(express.json());
server.use('/movie',movieRoutes)


server.listen(3000, () => {
  console.log("server Listening");
});