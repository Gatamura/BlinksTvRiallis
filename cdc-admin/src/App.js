import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './componentes/inputCustomizado'
import SubmitCustomizado from './componentes/submitCustomizado'

class App extends Component {

  constructor(){
    super();
    this.state = {lista : [], nome: '', email: '', senha: '', tempo: ''};
    this.setNome = this.setNome.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setSenha = this.setSenha.bind(this)
    this.setTempo = this.setTempo.bind(this)
    this.tempo = this.state.tempo
    this.limpaFormulario = this.limpaFormulario

  }

  componentDidMount(){

    $.get('http://localhost:8080/clientes', function(resposta){
    console.log(resposta)
      this.setState({lista: resposta })
    }.bind(this)) 
  }

  enviaForm(evento){

    evento.preventDefault()
    
    $.post('http://localhost:8080/tabela', {nome:this.state.nome, email:this.state.email, senha:this.state.senha}, function(resposta){
      
      this.setState({lista:resposta})

      

  }.bind(this))

  let teste = document.createElement('span');

    teste.textContent = this.state.tempo 
  
  var testeInt = parseInt(teste.textContent)
  
  
  var counter = testeInt
 
  $('#nome').focus()

  var setInterval1 = setInterval(function(){

    $('#nome').val('')
    $('#email').val('')
    $('#senha').val('')
    $('#tempo').val('')
  
    if(counter > 0){
      counter += - 1
  
      $("#counter").text(counter);
    } else if ( counter === 0 ) {


      $.post('http://localhost:8080/tabela', {tempo: counter}, function(data){
        console.log(data)
      })

      $( "#aloalo" ).empty();
      
      $("#counter").text('Acabou')
      clearInterval(setInterval1)
      console.log('rolando')
    }

 
  },1000)
  
}


setNome(evento){
  this.setState({nome: evento.target.value})
}

setEmail(evento){
  this.setState({email: evento.target.value})
}

setSenha(evento){

  this.setState({senha: evento.target.value})
}
setTempo(evento){

  this.setState({tempo: evento.target.value})
}




  render() {
    return (
      <div id="layout">

    <a href="#menu" id="menuLink" className="menu-link">
 
        <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="">CDC</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="" className="pure-menu-link">Autor</a></li>
                <li className="pure-menu-item"><a href="" className="pure-menu-link">Livro</a></li>
             </ul>
        </div>
    </div>

    <div id="main">
    <div className="header">
      <h1>Riallis blinkstv</h1>
    </div>
    <div className="content" id="content">
      <div className="pure-form pure-form-aligned">
        <form id="formulario" className="pure-form pure-form-aligned" onSubmit={ this.enviaForm.bind(this) } method="post">
          
        <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"></InputCustomizado>
        <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"></InputCustomizado>
        <InputCustomizado id="senha" type="text" name="senha" value={this.state.senha} onChange={this.setSenha} label="Mensagem"></InputCustomizado>
        <InputCustomizado id="tempo" type="number" name="tempo" value={this.state.tempo} onChange={this.setTempo} label="Tempo"></InputCustomizado>

        <SubmitCustomizado type="submit" className="pure-button pure-button-primary" label="gravar"></SubmitCustomizado>
                                 

        </form>             

      </div>  
      <div>
        <strong></strong>    
        
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>email</th>
              <th>senha</th>
              <th>Tempo</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.lista.map(function(resposta){
                return (
                  <tr id='aloalo' key={resposta.id}>
                    <td>{resposta.nome}</td>
                    <td>{resposta.email}</td>
                    <td>{resposta.senha}</td>
                    <td id="counter"></td>
                  </tr>
                );
              })
            }
            
          </tbody>
        </table> 
      </div>             
    </div>
  </div>            

<script>
  
</script>
</div>     
    );
  }
}

export default App;
