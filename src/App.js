
import './App.css';
import Header from './components/Header/Header';
import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Books from "./components/Book/Books";
import {Routes} from "react-router";
import BookEdit from "./components/BookEdit/BookEdit";
import BookAdd from "./components/BookAdd/BookAdd"
import CategoriesList from "./components/CategoriesList/CategoriesList";



function App() {

    return (
        <Router>
          <Header/>
          <main>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Books/>}/>
                    <Route path='/categories' element={<CategoriesList/>}/>
                    <Route path='/books' element={<Books/>}/>
                    <Route path='/books/edit/:id' element={<BookEdit/>}/>
                    <Route path='/books/add' element={<BookAdd/>}/>
                </Routes>
            </div>
          </main>
        </Router>
    );

  }

export default App;
