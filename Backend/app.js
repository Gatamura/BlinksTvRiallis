const express = require('express')
const app = express();         
const bodyParser = require('body-parser');
const port = 8080; //porta padrão
const mysql = require('mysql');

// CORS
app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });


//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

//CONECTA COM O BANCO

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gabriel00",
    database: "react"
  });


  connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');
  })


//GET NO /CLIENTES

router.get('/clientes', (req, res) => {
     return execSQLQuery('SELECT * FROM react', res);
})

router.post('/tabela', (req, res) => {

    var postData = req.body;
    var nome = postData.nome;
    var email = postData.email;
    var senha = postData.senha;
    var tempo = postData.tempo;

        if(nome != null && email != null && senha != null){
          
          connection.query('INSERT INTO react (nome,email,senha) VALUES (?, ?, ?)',[nome,email, senha], function (error, results, fields){
              if(error) return console.log(error);
              console.log(`O Registro ${nome} com email ${email} e a senha ${senha} foi adicionado com sucesso!`);
              // connection.end();
          });
        } else {
          connection.query("DELETE FROM react WHERE id > 0",function(){
            console.log('Apagamos todos os ids!')
          })
          
        }
        
        return execSQLQuery('SELECT * FROM react', res);
            

});

function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gabriel00",
    database: "react"
  });
 
  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}

