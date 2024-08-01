// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme } from "./utils/theme";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import styled, { ThemeConsumer, ThemeProvider } from "styled-components";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import FoodListingPage from "./pages/FoodListingPage";
import ProductDetails from "./pages/ProductDetails";
import FoodDetails from "./pages/FoodDetails";

const Container = styled.div``;

function App() {
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar setOpenAuth={setOpenAuth} openAuth={openAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dishes" exact element={<FoodListingPage />} />
            <Route path="/dishes/:id" exact element={<FoodDetails />} />
          </Routes>
          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
