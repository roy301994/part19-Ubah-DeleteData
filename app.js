const express = require('express')
const app = express()
const port = 3000
const {loadData,findContact,addContact,checkDuplicateContact}=require('./util/contacts')
const { body, validationResult ,check} = require('express-validator');
const session=require('express-session')
const cookieParser=require('cookie-parser')
const flash=require('connect-flash')



//konfigurasi flash

app.use(cookieParser('secret'))
app.use(
  session({
  cookie: { maxAge: 6000 },
  secret: 'secret cat',
  resave: false,
  saveUninitialized: true,
  })
)

app.use(flash())










//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))//data yg dikirim masih undifined harus diparsing

//menggunakan ejs
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

    const contactsA=loadData()//kita sudah buat methodnya loadData dimana load data akan membaca kontak yg kita buat 
    // console.log(contacts) //diconsole datanya sudah keluar sekarang kita kirim ke view biar keluar diweb kalau di console hanya keluar di terminal saja
    res.render('contact',{
      contactsB:contactsA, //diubah ke object
      msg:req.flash('msg')  //karena ditampilak di halaman contact maka kita edit juga di ejs contact if msg ada dan else nya
    })
    // res.sendFile('./contact.html',{root: __dirname}) 
  })

//proses data contact
app.post('/contact',[
  body('nama').custom((value)=>{
    const duplicate=checkDuplicateContact(value)
    if (duplicate) {
      throw new Error('This name is already taken')
    }
    return true //fungsi validasi dengan return true artinya valuenya lolos validasi


  }),
  check('email','Your email is not valid').isEmail(),
  check('noHP','Your phone number is not valid').isMobilePhone('id-ID'),//'noHP' mengikuti dari parameter di noHP pada add-contact ejs dibagian "name" line 24
],(req,res)=>{
  const errors = validationResult(req)//dengan validation result dapat mengeluarkan pesan error
  if (!errors.isEmpty()) {//kalau error tidak kosong maka return errornya
    // return res.status(400).json({ errors: errors.array() });
    res.render('add-contact',{  //error akan dikirim ke halaman add-contact di ejs
      title : 'Form Add Data Contact',
      errors: errors.array(), //kalau error tidak ada maka errors akan berisi undifined
    })
  } else {
// console.log(req.body)//ditampilkan diterminal
// res.send(req.body)//ditampilkan di web
addContact(req.body)

//sebelum redirect kirim flash message dulu
req.flash('msg','Data has added successfully !')
//kalau sudah di set message nya lanjut untuk tangkap messagenya dihalaman contact

res.redirect('/contact')//redirect akan membawa ke route app.get dan langsung load seluruh list contact
  }
  



})//app.post untuk menerima data add contact




  
//halaman form tambah data contact


app.get('/contact/add',(req,res)=>{
  res.render('add-contact')
})






//halaman detail contact
//route untuk detail,yg diatas contact tanpa param yg dibawah contact dengan param
  app.get('/contact/:nama', (req, res) => {
//mencari kontak yg spesific sesuai dengan nama yg dikirim
    const contactC=findContact(req.params.nama)//kita tidak pake method loadData karena load data menampilkan seluruh data all
    //"detailcontactnama" dari file contact.js akan masuk menjadi variable contactC
    res.render('detail',{ //'detail' maksudnya data yang kita dapat dari findcontact akan dikirim ke file'detail'ejs,fungsinya untuk mengkondeksikan file ejs dengan route,knp perlu di koneksikan karena file ejs yang menampikan data diweb
      contactD:contactC  //data yg akan dikirim nantinya adalah contactD
    })
   
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