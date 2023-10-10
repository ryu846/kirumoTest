//モジュールのインポート
const http = require('http');
const express = require('express');

const mysql = require('mysql');

//expressオブジェクトの生成
const app = express();

//mysql接続情報
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kirumo'
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

app.post("/trying", function(req, res){
    
    return res.send("カード読み取り成功 IDm:");
});

app.post("/signup", function(req, res){
    
    return res.send("新規登録 IDm:");
});

//サーバの設定
const server = http.createServer(app);
server.listen(3000);