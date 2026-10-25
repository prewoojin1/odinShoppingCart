import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Outlet, Link } from "react-router";
import Home from './pages/Home'
import Cart from './pages/Cart'
import Shop from './pages/Shop'

export default function App() {
  return(
    <div>
      <nav>
        <Link to="/">Home </Link>
        <Link to="shop">Shop </Link>
        <Link to="cart">Cart </Link>
      </nav>
      <hr />
      <Outlet/>
    </div>
  );
}