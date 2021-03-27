import { BrowserRouter as Router, Route } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import TestScreen from "./screens/TestScreen";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Route exact path="/admin/users" component={UserListScreen} />
        <Route exact path="/dashboard" component={DashboardScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/profile" component={ProfileScreen} />
        <Route exact path="/test" component={TestScreen} />
        <Route exact path="/" component={LoginScreen} />
      </Router>
      <Footer />
    </div>
  );
};

export default App;
