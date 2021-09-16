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
import LinesEllipsis from 'react-lines-ellipsis'



const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
const Exercise = props => (
<div className="col-sm col-md-2 col-lg">
    				<div className="destination">
    					<a href="#" className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${hotel1})`}}>
    						
    					</a>
    					<div className="text p-3">
    						<div className="d-flex">
    							<div className="one">
		    						<h3><a href="#">{props.exercise.room_type}</a></h3>
		    						
	    						</div>
	    						<div className="two">
	    							<span className="price per-price">₱{props.exercise.rate_mode == "Daily"? currencyFormat(parseFloat(props.exercise.roomprice)): props.exercise.rate_mode == "Promo" && props.exercise.duration_mode == 'Daily'?currencyFormat(parseFloat(props.exercise.roomprice)):props.exercise.rate_mode == "Promo" && props.exercise.duration_mode == 'Hour'?currencyFormat(parseFloat(props.exercise.roomprice)):currencyFormat(parseFloat(props.exercise.roomprice_hour))}<br/><small>{props.exercise.rate_mode == "Daily"? '/night': props.exercise.rate_mode == "Promo" && props.exercise.duration_mode == 'Daily'?"("+props.exercise.promo_duration+"nights)":props.exercise.rate_mode == "Promo" && props.exercise.duration_mode == 'Hour'?"/"+props.exercise.hour_duration+"hours": "/"+props.exercise.hour_duration+"hours"}</small></span>
    							</div>
    						</div>
    					
    						<hr/>
    						<p className="bottom-area d-flex">
    							<span>Good for {props.exercise.max_person}</span> 
    							<span className="ml-auto"><a href="#">Reserve</a></span>
    						</p>
    					</div>
    				</div>
    			</div>
    			
)

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {
		exercises: [],
		 vacation: [], 
		 feedback: [], 
		 highlight: [], 
		 guest: "", 
		 check_out: "", 
		 check_in: "", 
		 room: "",
		 Header_Text: "", 
		 Header_Subtext: "", 
		 Hotel_Information: "", 
		 Name_of_Hotel: "",
		 Hotel_image:"",
		Header_image: "",
		};

	this.select = this.select.bind(this);
  }

  componentDidMount() {
	const hotel = {  val: "project=60641fde66ceb2089b1bc468", }
	axios.post('https://gloreto.herokuapp.com/additional_info/View_Additional_Info/', hotel)
	.then(response => {
	  this.setState({ 
          id: response.data._id,
        Header_Text: response.data.header_text,
         Header_Subtext: response.data.header_subtext,
          Hotel_Information: response.data.hotel_info,
           Name_of_Hotel: response.data.hotel_name,
		   Hotel_image:response.data.hotel_image,
		   Header_image:response.data.header_image
          })
	})
	.catch((error) => {
	  console.log(error);
	})

	axios.post('https://gloreto.herokuapp.com/room_type/', hotel)
	.then(response => {
	  this.setState({ exercises: response.data })
	})
	.catch((error) => {
	  console.log(error);
	})
   

	axios.post('https://gloreto.herokuapp.com/highlight/View_Highlight/', hotel)
	.then(response => {
	  this.setState({ highlight: response.data })
	})
	.catch((error) => {
	  console.log(error);
	})


 axios.post('https://gloreto.herokuapp.com/feedback/View_Feedback/', hotel)
    .then(response => {
      this.setState({ feedback: response.data })
    })
    .catch((error) => {
      console.log(error);
    })


    axios.post('https://gloreto.herokuapp.com/vacation/View_vacation/', hotel)
      .then(response => {
        this.setState({ vacation: response.data })
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
	this.props.history.push('/Add_inf/'+room+'/'+check_in+'/'+check_out+'/'+guest)
}
   else{
	console.log("Please Complete the fields");
   }
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

  render() {
	var myloop = [];
	for (let i = 1; i < 10; i++) {
		myloop.push(
		
		  <option value={i} key={i}>{i}</option>
		);
	  }
    return (
      
<body>
	  <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div className="container">
	      <a className="navbar-brand" href="index.html">{this.state.Name_of_Hotel}</a>
	      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span className="oi oi-menu"></span> Menu
	      </button>

	      <div className="collapse navbar-collapse" id="ftco-nav">
	        <ul className="navbar-nav ml-auto">
	          <li className="nav-item active"><Link to="/Home"  className="nav-link">Home</Link></li>
	          <li className="nav-item"><Link to="/Home"  className="nav-link">About</Link></li>
	          <li className="nav-item"><a href="places.html" className="nav-link">Rooms</a></li>
	          <li className="nav-item"><a href="hotel.html" className="nav-link">Feedback</a></li>
	          <li className="nav-item"><a href="blog.html" className="nav-link">Hotel</a></li>
	          <li className="nav-item"><a href="contact.html" className="nav-link">Contact</a></li>
			  <li className="nav-item"><Link to="/Login"  className="nav-link">Login</Link></li>
	        </ul>
	      </div>
	    </div>
	  </nav>
 
    
    <div className="hero-wrap js-fullheight" style={{ backgroundImage: `url(${bg1})`, height: '100vh', backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
}}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-start" style={{ height: '100vh'}}>
          <div className="col-md-9 mb-5 pb-5 text-center text-md-left" >
            <h1 className="mb-4" >{this.state.Header_Text}</h1>
            <p>{this.state.Header_Subtext}</p>
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
					                <input type="submit" value="Reserve" className="form-control btn btn-primary"/>
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


{this.state.highlight.map((res, index)=>

<div className="col-md-4">
    				<div className="intro">
    					<h3><span>{index+1 }</span> {res.title}</h3>
    					<p>{res.description}</p>
    				</div>
    			</div>

)


}

    			



    			
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

{
	this.state.vacation.map((res)=>
	
	<div className="col-md-4">
        		<a href="#" className="destination-entry img" style={{ backgroundImage: `url(${res.image_url})`, width: 300, height: 300}}>
        			<div className="text text-center">
        				<h3>{res.title}</h3>
        			</div>
        		</a>
        	</div>

	)


}
        	
        
        </div>
    	</div>
    </section>
		
		<section className="ftco-about d-md-flex">
    	<div className="one-half img" style={{ backgroundImage: `url(${this.state.Hotel_image})`}}></div>
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

    
    <section className="testimony-section">
    	<div className="container">
				<div className="row justify-content-center mb-5 pb-3">
			
          <div className="col-md-7 heading-section text-center heading-section-white">
			  <br />
		  <h2 className="mb-4">Our Customer Says</h2>
          </div>
        </div>    		
    		<div className="row">

{this.state.feedback.map((feed) =>


<div className="col-md-6 col-lg-3  ">
    				<div className="destination">
    				
    					<div className="text p-3">
    						<h3><a href="#">{feed.name}</a></h3>
							{feed.rate == 1?
								<p className="rate">
								<i className="icon-star"></i>
								<i className="icon-star-o"></i>
								<i className="icon-star-o"></i>
								<i className="icon-star-o"></i>
    							<i className="icon-star-o"></i>
    							<span>1 Rating</span>
    						</p>:
							feed.rate == 2?
							<p className="rate">
							<i className="icon-star"></i>
							<i className="icon-star"></i>
							<i className="icon-star-o"></i>
							<i className="icon-star-o"></i>
							<i className="icon-star-o"></i>
							<span>2 Rating</span>
						</p>:
						feed.rate == 3?
						<p className="rate">
						<i className="icon-star"></i>
						<i className="icon-star"></i>
						<i className="icon-star"></i>
						<i className="icon-star-o"></i>
						<i className="icon-star-o"></i>
						<span>3 Rating</span>
					</p>:
					feed.rate == 4?
					<p className="rate">
					<i className="icon-star"></i>
					<i className="icon-star"></i>
					<i className="icon-star"></i>
					<i className="icon-star"></i>
					<i className="icon-star-o"></i>
					<span>4 Rating</span>
				</p>:	<p className="rate">
					<i className="icon-star"></i>
					<i className="icon-star"></i>
					<i className="icon-star"></i>
					<i className="icon-star"></i>
					<i className="icon-star"></i>
					<span>5 Rating</span>
				</p>




								}
    						

    						<p>
							<LinesEllipsis
  text=	{feed.feedback}
  maxLine='6'
  ellipsis='...'
  trimRight
  basedOn='letters'
/>
								
							</p>
    						<hr/>
    						<p className="bottom-area d-flex">
    							<span><i className="icon-map-o"></i> {feed.address}</span> 
    						
    						</p>
    					</div>
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
			  {
	this.state.vacation.map((res)=>
	<li><a href="#" className="py-2 d-block">{res.title}</a></li>


	)


}
               
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
            	<h2 className="ftco-heading-2">Have a Questions?</h2>
            	<div className="block-23 mb-3">
	              <ul>
	                <li><span className="icon icon-map-marker"></span><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
	                <li><a href="#"><span className="icon icon-phone"></span><span className="text">+2 392 3929 210</span></a></li>
	                <li><a href="#"><span className="icon icon-envelope"></span><span className="text">info@yourdomain.com</span></a></li>
	              </ul>
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