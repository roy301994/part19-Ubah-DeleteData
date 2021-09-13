const express = require('express')
const app = express()
const port = 3000



//testing templating engine



//gunakan ejs
app.set('view engine','ejs')


app.get('/', (req, res) => {
  
  //dengan ejs.each akan diloop sebanyak jumlah array dari mahasiswa kebetulan isi array ada 3 object
 
//Kondisi data KOSONG 
  // const mahasiswa =[]

//Kondisi data ADA
  const mahasiswa =[{
namaMHS: 'Mahasiswa A',
emailMHS: 'A@email.com'

  },
  {
    namaMHS: 'Mahasiswa B',
    emailMHS: 'B@email.com'
    
      },
      {
        namaMHS: 'Mahasiswa C',
        emailMHS: 'C@email.com'
        
          }

]
  
  
//halama di html semua variablenya dicreate di dalam res.render sehingga dapat diolah dengan lebih mudah saat ingin menampilkan data berulang di page html
  res.render('index',{
    nama:'roy naldo nathaniel',
    title:'Halaman Home',
    mahasiswa: mahasiswa
  })//dengan method ini sudah cukup untuk memanggil file di folder views,tak perlu menetukan folder root
  // res.sendFile('./index.html',{root: __dirname})  

})

app.get('/about', (req, res) => {
  res.render('about')
    // res.sendFile('./about.html',{root: __dirname})  
  })

  app.get('/contact', (req, res) => {
    res.render('contact')
    // res.sendFile('./contact.html',{root: __dirname}) 
  })

  app.get('/product/:idProd',(req,res)=>{ //cara ngambil 20 dan categorynya dengan req query

    res.send(`Product ID :${req.params.idProd} <br> Category ID : ${req.query.category}`)
})





  app.use('/', (req, res) => {
    res.status(404)
    res.send('<H1>404</H1>')
    
  })  
 




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})