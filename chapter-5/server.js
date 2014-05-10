// モジュールの依存先
var application_root = __dirname;
var express = require('express'); // Webフレームワーク
var path = require('path'); // パス関連のユーティリティ
var mongoose = require('mongoose'); // MongoDBと統合します

// サーバを作成します
var app = express();

// サーバを設定します
app.configure(function() {
    // リクエストの本文を解析してrequest.bodyにセットします
    app.use(express.bodyParser());

    // リクエストのオーバーライドのためにrequest.bodyをチェックします
    app.use(express.methodOverride());

    // URLとリクエスト形式の組に基づいてルートを取得します
    app.use(app.router);

    // 静的コンテンツが置かれた場所を示します
    app.use(express.static(path.join(application_root, 'site')));

    // 開発中にはすべてのエラーを表示します
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// サーバを開始します
var port = 4711;
app.listen(port, function() {
    console.log('Expressサーバがポート %d で起動しました。モード: %s', port, app.settings.env);
});

// ルート
app.get('/api', function(request, response) {
    response.send('ライブラリのAPIを利用可能です');
});

// 指定されたIDを持つ本を返します
app.get('/api/books/:id', function(request, response) {
    return BookModel.findById(request.params.id, function(err, book) {
        if(!err) {
            return response.send(book);
        } else {
            return console.log(err);
        }
    });
});

// すべての本のリストを返します
app.get('/api/books', function(request, response) {
    return BookModel.find(function(err, books) {
        if(!err) {
            return response.send(books);
        } else {
            return console.log(err);
        }
    });
});

// 本を追加します
app.post('/api/books', function(request, response) {
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate
    });
    book.save(function(err) {
        if (!err) {
            return console.log('追加されました');
        } else {
            return console.log(err);
        }
    });
    return response.send(book);
});

// データベースに接続します
mongoose.connect('mongodb://localhost/library_databese');

// スキーマ
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date
});

// モデル
var BookModel = mongoose.model('Book', Book);
