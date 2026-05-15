// import Products from "./Component/Products/Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./MainLayout/Layout";
import Products from "./Component/Products/Products";
import ProductDetailes from "./Component/ProductDetailes/ProductDetailes";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import NotFoundPage from "./Component/NotFoundPage/NotFoundPage";
import { ToastContainer } from "react-toastify";
import StoreContextProvider from "./Component/Context/StoreContext";
import Cart from "./Component/Cart/Cart";
import CheckOut from "./Component/CheckOut/CheckOut";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import CategoriePage from "./Component/Categories/CategoriePage";
import WishList from "./Component/WishList/WishList";
export default function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        { path: "product-detailes/:id", element: <ProductDetailes /> },
        { path: "categoriesPage/:id", element: <CategoriePage /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>
    </>
  );
}
