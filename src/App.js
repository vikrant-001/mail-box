
import { useSelector } from "react-redux";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import MainHeader from "./components/MainHeader"
import LoginSign from "./components/Auth/LoginSign";
import SentMail from "./components/Mail/SentMail";
import DetailsView from "./components/Mail/DetailsView";
function App() {

  const login = useSelector((state) => state.auth.token);
  return (
    <Router>
      <Routes>
        <Route path="/" element = {login ? <MainHeader/> : <LoginSign/>}>
        <Route path="/mailDetails" element ={<DetailsView/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
