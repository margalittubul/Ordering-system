import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import Root from './Componnets/Root';
import Signin from './Componnets/signin';
import Profile from './Componnets/profile';
//מנהל
import HomeMeneger from './Componnets/maneger/homeMeneger';
import UsersPage from './Componnets/maneger/UsersPage';
import ActiveOrdersPage from './Componnets/maneger/ActiveOrdersPage';
import AllOrdersPage from './Componnets/maneger/AllOrdersPage';
import Order from './Componnets/maneger/order';
import AddUser from './Componnets/maneger/addUser';
//ספקים
import LoginProvider from './Componnets/loginProvider';
import HomeProvider from './Componnets/providers/homeProvider';
import ProvidersPage from './Componnets/maneger/ProvidersPage';
import ProductsPage from './Componnets/maneger/ProductsPage';
import AddProductPage from './Componnets/providers/AddProductPage';
import ProviderOrdersPage from './Componnets/providers/ProviderOrdersPage';
import MyProduct from './Componnets/providers/my-product';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <Signin /> },
        {path: '/profile', element: <Profile />},

        //מנהל
        { path: '/HomeMeneger', element: <HomeMeneger /> },
        { path: '/users', element: <UsersPage /> },
        { path: '/active-orders', element: <ActiveOrdersPage /> },
        { path: '/orders', element: <AllOrdersPage /> },
        { path: '/order', element: <Order/>},
        { path: '/add-user', element: <AddUser/>},
        //ספקים
        { path:'/loginProvider', element:<LoginProvider />},
        { path: '/HomeProvider', element: <HomeProvider /> },
        { path: '/providers', element: <ProvidersPage /> },
        { path: '/products', element: <ProductsPage /> },
        { path: '/add-product', element: <AddProductPage /> },
        { path: '/ProviderOrdersPage', element: <ProviderOrdersPage /> },
        { path: '/my-product',element:<MyProduct/>},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
