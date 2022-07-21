import axios from 'axios';
// import {useState} from 'react';
import { useEffect } from 'react';
import './App.css';
import Form from './components/Form';


function App() {
  // const [name, setName] = useState();
  // 2 -const [password, setPassword] = useState();
  //  2 -function cadastrarUsuario(e) {
  //   e.preventDefault();
  //   console.log(name, password);
  // }

  // 3 - const array = ['value1', 'value2', 'value3'];
  //  4- const arrayObject = [{id: 1, name: 'Micah'}, {id:2, name:'João'}, {id:3, name:'Marcos'}]
  async function setup(){
    try {
      const {data} = await axios.get('https://swapi.dev/api/people/1/');
      console.log(data);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect( () => {
    setup()
  }, [])
  return (
    <div>
      {/*  1 -<form onSubmit={cadastrarUsuario}>
        <div>
          <input type="text" placeholder='Digite seu nome' onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <input type="submit" value="Alterar nome" />
        </div>
      </form> */}
      {/* <Form name={name} setName={setName}/> */}
      {/* {name && `Meu nome é ${name}`} */}

      {/* 3- {array.map((item, i) => (
        <p key={i}>{item}</p>
      ))} */}

      {/* 4 - {arrayObject.map( item => (
        <p key={item.id}>{item.name}</p>
      ))} */}
    </div>
  );
}

export default App;
