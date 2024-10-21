import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './components/Authentication.jsx';
import { useAuth } from './components/Authentication.jsx';
import Auth from './routes/Auth.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import Product from './routes/Product.jsx';
import Blog from './routes/Blog.jsx';
import Cart from './routes/Cart';
import Shipping from './routes/Shipping.jsx';
import Profile from './routes/Profile.jsx';
import Orders from './routes/Orders.jsx';
import Coins from './routes/Coins.jsx';
import Info from './routes/Info.jsx';
import OrderDetails from './routes/OrderDetails.jsx';
import TrackOrdersDet from './routes/admin/TrackOrdersDet.jsx';
import TrackOrders from './routes/admin/TrackOrders.jsx';
import ManCategories from './routes/admin/ManCategories.jsx';
import ManProducts from './routes/admin/ManProducts.jsx';
import ManUsers from './routes/admin/ManUsers.jsx';
import ManProductDet from './routes/admin/ManProductDet.jsx';
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="orders" element={<Orders />}>
              <Route path=":order_number" element={<OrderDetails />} />
            </Route>
            <Route path="coins" element={<Coins />} />
            <Route path="track-orders" element={<TrackOrders />}>
              <Route path=":order_number" element={<TrackOrdersDet />} />
            </Route>
            <Route path="manage-users" element={<ManUsers />} />
            <Route path="manage-products" element={<ManProducts />}>
              <Route path=":product_id" element={<ManProductDet />}></Route>
            </Route>
            {/* <Route path="manage-categories" element={<ManCategories />} /> */}
            <Route path="info" element={<Info />} />
          </Route>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/:product_slug/:product_name" element={<Product />} />
        </Routes>
        {pathname !== '/auth' && <Footer />}
      </AuthProvider>
    </>
  );
}

export default App;
