//モジュールのインポート
const http = require('http');
const express = require('express');

const mysql = require('mysql');
const bodyParser = require('body-parser');

//expressオブジェクトの生成
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

//mysql接続情報
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Kirumo'
  });

  //mysql 接続失敗時エラー
  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
  });

//getでリクエスト時に処理するコールバック関数指定
app.get("/", function(req, res){
    //トップページ → ICカードの読み込み → データに応じて遷移先を変更
    //登録済み→POST./trying 未登録→POST./signup
    return res.send("<a href='#'>Hello World!!</a>");
});


app.get("/mysql", function(req, res){
  //GET?~~~
  //GETで取得したカードIDが、データベース上に存在するかを返す
  //存在する場合  　→1を返す ＋ ユーザの詳細情報を返す
  //存在しないばあい→0を返す
  connection.query(
      'SELECT * FROM users',
      (error, results) => {
        console.log(results);
        return res.send("<a href='#'>Hello World!!</a>"+results);
      //   res.render('hello.ejs');
      }
    );
  
});

// 顧客情報登録
app.post("/signup", function(req, res){

  // データ受け取り
  const gender = req.body.gender;
  const color = req.body.color;
  const c_size = req.body.c_size;
  const s_size = req.body.s_size;
  
  connection.query(
    // データベースに登録
    'INSERT INTO user_info (gender,color,clothes_size,shoes_size) VALUE ("'+ gender +'","'+ color +'","'+ c_size +'","'+ s_size +'");',
    (error, results) => {
      console.log(results);
      return res.send("<a href='#'>Hello World!!</a>"+results);
    //   res.render('hello.ejs');
    }
  );
});

// タスク登録
app.post("/task", function(req, res){

  // データ受け取り
  const store_id = req.body.store_id;
  const room_id = req.body.room_id;
  const task = req.body.task;

  console.log(store_id)
  console.log(room_id)
  console.log(task)
  
  connection.query(
    // データベースに登録
    'INSERT INTO store_tasks (store_id,room_id,task_description) VALUE ("'+ store_id +'","'+ room_id +'",\''+ task +'\');',
    (error, results) => {
      console.log(results);
      return res.send("<a href='#'>Hello World!!</a>"+results);
    //   res.render('hello.ejs');
    }
  );
});

app.get("/form", function(req, res){
    
      res.render('form.ejs');
});

app.get("/task", function(req, res){
    
  res.render('task.ejs');
});

//サーバの設定
const server = http.createServer(app);
server.listen(3000);