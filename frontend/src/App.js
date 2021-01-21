import { BrowserRouter as Router, Route } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/dashboard" component={DashboardScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/" component={LoginScreen} />
      </Router>
    </>
  );
};

export default App;
