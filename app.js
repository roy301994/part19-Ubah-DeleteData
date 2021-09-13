const express = require('express')
const app = express()
const port = 3000





app.get('/', (req, res) => {
//   res.send('Homepage root')
//   res.json({
//     nama: "roy naldo",
//     email: "roynaldo@gmail.com",
//     noHP: "08119439420"

//   })
  res.sendFile('./index.html',{root: __dirname})  

})

app.get('/about', (req, res) => {
    // res.send('Page About')
    res.sendFile('./about.html',{root: __dirname})  
  })

  app.get('/contact', (req, res) => {
    // res.send('Page Contact!')
    res.sendFile('./contact.html',{root: __dirname}) 
  })

  //Param
//   app.get('/product/:idProd/category/:idCat',(req,res)=>{ //req.param.X     maka di url nya pake :X  (: sebagai penanda place holder param)
//         //menangkap id dengan param
//         res.send(`Product ID :${req.params.idProd} <br> Category ID : ${req.params.idCat}`)
//   })

//Query : mengambil category dengan cara query maka di url tidak perlu diisi tapi di browser perlu : /category/20 menjadi ?category=20
  app.get('/product/:idProd',(req,res)=>{ //cara ngambil 20 dan categorynya dengan req query
    //menangkap id dengan param
    res.send(`Product ID :${req.params.idProd} <br> Category ID : ${req.query.category}`)
})





  app.use('/', (req, res) => {
    res.status(404)
    res.send('<H1>404</H1>') //res send kalau berhasil status codenya 304 tapi kita mau responnya adalah 404 maka pake method res.status
    
  })  
 




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})