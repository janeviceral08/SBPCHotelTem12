import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"
import bg1 from "../files/images/bg_1.jpg"
import destination1 from "../files/images/destination-1.jpg"
import destination21 from "../files/images/destination-2-1.jpg"
import destination3 from "../files/images/destination-3.jpg"
import about from "../files/images/about.jpg"
import destination2 from "../files/images/destination-2.jpg"
import destination4 from "../files/images/destination-4.jpg"
import hotel1 from "../files/images/hotel-1.jpg"
import hotel2 from "../files/images/hotel-2.jpg"
import hotel3 from "../files/images/hotel-3.jpg"
import hotel4 from "../files/images/hotel-4.jpg"
import hotel5 from "../files/images/hotel-5.jpg"
import person1 from "../files/images/person_1.jpg"
import person2 from "../files/images/person_2.jpg"
import person3 from "../files/images/person_3.jpg"
import restaurant1 from "../files/images/restaurant-1.jpg"
import restaurant2 from "../files/images/restaurant-2.jpg"
import restaurant3 from "../files/images/restaurant-3.jpg"
import restaurant4 from "../files/images/restaurant-4.jpg"
import image1 from "../files/images/image_1.jpg"
import image2 from "../files/images/image_2.jpg"
import image3 from "../files/images/image_3.jpg"
import { Card } from 'react-bootstrap';

import moment from "moment";
import cogoToast from 'cogo-toast';

import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
const Exercise = props => (
<div className="col-sm col-md-2 col-lg-3">
    				<div className="destination">
					<ImageGallery items={props.exercise.img.map(({original, thumbnail}) => ({original, thumbnail }))}  defaultImage="http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg" 
                                    infinite={true}
                                    showBullets={true}
                                    showFullscreenButton={true}
                                    showPlayButton={true}
                                    showThumbnails={true}
                                    showIndex={true}
                                    showNav={true}
                                    thumbnailPosition={'right'}
                                    slideDuration={450}
                                    slideInterval={2000}
                                    slideOnThumbnailOver={true}
                                    additionalClass="app-image-gallery"
                                    useWindowKeyDown={true}/>
    					<div className="text p-3">
    						<div className="d-flex">
    							<div className="one">
		    						<h3><a href="#">{props.exercise.room_type}</a></h3>
		    						
	    						</div>
	    						<div className="two">
	    							<span className="price per-price">₱{props.exercise.rate_mode == "Daily"? currencyFormat(parseFloat(props.exercise.roomprice)): props.exercise.rate_mode == "Promo" && props.exercise.duration_mode == 'Daily'?currencyFormat(parseFloat(props.exercise.roomprice)):props.exercise.rate_mode == "Promo" && props.exercise.duration_mode == 'Hour'?currencyFormat(parseFloat(props.exercise.roomprice)):currencyFormat(parseFloat(props.exercise.roomprice_hour))}<br/><small>{props.exercise.rate_mode == "Daily"? '/night': props.exercise.rate_mode == "Promo" && props.exercise.duration_mode == 'Daily'?"("+props.exercise.promo_duration+"nights)":props.exercise.rate_mode == "Promo" && props.exercise.duration_mode == 'Hour'?"/"+props.exercise.promo_duration+"hours": "/"+props.exercise.hour_duration+"hours"}</small></span>
    							</div>
    						</div>
    						<p>{'Far far away, behind the word mountains, far from the countries'}</p>
    						<hr/>
    						<p className="bottom-area d-flex">
    							<span>Good for {props.exercise.max_person}</span> 
    							<span className="ml-auto"><a href="#">Reserve</a></span>
    						</p>
    					</div>
    				</div>
    			</div>
    			
)

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {
		Hotel_Information: '',
        Name_of_Hotel: '',
        map_address: '',
        email: '',
        mobile: '',
        tel_no: '',
        website: '',
        address: '',
        hotel_city: '',
        title: '',
        subtitles: '',
        link: '',
		header_image: '',
		header_text: '',
		header_subtext: '',
        background_image: '',
		hotel_image: "",
		exercises: [],
		activities: [],
		vacation:[],
		feedback: [],
		open: false,
		spands: false,
		guest: "", check_out: "", check_in: "", room: ""};

	this.select = this.select.bind(this);
  }

  componentDidMount() {
	const hotel = {  val: "project=6127126cae94bc64a5e4b23a", }
	axios.post('http://localhost:5000/room_type/', hotel)
	.then(response => {
	  this.setState({ exercises: response.data })
	})
	.catch((error) => {
	  console.log(error);
	})

	axios.post('http://localhost:5000/highlight/View_Highlight/', hotel)
	.then(response => {
	  this.setState({ activities: response.data })
	})
	.catch((error) => {
	  console.log(error);
	})
	axios.post('http://localhost:5000/feedback/View_Feedback/', hotel)
    .then(response => {
      this.setState({ feedback: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
	axios.post('http://localhost:5000/vacation/View_vacation/', hotel)
	.then(response => {
	  this.setState({ vacation: response.data })
	})
	.catch((error) => {
	  console.log(error);
	})
	axios.post('http://localhost:5000/additional_info/View_Additional_Info/', hotel)
	.then(response => {
	  this.setState({ 
		  Hotel_Information: response.data.hotel_info,
		   Name_of_Hotel: response.data.hotel_name,
		   map_address:response.data.map_address,
		  email: response.data.email,
		  mobile:response.data.mobile,
		  tel_no:response.data.tel_no,
		  website:response.data.website,
		  address:response.data.address,
		  hotel_city: response.data.hotel_city,
		  hotel_image: response.data.hotel_image,
		  header_image: response.data.header_image,
		header_text: response.data.header_text,
		header_subtext: response.data.header_subtext,
		  })
	}) 
	.catch((error) => {
	  console.log(error);
	})
  }

  select= event => {

    this.setState({
		[event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
	  
    const { room, check_in, check_out, guest } = this.state;
	const found = this.state.exercises.find(element => element.temp_id === room);
if( guest !== "" && check_out!== "" && check_in!== "" && room!== ""){
	this.props.history.push('/add_inf/'+room+'/'+check_in+'/'+check_out+'/'+guest)
}
   else{
	cogoToast.error("Please Complete the fields");
   }
};

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
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

  onLogin = event => {
	cogoToast.loading('Please wait a moment...', { hideAfter: 1000 });
    const { username, password } = this.state;

    const exercise = {
        username,
	    password
      }
    axios.post('http://localhost:5000/admin/logins', exercise)
    .then(response =>
{        localStorage.setItem('hotel_id', response.data._partition)
        this.props.history.push('/')}
        ).catch(function (error) {
            cogoToast.error('Invalid Email or Password')
        console.log('error',error);
      })
    
    //this.props.history.push('/Admin')
console.log('pressed: ', username, password )
};

handleOpenspands= () => {

    this.setState({spands:!this.state.spands});
  };
  handlespands = () => {
    this.setState({spands: false});
  };
handleOpen = () => {

    this.setState({open:true});
  };
  
   handleClose = () => {
    this.setState({open: false});
  };
  render() {
	var myloop = [];
	for (let i = 1; i < 10; i++) {
		myloop.push(
		
		  <option value={i} key={i}>{i}</option>
		);
	  }
	  const { room, check_in, check_out, guest } = this.state;
	  const book = 'http://localhost:3000/Website_reserve?check_in='+check_in+'&&check_out='+check_out+'&&guest='+guest+'&&room='+room+'&&hotel='+"project=6127126cae94bc64a5e4b23a";
    return (
      
<body>
<Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.open}>
          <div style={{ backgroundColor: 'white',
    border: '2px solid #000',
    padding:40,
  width: '40%',
  marginTop: '10%',
marginLeft: '30%'
    
    }} class="col-xl-12">
        <p>User Name</p>
        <TextField id="outlined-basic" label="User Name" variant="outlined" style={{width: '100%'}} name="username" onChange={this.select} />
        <p>Password</p>
        <TextField id="outlined-basic" label="Password" variant="outlined" style={{width: '100%'}} name="password" onChange={this.select} />
        <br /><br />
     <div style={{alignSelf: 'center'}}>
	
                                        <button type="submit" className="form-control btn btn-primary" onClick={this.onLogin} >Login</button>
           </div>                       
        </div>

        </Fade>
      </Modal>

	  <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div className="container">
	      <a className="navbar-brand" >{this.state.Name_of_Hotel}</a>
		  {window.innerWidth < 992?
		   <a className="navbar-brand btn btn-primary" onClick={this.handleOpen}>Login</a>        
                         
                      :null
                    }
		 
                          

	     

	      <div className="collapse navbar-collapse" id="ftco-nav">
	        <ul className="navbar-nav ml-auto">
	          <li className="nav-item active"><Link to="/Home"  className="nav-link">Home</Link></li>
	          <li className="nav-item"><Link to="/Home"  className="nav-link">About</Link></li>
	          <li className="nav-item"><a  className="nav-link">Rooms</a></li>
	          <li className="nav-item"><a  className="nav-link">Contact</a></li>
			  <li className="nav-item"><a onClick={this.handleOpen}  className="nav-link">Login</a></li>
	        </ul>
			
	      </div>
		  
	    </div>
	
	  </nav>
	  
    <div className="hero-wrap js-fullheight" style={{ backgroundImage: `url(${this.state.header_image})`, height: '100vh', backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
}}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-start" style={{ height: '100vh'}}>
          <div className="col-md-9 mb-5 pb-5 text-center text-md-left" >
            <h1 className="mb-4" >{this.state.header_text}</h1>
            <p>{this.state.header_subtext}</p>
          </div>
        </div>
      </div>
    </div>

    <section className="ftco-section justify-content-end ftco-search">
    	<div className="container-wrap ml-auto">
    		<div className="row no-gutters">
          
          <div className="col-md-12 tab-wrap">
            
            <div className="tab-content p-4 px-5" id="v-pills-tabContent">

              <div className="tab-pane fade show active" id="v-pills-2" role="tabpanel" aria-labelledby="v-pills-performance-tab">
              	<form action="#" className="search-destination" onSubmit={this.onSubmit}>
              		<div className="row">
                  <div className="col-md align-items-end">
				  <div className="col-md align-items-end">
              				<div className="form-group">
              					<label for="#" style={{color: 'black'}}>Room Type</label>
              					<div className="form-field">
	              					<div className="select-wrap">
			                      <div className="icon"><span className="ion-ios-arrow-down"></span></div>
			                      <select name="room" id="" className="form-control"  onChange={this.select}>
									  {this.state.exercises.map((currentexercise) => 
										  <option value={currentexercise.temp_id}>{currentexercise.room_type}</option>
									  )

									  }
			                      	
			                      </select>
			                    </div>
					              </div>
				              </div>
              			</div>
              			</div>
              			<div className="col-md align-items-end">
              				<div className="form-group">
              					<label for="#">Check In</label>
              					<div className="form-field">
	              					<div className="icon"><span className="icon-map-marker"></span></div>
					                <input type="date" className="form-control checkin_date" placeholder="Check In" name="check_in" onChange={this.select}/>
					              </div>
				              </div>
              			</div>
              			<div className="col-md align-items-end">
              				<div className="form-group">
              					<label for="#">Check Out</label>
              					<div className="form-field">
	              					<div className="icon"><span className="icon-map-marker"></span></div>
					                <input type="date" className="form-control checkout_date" placeholder="From" name="check_out" onChange={this.select}/>
					              </div>
				              </div>
              			</div>
              			<div className="col-md align-items-end">
              				<div className="form-group">
              					<label for="#">Guest</label>
              					<div className="form-field">
	              					<div className="select-wrap">
			                      <div className="icon"><span className="ion-ios-arrow-down"></span></div>
			                      <select name="guest" className="form-control" onChange={this.select}>
								  {myloop}
			                      </select>
			                    </div>
					              </div>
				              </div>
              			</div>
              			<div className="col-md align-self-end">
              				<div className="form-group">
              					<div className="form-field">
								  <a class="form-control btn btn-primary" href={book}> Book A Reservation</a>
					               
					              </div>
				              </div>
              			</div>
              		</div>
              	</form>
              </div>
            </div>
          </div>
        </div>
    	</div>
    </section>

    <section className="ftco-section bg-light">
    	<div className="container">
    		<div className="row">
				{this.state.activities.map((info, index)=>
				<div className="col-md-4" key={index}>
				<div className="intro">
					<h3><span>{index+1}</span> {info.title}</h3>
					<p>{info.description}</p>
				</div>
			</div>
				
				)}
    			
    			
    		</div>
    	</div>
    </section>

    <section className="ftco-section">
    	<div className="container">
    		<div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section text-center">
            <h2 className="mb-4">See our latest vacation ideas</h2>
          </div>
        </div>
        <div className="row">
			{this.state.vacation.map((info,index)=>
			<div className="col-md-4" key={index}>
			<a href="#" className="destination-entry img" style={{ backgroundImage: `url(${info.image_url})`}}>
				<div className="text text-center">
					<h3>{info.title}</h3>
				</div>
			</a>
		</div>
			)}
        	
        	
        </div>
    	</div>
    </section>
		
		<section className="ftco-about d-md-flex">
    	<div className="one-half img" style={{ backgroundImage: `url(${this.state.hotel_image})`, backgroundColor: 'gray'}}></div>
    	<div className="one-half">
        <div className="heading-section">
          <h2 className="mb-4">{this.state.Name_of_Hotel}</h2>
        </div>
        <div>
  				<p>{this.state.Hotel_Information}</p>
  			</div>
    	</div>
    </section>

  



    <section className="ftco-section">
    	<div className="container">
				<div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section text-center  ">
            <h2 className="mb-4"><strong>Rooms</strong> Available</h2>
          </div>
        </div>    		
    	</div>
    	<div className="container-fluid">
    		<div className="row">
			{ this.exerciseList() }
    		</div>
    	</div>
    </section>

    <section className="ftco-section">
    	<div className="container">
				<div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section text-center  ">
            <h2 className="mb-4">Guest Feedback</h2>
          </div>
        </div>    		
    		<div className="row">
				{this.state.feedback.map((info,index)=>
				
			   
				<div className="col-md-6 col-lg-3" key={index}>
				<div className="destination">
				<Card>
				<Card.Body>
				<div className="text p-3">
						<h3><a href="#">{info.name}</a></h3>
						{info.rate == 1 ?
						<p className="rate">
						<i className="icon-star"></i>
						<i className="icon-star-o"></i>
						<i className="icon-star-o"></i>
						<i className="icon-star-o"></i>
						<i className="icon-star-o"></i>
						<span>{info.rate} Rating</span>
					</p>
						:
						info.rate == 2 ?
						<p className="rate">
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<i className="icon-star-o"></i>
							<i className="icon-star-o"></i>
							<i className="icon-star-o"></i>
							<span>{info.rate} Rating</span>
						</p>
					:
					info.rate == 3 ?
					<p className="rate">
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<i className="icon-star-o"></i>
							<i className="icon-star-o"></i>
							<span>{info.rate} Rating</span>
						</p>
					:
					info.rate == 4 ?
					<p className="rate">
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<i className="icon-star-o"></i>
							<span>{info.rate} Rating</span>
						</p>
					:
					<p className="rate">
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<span>{info.rate} Rating</span>
						</p>}
						
						<p>Far far away, behind the word mountains, far from the countries</p>
						<hr/>
						<p className="bottom-area d-flex">
							<span><i className="icon-map-o"></i> {info.address}</span> 
						
						</p>
					</div>
				</Card.Body>
			  </Card>
					
				</div>
			</div>
				)}
    		</div>
    	</div>
    </section>



    <footer className="ftco-footer ftco-bg-dark ftco-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">{this.state.Name_of_Hotel}</h2>
              <p>{this.state.Hotel_Information}</p>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                <li className=" "><a href="#"><span className="icon-twitter"></span></a></li>
                <li className=" "><a href="#"><span className="icon-facebook"></span></a></li>
                <li className=" "><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
            </div>
          </div>
       
          <div className="col-md">
             <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Experience</h2>
              <ul className="list-unstyled">
                <li><a href="#" className="py-2 d-block">Home</a></li>
                <li><a href="#" className="py-2 d-block">About</a></li>
                <li><a href="#" className="py-2 d-block">Rooms</a></li>
                <li><a href="#" className="py-2 d-block">Contact</a></li>
                <li><a href="#" className="py-2 d-block">Login</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
            	<h2 className="ftco-heading-2">Have a Questions?</h2>
            	<div className="block-23 mb-3">
	              <ul>
	                <li><span className="icon icon-map-marker"></span><span className="text">{this.state.address}</span></li>
	                <li><a href="#"><span className="icon icon-phone"></span><span className="text">{this.state.tel_no} / {this.state.mobile}</span></a></li>
	                <li><a href="#"><span className="icon icon-envelope"></span><span className="text">{this.state.emai}</span></a></li>
	              </ul>
				  <iframe src={this.state.map_address} width="100%" height="270" style={{border:0}} allowfullscreen=""></iframe> 
	            </div>
            </div>
          </div>
        </div>
        <div className="row">
         
        </div>
      </div>
    </footer>
    

  


  
    
  </body>
    )
  }
}