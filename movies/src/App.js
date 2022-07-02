import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favorite from './Components/Favorite';

function App() {
  return (
    <>
      <Navbar/>
      {/* <Banner/>
      <Movies/> */}
      <Favorite/>
    </>
  );
}

export default App;
