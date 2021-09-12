

// http.createServer([options][, requestListener])
//menggunakan modul core node js untuk membuat web server nama modulnya http
//http.createServer([options][, requestListener])

//request listiner bisa dipanggil  sebagai variable atau panggil menggunakan function,kita pilih panggil menggunakan function
//request listener akan menerima 2 parameter request(req) dan respon(res)
//req:apa yg dikirimkan ke server
//res:apa yg dikembalikan sebagai respon oleh web server
//untuk menjalankan server kita panggil sebuah method yg namanya listen
// http.createServer((req,res)=>{} )

//---------------------------------

// const server = http.createServer((req,res)=>{

// })


// res.write('hello world!') //respon web menampilkan hello world

// server.listen(3000,()=>{
//     console.log('server is listening on port 3000')
// }) //core modul http dibuat ke variable baru dijalankan servernya dengan method listen

//---------------------------------

const http=require('http')
const port=10002
const fs=require('fs')


const renderHTML=(path,res)=>{
    fs.readFile(path,(err,data)=>{ //method membaca isi file 
        if (err){
            res.writeHead(404)
            res.write('error file not found')
            
        } else {
            res.write(data)//perintah didalam server sudah selesai
         }
         res.end()
        })
    }



http
    .createServer((req,res)=>{  //create server
        //membuat sistem routing
        res.writeHead(200,{   //mengubah dari plain text ke html
            'Content-Type': 'text/html',
        })
        const url=req.url  //apapun yg dikembalikan dari request ambil urlnya  
        // console.log(url) //mengecheck url yg kita input di web browser
        
        

        switch (url) {
            case '/about':
                renderHTML('./about.html',res)
                break;
                case '/contact':
                    renderHTML('./contact.html',res)
                    break;
                    default:
                        renderHTML('./index.html',res)
                            break;
        }

        
        
        
        
        
        
        
        // if (url==='/about'){
        //     renderHTML('./about.html',res)
        // }else if (url==='/contact'){
        //         renderHTML('./contact.html',res)
        //     }else{ 
        //             renderHTML('./index.html',res)

        //         }
    }) 
    .listen(port,()=>{             //menjalankan server
            console.log(`server is listening on port ${port}..`)
    })
