import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Outlet, Link } from "react-router";
import Home from './pages/Home'
import Cart from './pages/Cart'
import Shop from './pages/Shop'

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const handleAddToCart = (product, amount) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if(existing) {
        return prevItems.map((item) => 
          item.id === product.id
            ? {...item, quantity: item.quantity + amount}
            : item
        );
      }
      return [...prevItems, {...product, quantity: amount}];
    })
  }
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return {
            ...item,
            quantity: newQuantity > 1 ? newQuantity : 1, // 1개 밑으로는 안 내려가게 방어
          };
        }
        return item;
      })
    );
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return(
    <div>
      <nav>
        <Link to="/">Home </Link>
        <Link to="shop">Shop </Link>
        <Link to="cart">Cart ({totalCount})</Link>
      </nav>
      <hr />
      <Outlet context={{ cartItems, handleAddToCart, handleRemoveItem, handleQuantityChange }} />
    </div>
  );
}