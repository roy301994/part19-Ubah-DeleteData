const http=require('http')

// http.createServer([options][, requestListener])


//request listiner bisa dipanggil  sebagai variable atau panggil menggunakan function,kita pilih panggil menggunakan function
//request listener akan menerima 2 parameter request(req) dan respon(res)
//req:apa yg dikirimkan ke server
//res:apa yg dikembalikan sebagai respon oleh web server
//untuk menjalankan server kita panggil sebuah method yg namanya listen
http.createServer(()=>{} )