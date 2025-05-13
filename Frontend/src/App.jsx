import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Pages/Login';
import About from './Pages/About';
import Signup from './Pages/Signup';
import Body from './Components/Body';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Body />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<h1>There is No Route</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
