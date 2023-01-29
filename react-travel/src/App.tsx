import styles from "./App.module.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { SignIn } from "./pages/signIn";
import { Register } from "./pages/register";
import { TravelDetails } from "./pages/travelDetails";
import { SearchPage } from "./pages/search";
import { ShoppingCart } from "./pages/shoppingCart";
import { Navigate } from "react-router-dom";
import { useSelector, useAppDispatch } from "./redux/hooks";
import { fetchShoppingCartList } from "./redux/shoppingCart/slice";

const PrivateRouter = ({ children }) => {
  const jwt = useSelector((state) => state.signIn.token);
  return jwt ? children : <Navigate to={"/signIn"} />;
};

function App() {
  const dispatch = useAppDispatch();
  const token = useSelector((state) => state.signIn.token);

  useEffect(() => {
    token && dispatch(fetchShoppingCartList(token));
  }, [token]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details/:travelId" element={<TravelDetails />} />
          <Route path="/search/:keywords" element={<SearchPage />} />
          <Route
            path="/shoppingCart"
            element={
              <PrivateRouter>
                <ShoppingCart />
              </PrivateRouter>
            }
          />
          <Route path="*" element={<h1>404 Not Found !</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
