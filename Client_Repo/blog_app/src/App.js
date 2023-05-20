import './App.css';
import React from 'react';
import {Route , Routes} from "react-router-dom"
import MainLayout from './MainLayout';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import {UserContextProvider}  from './UserContext';
import CreateNewPost from './Pages/CreateNewPost';
import  SinglePostPage from "./Pages/SinglePostPage";
import EditSinglePostPage from './Pages/EditSinglePostPage';

function App() {
  return (
      <Routes>

        <Route path='/' element={<MainLayout/>}>
          <Route index element={<IndexPage />}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/createNewPost' element={<CreateNewPost/>}/>
          <Route path='/post/:id' element={<SinglePostPage/>}/>
          <Route path='/edit/:id' element={<EditSinglePostPage/>}/>
        </Route>

      </Routes>
  );
}

export default App;
