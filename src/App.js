import logo from './logo.svg';
import './App.css';
import Home from './Page/Home/Home';
import HomeMobile from './Page/Home/HomeMobile';
import HeaderComponent from './Component/HeaderComponent';
import './Util/css/style.css';
import {Router, Switch, Route} from 'react-router-dom';
import { HomeHeaderTemplate } from './Template/HomeHeaderTemplate/HomeHeaderTemplate';
import {createBrowserHistory} from 'history'; 
import Login from './Page/Login/Login';
import Register from './Page/Register/Register';
import FilmInfo from './Page/Film/FilmInfo';
import "animate.css";
import TicketRoom from './Page/TicketRoom/TicketRoom';
import Profile from './Page/Profile/Profile';
import Admin from './Page/Admin/Admin';
import {AdminTemplate} from './Template/AdminTemplate';
import Films from './Page/Home/Films/Films';
import AdminFilms from './Page/Admin/AdminFilms/AdminFilms';
import AdminUser from './Page/Admin/User/AdminUser';
import AdminShowtimes from './Page/Admin/AdminShowtimes/AdminShowtimes';
import AdminAddNew from './Page/Admin/AdminAddNew/AdminAddNew';
import AdminFilmEdit from './Page/Admin/AdminFilms/AdminFilmEdit';
import AdminAddUser from './Page/Admin/User/AdminAddUser';
import AdminChangeUser from './Page/Admin/User/AdminChangeUser';

export const history = createBrowserHistory();

function App() {
  return (

    <div className="App">
      <Router history={history}>
        <Switch>
          <HomeHeaderTemplate exact path="/home" component={Home} componentMobile={HomeMobile}/>
          <HomeHeaderTemplate exact path="/detail/:id" component={FilmInfo} componentMobile={FilmInfo}/>
          <HomeHeaderTemplate exact path="/login" component={Login}/>
          <HomeHeaderTemplate exact path="/register" component={Register}/>
          <HomeHeaderTemplate exact path="/ticketroom/:id" component={TicketRoom} componentMobile={TicketRoom}/>
          <HomeHeaderTemplate exact path="/profile" component={Profile} componentMobile={Profile}/>
          <HomeHeaderTemplate exact path="/" component={Home} componentMobile={HomeMobile}/>
          <AdminTemplate exact path="/admin/films" component={AdminFilms}/>
          <AdminTemplate exact path="/admin/filmsEdit/:id" component={AdminFilmEdit}/>
          <AdminTemplate exact path="/admin/user" component={AdminUser}/>
          <AdminTemplate exact path="/admin/addUser" component={AdminAddUser}/>
          <AdminTemplate exact path="/admin/changeUser/:id" component={AdminChangeUser}/>
          <AdminTemplate exact path="/admin/showtimes" component={AdminShowtimes}/>
          <AdminTemplate exact path="/admin/addnew" component={AdminAddNew}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
