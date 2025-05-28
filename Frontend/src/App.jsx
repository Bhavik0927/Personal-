import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './Components/Body';
import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { Provider } from 'react-redux';
import store from './Store/Store';
import AddBlogCard from './Components/AddBlogCard';
import Myblogs from './Pages/Myblogs';



const App = () => {
  return (

    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/home' element={<Home />} />
            <Route path='/card' element={<AddBlogCard />} />
            <Route path='/myblogs' element={<Myblogs />} />
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
