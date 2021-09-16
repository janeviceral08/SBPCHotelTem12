import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Exercise = props => (
  <div>
         <p className="bottom-area d-flex">
    							<span><i className="icon-building-o"></i> {props.exercise.room_type}</span> 
    							<span className="ml-auto"><a href="#">{props.exercise.vacant}</a></span>
    						</p>
                                <br />
  </div>
)
const detail = (vacant)=>{
return vacant;
}


export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {
        exercises: [], 
        online: [], 
        setShow: false,
        ID: "",
        name: "",
        email: "",
        phone_no: "",
        address: "",
        nationality: "",
        mode: "",
        reservation_code: "",
        incheck: "",
        outcheck: "",
        room: "",
        guest: "",
        part: "",
        upload_files: null,
    
    };
  }

  componentDidMount() {
    
    const hotel = {  val: 'project='+localStorage.getItem('hotel_id').slice(5), }
    console.log('hotel: ', hotel)
   axios.post('https://gloreto.herokuapp.com/room_type/', hotel)
	.then(response => {
	  this.setState({ exercises: response.data })
      console.log('response.data: ', response.data)
	})
	.catch((error) => {
	  console.log(error);
	})
   
    axios.post('https://gloreto.herokuapp.com/reservation/reserve/', hotel)
	.then(response => {
	  this.setState({ online: response.data })
      console.log('online.data: ', response.data)
	})
	.catch((error) => {
	  console.log(error);
	})


  }

  
	onChangeInputFile(event) {

  console.log('upload: ', event.target.files[0])

  const formData = new FormData();
  
  formData.append('file', event.target.files[0]);
  formData.append('upload_present', 'kusinahanglan');

  const options = {
    method: 'POST',
    body: formData,
  }

 return fetch('https://api.cloudinary.com/v1_1/kusinahanglan/image/upload',  {
  method: 'POST',
  body: formData,
})
 .then(res => res.json())
  .then(res => {console.log('cloud res: ', res)})
  .catch(error => {
    console.log('error', error.response)
})
 // .then(res => {
 //   this.setState({
 //     imageUrl: res.secure_url,
  //    imageAlt: `An image of ${res.original_filename}`
 //   })
 // })
 // .catch(err => console.log(err))





	};
  deleteExercise(id) {
    axios.delete('https://gloreto.herokuapp.com/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }
  handleClose(){
    this.setState({setShow: false})
       } 
       handleShow (currentexercise){
        this.setState({
            setShow: true,
            ID: currentexercise._id,
            name: currentexercise.name,
            email: currentexercise.email,
            phone_no: currentexercise.phone_no,
            address: currentexercise.address,
            nationality: currentexercise.nationality,
            mode: currentexercise.mode,
            reservation_code: currentexercise.reservation_code,
            incheck: currentexercise.in_check,
            outcheck: currentexercise.out_check,
            room: currentexercise.room,
            guest: currentexercise.guest,
            part: currentexercise._partition,})
           } 


  render() {

    return (
      <body class="hold-transition skin-blue sidebar-mini">
      <div class="wrapper">
      
        <header class="main-header">
          <a href="index2.html" class="logo">
            <span class="logo-mini"><b>M</b>O</span>
            <span class="logo-lg"><b>MEMO</b>order</span>
          </a>
          <nav class="navbar navbar-static-top">
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
      
            <div class="navbar-custom-menu">
              <ul class="nav navbar-nav">
                <li class="dropdown user user-menu">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <img src="dist/img/<?php echo $icon; ?>" class="user-image" alt="User Image"/>
                    <span class="hidden-xs">Name Here</span>
                  </a>
                  <ul class="dropdown-menu">
                    <li class="user-header">
                      <img src="dist/img/<?php echo $icon; ?>" class="img-circle" alt="User Image"/>
      
                      <p> Name Here  <br/> Position
                        <small>Office</small>
                      </p>
                    </li>
                    <li class="user-footer">
                      <div class="pull-left">
                        <a href="profile.php" class="btn btn-default btn-flat">My Profile</a>
                      </div>
                      <div class="pull-right">
                        <a href="logout.php" onclick="return confirm('Are you sure you want to logout?')" class="btn btn-default btn-flat">Logout</a>
                      </div>
                    </li>
                  </ul>
                </li>
               
              </ul>
            </div>
          </nav>
        </header>
        <aside class="main-sidebar">
          <section class="sidebar">
            <div class="user-panel">
              <div class="pull-left image">
                <img src="dist/img/<?php echo $icon; ?>" class="img-circle" alt="User Image"/>
              </div>
              <div class="pull-left info">
                <p>Full name</p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
              </div>
            </div>
          
   
            <ul class="sidebar-menu">
              <li class="header">MAIN NAVIGATION</li>
              <li class="treeview active">
                <a href="dashboard.php">
                  <i class="fa fa-user"></i> <span>Users</span>
                      <span class="pull-right-container">
                        <small class="label pull-right bg-red">12</small>
                        <small class="label pull-right bg-green">4</small>
                      </span>
                </a>
              </li>
              <li class="treeview">
                <a href="profile.php">
                  <i class="fa fa-user"></i> <span>My Profile</span>
                </a>
              </li>
            </ul>
          </section>
        </aside>
      
        <div class="content-wrapper">
          <section class="content-header">
            <h1>
              User Registrations
            </h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">User Registrations</li>
              time here
            </ol>
          </section>
      
          <section class="content">
            <div class="row">
              <div class="col-xs-12">
                <div class="box">
                  <div class="box-body">
                    <table id="example1" class="table table-bordered table-striped">
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Sex</th>
                        <th>Contact Number</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Is Active?</th>
                        <th>Expiration</th>
                        <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                                    <td><p>sample</p></td>
                                    <td><p>sample</p></td>
                                    <td><p>sample</p></td>
                                    <td><p>sample</p></td>
                                    <td><p>sample</p></td>
                                    <td><p>sample</p></td>
                                    <td><p>sample</p></td>
                                    <td><i class='fa fa-times-circle text-red' title='Account has expired.'></i></td>
                                    <td><p>sample</p></td>
                                    <td><a href='renew_exec.php?id=".$rows["user_id"]."'  onclick='return confirm(`Are you sure to renew selected account? Validity of account will be extended by 6 months.`)'><i class='fa fa-refresh text-green' title='Renew'></i></a></td>
                                </tr>
               
                      </tbody>
                      
                    </table>
                  </div>
                 
                </div>
              
              </div>
            
            </div>
         
          </section>
        
        </div>
        
        <footer class="main-footer">
          <div class="pull-right hidden-xs">
            <b>Version</b> 2.3.8
          </div>
          <strong>Copyright &copy; 2019 <a href="http://csucc.carsu.edu.ph/" target="_blank">CSUCC Mobile-based Memorandum Order</a>.</strong> All rights
          reserved.
        </footer>
      
      
      </div>
   
      </body>
    )
  }
}