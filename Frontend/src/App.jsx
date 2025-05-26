import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './Components/Body';
import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import Signup from './Pages/Signup';



const App = () => {
  return (


    <Router>
      <Routes>
        <Route path='/' element={<Body />}>
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<h1>There is No Route</h1>} />
        </Route>
      </Routes>

    </Router>

  );
};

export default App;
