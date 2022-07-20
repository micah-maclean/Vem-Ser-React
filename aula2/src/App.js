import './App.css';
import Header from './components/HeaderFooter/Header';
import Home from './components/Home/Home';
import Contato from './components/Contato/Contato';
import Footer from './components/HeaderFooter/Footer';
import Sobre from './components/Sobre/Sobre';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Contato/> */}
      <Home/>
      {/* <Sobre/> */}
      <Footer/>
    </div>
  );
}

export default App;
