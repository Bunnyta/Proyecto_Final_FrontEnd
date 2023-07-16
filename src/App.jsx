import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import Context from "./context/context.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./views/Home.jsx";
import Courses from "./views/Courses";
// import Course from "./views/Course.jsx";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import Profile from "./views/Profile.jsx";
import Pizza from "./views/course.jsx";

import Cart from "./views/Cart.jsx";
import Payment from "./views/Payment.jsx";
import NotFound from "./views/NotFound.jsx";

import { formatPrice } from "./utils/utils.js";

function App() {
  
  const { user } = useContext(AuthContext);
  if(user === null) return <p> Cargando ... </p>

  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const itemIndex = cart.findIndex((pizza) => pizza.id === item.id);
    const updateCart = [...cart];

    if (itemIndex === -1) {
      const pizza = {
        id: item.id,
        count: 1,
        price: item.price,
        img: item.img,
        name: item.name,
      };

      updateCart.push(pizza);
    } else {
      updateCart[itemIndex].count += 1;
    }

    setCart(updateCart);
  };

  const removeFromCart = (item) => {
    const itemIndex = cart.findIndex((pizza) => pizza.id === item.id);
    const updateCart = [...cart];

    updateCart[itemIndex].count -= 1;

    if (updateCart[itemIndex].count <= 0) {
      updateCart.splice(itemIndex, 1);
    }

    setCart(updateCart);
  };

  const cartTotal = () => {
    let total = 0;
    cart.forEach((item) => (total += item.count * item.price));

    return formatPrice(total);
  };

  useEffect(() => {
    fetch("/pizzas.json")
      .then((res) => res.json())
      .then((json) => setMenu(json))
      .then((error) => console.log(error));
  }, []);

  const globalState = { menu, cart, addToCart, removeFromCart, cartTotal };

  return (
    <div className="App">
     
      <Context.Provider value={globalState}>        
          <BrowserRouter>
            <Navbar></Navbar>

            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/courses" element={<Courses />}></Route>
              {/* <Route path="/courses/:id" element={<Course />}></Route> */}
              <Route path='/pizza/:id' element={<Pizza />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/profile" element={user ? <Profile/> : <Navigate to="/login"/> }></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/pagar" element={<Payment />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>

            <Footer></Footer>
          </BrowserRouter>
        
      </Context.Provider>
      
    </div>
  );
}

export default App;
