
import { Link } from 'react-router-dom'
import logo from '../assets/react.svg';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 border-top">
      <div className="container">
        <div className="row gy-4 align-items-start">
          {/* Brand + tagline */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="d-flex align-items-center fs-4 fw-bold mb-2">
               Recipe<span className="text-success">Vault</span>
            </div>
            <p className="mb-2">
              Join <b>RecipeVault</b> now and embark on a culinary journey to explore, create, and savor amazing recipes!
            </p>
            <p className="small text-secondary mb-0">&copy; 2025 RecipeVault. All rights reserved.</p>
          </div>
          {/* Company */}
          <div className="col-6 col-md-2">
            <h6 className="text-uppercase fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><Link className="text-light text-decoration-none footer-link-hover" to="/">Home</Link></li>
              <li><Link className="text-light text-decoration-none footer-link-hover" to="/about">About us</Link></li>
              <li><Link className="text-light text-decoration-none footer-link-hover" to="/recipes">Recipes</Link></li>
              <li><Link className="text-light text-decoration-none footer-link-hover" to="/add">Recipes Form</Link></li>
            </ul>
          </div>
          {/* Recipes */}
          <div className="col-6 col-md-2">
            <h6 className="text-uppercase fw-bold mb-3">Recipes</h6>
            <ul className="list-unstyled">
              <li><a className="text-light text-decoration-none footer-link-hover" href="#">Appetizers</a></li>
              <li><a className="text-light text-decoration-none footer-link-hover" href="#">Main Courses</a></li>
              <li><a className="text-light text-decoration-none footer-link-hover" href="#">Deserts & Sweets</a></li>
              <li><a className="text-light text-decoration-none footer-link-hover" href="#">International Flavors</a></li>
            </ul>
          </div>
          {/* Contact / Social */}
          <div className="col-12 col-md-4">
            <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
            <ul className="list-inline mb-3">
              <li className="list-inline-item"><Link className="text-light text-decoration-none footer-link-hover" to="https://github.com/yashpatel305">Github</Link></li>
              <li className="list-inline-item"><a className="text-light text-decoration-none footer-link-hover" href="#">Facebook</a></li>
              <li className="list-inline-item"><a className="text-light text-decoration-none footer-link-hover" href="#">Twitter</a></li>
              <li className="list-inline-item"><Link className="text-light text-decoration-none footer-link-hover" to="https://www.linkedin.com/in/yash-patel-205694316/">Linkedin</Link></li>
            </ul>
            <form className="d-flex gap-2" aria-label="Signup for newsletter">
              <input
                id="flz-email"
                name="email"
                type="email"
                className="form-control form-control-sm"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
              <button type="submit" className="btn btn-success btn-sm">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer