import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login/login';
import HomePage from './Pages/Homepage/homepage';
import '../src/scss/fonts.scss'
import 'bootstrap/dist/css/bootstrap.css'
import CreateProduct from './Pages/CreateProduct/CreateProduct';
import ProductList from './Pages/Products/ProductList';
function App() {
  return (

    <div>
    <CreateProduct></CreateProduct>
    <ProductList></ProductList>
    </div>
  
  );
}

export default App;
