import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import Home from "./components/home";
import CreateUser from "./components/create-user.component";
import Guest_FeedBack from "./components/Guest_FeedBack";
import Highlight_Activities from "./components/Highlight_Activities";
import Rooms from "./components/Rooms";
import Vacation_Ideas from "./components/Vacation_Ideas";
import Additional_Info from "./components/additional_Info";
import Print_info from "./components/print_info"
import Additional_info_user from "./components/additional_info_user";
import User_reserve_info from "./components/user_reserve_info";
import Add_inf from "./components/add_inf";
import Online_Payment from "./components/online_payment";


import Voucher from "./components/voucher";
import Goods from "./components/goods";
import GoodsCategory from "./components/GoodsCategory";
import Reports from "./components/reports";

/*
import './files/css/bootstrap.min.css';
import './files/css/core.css';
import './files/css/style.css';
import './files/css/responsive.css';
import './files/css/style-customizer.css';
import './files/css/shortcode/shortcodes.css';
*/
import './files/css/open-iconic-bootstrap.min.css';
import './files/css/animate.css';
import './files/css/owl.carousel.min.css';
import './files/css/owl.theme.default.min.css';
import './files/css/magnific-popup.css';
import './files/css/aos.css';
import './files/css/ionicons.min.css';
import './files/css/bootstrap-datepicker.css';
import './files/css/jquery.timepicker.css';
import './files/css/flaticon.css';
import './files/css/icomoon.css';
function App() {

  
  return (
    <Router>

     
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Route path="/Home" component={Home} />
      <Route path="/Guest_FeedBack" component={Guest_FeedBack} />
      <Route path="/Highlight_Activities" component={Highlight_Activities} />
      <Route path="/Rooms" component={Rooms} />
      <Route path="/Vacation_Ideas" component={Vacation_Ideas} />
      <Route path="/Additional_Info" component={Additional_Info} />
      <Route path="/Online_Payment" component={Online_Payment} />
      <Route path="/Print_info/:name/:email/:phone_no/:address/:nationality/:mode/:reservation_code/:in_check/:out_check/:room/:guest" component={Print_info} />
      <Route path="/Additional_info_user/:room/:check_in/:check_out/:guest" component={Additional_info_user} />
      <Route path="/User_reserve_info/:room/:check_in/:check_out/:guest" component={User_reserve_info} />
      <Route path="/Add_inf/:room/:check_in/:check_out/:guest" component={Add_inf} />
      <Route path="/Voucher" component={Voucher} />
      <Route path="/Goods" component={Goods} />
      <Route path="/GoodsCategory" component={GoodsCategory} />
      <Route path="/Reports" component={Reports} />
     
     
    </Router>
  );
}

export default App;
