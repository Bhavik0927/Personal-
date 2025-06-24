import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './Components/Body';
import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { Provider } from 'react-redux';
import store from './Store/Store';
import AddBlogCard from './Components/AddBlogCard';
import EditBlog from './Pages/EditBlog';
import { lazy, Suspense } from 'react';

const EditProfile = lazy(() => import('./Pages/EditProfile'));
const Myblogs = lazy(() => import('./Pages/Myblogs'));
const SaveBlogs = lazy(() => import('./Pages/SaveBlogs'));
const FullBlog = lazy(() => import('./Pages/FullBlog'));

const App = () => {
  return (

    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/' element={<Home />} />
              <Route path='/card' element={<AddBlogCard />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/myblogs' element={<Myblogs />} />
              <Route path='/editblog/:id' element={<EditBlog />} />
              <Route path='/saveblogs'  element={<SaveBlogs />} />
              <Route path='/:username/:slug/:id' element={<FullBlog />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='*' element={<h1>There is No Route</h1>} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>

  );
};

export default App;
