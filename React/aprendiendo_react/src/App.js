import React, { Component } from 'react';
import './App.css';
import './Components/Productos/RegistroProductos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginButton } from './Components/Login/Login';
import Productos from './Components/Productos/RegistroProductos';




class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

 
render() {

  return (

    <div className="App">

      <h1>Aplicación Registro de Ventas</h1>
      
       {/*<LoginButton />*/}
        <Productos />
      
    </div>
  );
}
}
export default App;
