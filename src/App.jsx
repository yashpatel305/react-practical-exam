import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Pages
import Hero from "./pages/Hero.jsx";
import About from "./pages/About.jsx";
import RecipeList from "./pages/RecipeList.jsx";
import RecipeForm from "./pages/RecipeForm.jsx";
import Footer from "./pages/Footer.jsx";

// Auth
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Recipe Details & Edit
import RecipeDetails from "./components/RecipeDetails.jsx";
import EditRecipe from "./components/EditRecipe.jsx";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <RecipeForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <EditRecipe />
                </PrivateRoute>
              }
            />
            <Route
              path="/recipes/:id/edit"
              element={
                <PrivateRoute>
                  <EditRecipe />
                </PrivateRoute>
              }
            />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;