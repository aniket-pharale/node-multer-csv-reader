const express = require('express')
const app = express()
const port = 3000
const multer  = require('multer')
const csv =  require('csv-parser')
const { Readable } = require('stream');


const fileStorageEngine = multer.memoryStorage({});

const upload = multer({storage:fileStorageEngine});

app.post('/upload',upload.single('file'), async(req,res)=>{
    const customer = [];
    
    const stream = Readable.from(req.file.buffer);
    
    stream.pipe(csv())
    .on('error', error =>{
        console.log(error);
    })
    .on("data",(data)=>{
        customer.push(data)
    })
    
    .on('end', () =>{
        // console.log("customer",customer)
        customer.forEach(value =>{
            // check validation if particular column is empty
            if(value.ID==''){
              console.log(value.ID)

              console.error('SOme fields are empty')
            }
        });
    })

    res.send("file uploaded")})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})