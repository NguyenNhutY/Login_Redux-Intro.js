
import Login from './components/Login';
import Logout from './components/Logout';
import {selectUser} from './features/userSlice';
import {useSelector} from "react-redux";

const App = ()  => {
  const user = useSelector(selectUser);
  return (
    <div>

      {user ? <Logout/> : <Login/>}
    </div>
  );
}

export default App;
