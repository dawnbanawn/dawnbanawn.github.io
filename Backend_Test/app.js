const sqlite = require('sqlite3').verbose();
const axios = require('axios');
let sql;

//connect to db
const db = new sqlite.Database('./test.db', sqlite.OPEN_READWRITE,(err) => {
    if(err) console.error(err);
});

//create table
// sql = 'CREATE TABLE users(ID INTEGER PRIMARY KEY, username, first_name, last_name, email, birthday, country)';
// db.run(sql);

//Get data
async function getData(url){
    try{
        const {data} = await axios.get(url);
        console.log(data);
        //const keys = Object.keys(data)
        data.forEach(d =>{
            //console.log(d);
            let userData = {
                username: d.username, 
                first_name: d.first_name, 
                last_name: d.last_name, 
                email: d.email, 
                birthday: d.date_of_birth, 
                city: d.first_name
            };
            //console.log(keys);
            sql = 'INSERT INTO users(username, first_name, last_name, email, birthday, country) VALUES (?,?,?,?,?,?)';
            db.run(sql, [userData.username, userData.first_name, userData.last_name, userData.email, userData.birthday, userData.city], (err) => {
                if(err){
                    console.error(err) 
                } else { console.log("success")};
            });
        });
    } catch (error) {
        console.log(error)
    }
}
//getData("https://random-data-api.com/api/users/random_user?size=20")

function sendData() {
    sql = 'SELECT * FROM users';
    //let users = db.all(sql);
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err);        
        } else {
            rows.forEach(row => {
                console.log(row);
            })
        }
    });
}
sendData();