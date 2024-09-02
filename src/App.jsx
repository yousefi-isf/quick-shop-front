import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './components/Authentication.jsx';
import Auth from './routes/Auth.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import Product from './routes/Product.jsx';
import Blog from './routes/Blog.jsx';

function App() {
  let { pathname } = useLocation();
  return (
    <>
      <AuthProvider>
        {pathname !== '/auth' && <Header />}
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product/:product_slug" element={<Product />} />
        </Routes>
        {pathname !== '/auth' && <Footer />}
      </AuthProvider>
    </>
  );
}

export default App;
