import { BrowserRouter as Router, Route } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/admin/users" component={UserListScreen} />
        <Route exact path="/dashboard" component={DashboardScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/profile" component={ProfileScreen} />
        <Route exact path="/" component={LoginScreen} />
      </Router>
    </>
  );
};

export default App;
