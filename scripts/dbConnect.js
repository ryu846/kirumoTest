exports.func = function() {
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
          console.log(results);
        //   res.render('hello.ejs');
        }
      );
};


