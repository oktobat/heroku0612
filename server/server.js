const express = require('express')          // 웹서버 생성
const mysql = require('mysql')  
const bodyParser = require('body-parser')   // 요청정보 처리
const cors = require('cors')                // 교차출처 리소스 공유

const app = express()
app.use(express.json());

const PORT = process.env.port || 8008
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const db = mysql.createConnection({
   host:'co28d739i4m2sb7j.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user:'qi2ggl8he9krtrh9',
    password:'rc815ouadhi2a71b',
    database:'brtw9yrikmdwlhez',
    port:3306
})
db.connect()

app.use(express.static('build'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'./build/index.html')
})

app.post('/join', (req, res)=>{
    const username = req.body.username
    const userid = req.body.userid
    const userpw = req.body.userpw
    const gender = req.body.gender
    db.query("INSERT INTO members (username, userid, userpw, gender) VALUES (?, ?, ?, ?)", [username, userid, userpw, gender], (err, result)=>{ 
        if (err) {
            throw err
        } else {
            res.send(result)
        }
    })
})

app.post('/idcheck', (req, res)=>{
    const userid = req.body.userid
    db.query("SELECT * FROM members WHERE userid=?", [userid], (err, result)=>{
        if (err){
            throw err
        } else {
            res.send(result)
        }
    })
})

app.post('/login', (req, res)=>{
    const userid = req.body.userid
    const userpw = req.body.userpw
    db.query("SELECT * FROM members WHERE userid=? and userpw=?", [userid, userpw], (err, result)=>{
        if (err){
            throw err
        } else {
            res.send(result)
        }
    })
})

app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))
