
import { useSelector } from "react-redux";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import MainHeader from "./components/MainHeader"
import LoginSign from "./components/Auth/LoginSign";
function App() {

  const login = useSelector((state) => state.auth.token);
  return (
    <Router>
      <Routes>
        <Route path="/" element = {login ? <MainHeader/> : <LoginSign/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
