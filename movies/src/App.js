import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favorite from './Components/Favorite';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
          <Navbar/>
        <Routes>
          <Route path='/' 
          element={<><Banner/><Movies/></>}>
          </Route>
          <Route path='/favorites' element={<Favorite/>}></Route>
          {/* <Banner/>
          <Movies/> 
          <Favorite/>*/}
        </Routes>
      </Router>
    </>
  );
}

export default App;
