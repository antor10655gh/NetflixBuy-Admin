import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./pages/Users";
import Products from "./pages/Products";
import CallHistory from "./pages/CallHistory";
import SingleProfile from "./components/shared/profile/SingleProfile";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import PaymentDetails from "./pages/PaymentDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <div className="App">
      {user ? (
        <Switch>
          <Main>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/billing" component={Billing} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/paymentDetails" component={PaymentDetails} />
            <Route exact path="/add_products" component={AddProduct} />
            <Route exact path="/edit_products/:id" component={EditProduct} />
            <Route exact path="/profile/:id" component={SingleProfile} />
            <Route exact path="/call_history/:id" component={CallHistory} />
            <Redirect from="*" to="/dashboard" />
          </Main>
        </Switch>
      ) : (
        <Switch>
          <Route path="/sign-in" exact component={SignIn} />
          <Redirect from="*" to="/sign-in" />
        </Switch>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
