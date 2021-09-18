//file contact adalah file yg berhubungan dengan pengelolaan data contact

const fs = require("fs");

//1.Untuk mengecek sebuah file atau directory ada ga di filesystem kita,kalau ga ada maka auto create folder
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//2. membuat file contact .json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

//3.template pertanyaan
//membuat function membaca contact.json,dibuat abstraksi kedalam function karena digunakan berulang ulang

//(ambil semua data di contact.json)
const loadData = () => {
  const dataBuffer = fs.readFileSync("data/contacts.json"); //read file berfungsi untuk buka file 
  const dataJson = JSON.parse(dataBuffer); //data buffer yg sudah dibuka lalu diparse jadi json lalu dimasukkan ke folder dataJson
  return dataJson; //lalu datajson dikirim,sehigga nanti isi dari variable contact yg ada di app js adalah dataJson yg sudah format json
};

//4.mencari detail contact dari loadData
//(cari kontak berdarsarkan nama di contact.json)

const findContact = (nama) => {
  const detailcontactnama = loadData().find(
    (answer) => answer.nama.toLowerCase() === nama.toLowerCase()
  );

  return detailcontactnama;
};

//ada 2 fungsi untuk add Contact,kenapa dipisah karena fungsi 1 akan digunakan kembali untuk hapus dan ubah contact
//fungsi 1 :menimpa file contact.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts)); //sebelumnya dataJson adalah object  ubah jadi string melalui method JSON.stringify
  //habis itu timpa ke file contact.json
  //kebalikan dari JSON.stringify adalah JSON.parse mengubah dari string ke object
};

//fungsi2 :menambah contact baru kedalam array,yg arraynya nanti akan ditimpa di fungsi ke 2
const addContact = (contact) => {
  //gunanya kita buat paramater contact sebagai variable penampung,kalau sudah ditampung bisa diolah
  const contacts = loadData();
  contacts.push(contact);
  //baru panggil disini fungsi 1 biar otomatis nimpa
  //setelah data contacts tertambah oleh data contact yg baru ,barulah di masukkan ke fungsi saveContact untuk menimpa dan mengganti data contact lama yang ada di file contacts.json
  saveContacts(contacts);
};

//check nama duplicated contacts

const checkDuplicateContact = (nama) => {
  const contacts = loadData();
  return contacts.find((contact) => contact.nama === nama);
};

//find itu untuk menelusuri ketika ketemu satu selesai

module.exports = { loadData, findContact, addContact, checkDuplicateContact };
//hanya loadData saja karena datapath dan dirpath tidak akan dikirim untuk digunakan di app.js

//kondisi diawal adalah data/contacts.json tidak ada tapi karena file loadData di panggil di file app.js dan kita nodemon start yang mana menjalankan node appnya
//maka otomatis langsung create folder data dan file contact.json saat nodemon start dijalankan

//kenapa saveContact tidak dieksport karena hanya dipake dihalaman ini saja di line 62 di fungsi addContact jadi tidak perlu dieksport
