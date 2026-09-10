import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ShopPage from "./pages/ShopPage";
import ExperiencePage from "./pages/ExperiencePage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import CreateProductPage from "./components/Admin/CreateProductPage";
import EducationalManagement from "./components/Admin/EducationalManagement";
import PromotionsManagement from "./components/Admin/PromotionsManagement";
import AgeGate from "./components/Common/AgeGate";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import JournalPage from "./pages/JournalPage";
import JournalPostPage from "./pages/JournalPostPage";


const App = () => {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  useEffect(() => {
    const confirmed = sessionStorage.getItem("ageConfirmed");
    if (confirmed === "true") setAgeConfirmed(true);
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem("ageConfirmed", "true");
    setAgeConfirmed(true);
  };

  return (
    <Provider store={store}>
      {!ageConfirmed && <AgeGate onConfirm={handleConfirm} />}
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collections/:collection" element={<CollectionPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
            <Route path="our-space" element={<ShopPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
<Route path="/journal" element={<JournalPage />} />
<Route path="/journal/:slug" element={<JournalPostPage />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/create" element={<CreateProductPage />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="educational" element={<EducationalManagement />} />
            <Route path="promotions" element={<PromotionsManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;