import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import About from './Pages/About';
import Signup from './Pages/Signup';
import Body from './Components/Body';
import Store from './Store/Store';
import { Provider } from 'react-redux';


const App = () => {
  return (

    <Provider store={Store}>
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
    </Provider>
  );
};

export default App;
