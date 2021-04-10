import { BrowserRouter as Router, Route } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import TestScreen from "./screens/TestScreen";
import Footer from "./components/Footer";
import ActivateScreen from "./screens/ActivateScreen";
import EditCouncilScreen from "./screens/EditCouncilScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Screen404 from "./components/Screen404";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <AdminRoute exact path="/admin/users" component={UserListScreen} />
        <AdminRoute
          exact
          path="/council/:id/edit"
          component={EditCouncilScreen}
        />
        <PrivateRoute exact path="/dashboard" component={DashboardScreen} />
        <PrivateRoute
          exact
          path="/auth/activate/:token"
          component={ActivateScreen}
        />
        <PrivateRoute exact path="/profile" component={ProfileScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/test" component={TestScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
