require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const apiRoutes = require("./routes/cveRoutes");
const filterRoutes = require("./routes/filterRoutes");
const paginateRoutes = require("./routes/paginateRoutes");

const app = express()
app.use("/api/",apiRoutes);
app.use("/api/filter/",filterRoutes);
app.use("/api/paginate/",paginateRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at port ${process.env.PORT} and db is connected`)
  })
})
