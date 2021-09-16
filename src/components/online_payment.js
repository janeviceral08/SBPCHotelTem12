import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"
import Loaders from './loader';
import cogoToast from 'cogo-toast';
import ReactDOM from "react-dom"
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import GooglePayButton from '@google-pay/button-react';

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const ERROR_CODE_ACCOUNT_EXISTS =
	'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
	An account with an E-Mail address to
	this social account already exists. Try to login from
	this account instead and associate your social accounts on
	your personal account page.
`;

const search = window.location.search;
const params = new URLSearchParams(search);
const foo = params.get('rate_mode');
const room = params.get('room');
const in_checks = params.get('in_check');
const out_checks = params.get('out_check');
const guest = params.get('guest');
const code = params.get('code');
const vexp = params.get('vexp');
const vmode = params.get('vmode');
const users = params.get('user');

export default class Online_Payment extends Component {
    constructor(props) {
		super(props);
		this.state = { Loading: false,exercises: [], date_diff: '',  map: "",
    img:"",
    tagsLandmarks: [],
    tagsPolicies: [],
    tags: [], 
  reservation_code:'',
  in_check:'',
  out_check:'',
  guest:'',
  user:'',

  name: '',
  email: '',
  phone_no: '',
  address: '',
  nationality: '',
  mode: '',
error: null,
  hotel_info: "",
  userlocal: "",
  code: code,
  vamount: 0,
  vexp: vexp,
  vmode: vmode,
label: 'Apply Voucher',
hour_duration: '',
   duration_mode: '',
   rate_mode: '',
  
  };
	}

  componentDidMount() {
    this.setState({userlocal: users,  reservation_code:moment().unix(),
    in_check:in_checks,
    out_check:out_checks,
    guest:guest,
  
  })
const hotel = {  val: "project=60d06709d66313f172f6c3ec", }
    console.log('hotel: ', hotel)

axios.post('http://localhost:5000/room_type/', hotel)
.then(response => {
    let room = params.get('room')
    
    let res = response.data.find(element => element.temp_id === room)
  this.setState({ exercises:  res})

})
.catch((error) => {
  console.log(error);
})



let in_check = moment(in_checks).unix()
let out_check = moment(out_checks).unix()

let in_check_diff =  moment(in_check* 1000).format('MMMM D, YYYY')
            let out_check_diff = moment(out_check* 1000).format('MMMM D, YYYY')
            let sub = new Date(out_check_diff)- new Date(in_check_diff);
            console.log('sub: ', sub)
            this.setState({date_diff: sub})


            axios.post('http://gloreto.herokuapp.com/additional_info/View_Additional_Info/', hotel)
            .then(response => {
             
                  this.setState({ 
                    
                      hotel_info: response.data.hotel_info,
                  map: response.data.map_address,
                  img: response.data.hotel_image,
                  tagsLandmarks:response.data.tagsLandmarks,
                  tagsPolicies: response.data.tagsPolicies,
                  tags: response.data.tags,
                    })
            })
            .catch((error) => {
              console.log(error);
            })
            const user = {    val: users }


            console.log('user: ', user)
          axios.post('http://localhost:5000/guest_account/info_guest_account', user)
        .then(res => {
        console.log('response user: ', res.data)
        
        this.setState({     
        name: res.data.first_name+ ' '+ res.data.middle_name+ ' ' + res.data.last_name+ ' '+ res.data.suffix, 
        email: res.data.email,
        phone_no: res.data.phone_no,
        address: res.data.address,
        nationality: res.data.nationality,
      })
        })
        .catch((error) => {
        console.log(error);
        })






        const hotels = {  code: this.state.code, date_value: moment().unix(), val: "project=60d06709d66313f172f6c3ec", }
        axios.post('http://localhost:5000/voucher/check_voucher_user/', hotels)
        .then(response =>{
          this.setState({label: 'Apply Voucher'})
      
          if(response.data.length > 0)
          {
                if(Math.floor(this.state.date_diff/(1000*60 * 60 * 24)) >= response.data[0].min_stay){
                      
                this.setState({vmode: response.data[0].mode,vexp:response.data[0].expiration_date, vamount: response.data[0].vouchvalue})
                }
                
                else{
                  return;
                }
        }
        else{ return;
        }
        }
        )
  }

  back (){
    this.props.history.push("/Home")
  }

  printform() {
    window.print()
  }

  currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
// Makes the back button work
 createOrder = (data, actions) =>{
  return actions.order.create({
    purchase_units: [
      {
        amount: {
          "currency": "USD",
          value: "0.01",
        },
      },
    ],
    "id": moment().unix(),
  }).then(function(res) {
   console.log('res: ', res)
   console.log('res: ', res.id)
  }).then(function(data) {
    console.log('data: ', data.id)// Use the key sent by your server's response, ex. 'id' or 'token'
  });
};

 onApprove = (data, actions) => {
  return actions.order.capture().then(function(res) {
    console.log('resonApprove: ', res)
   }).then(function(data) { 
     console.log('dataonApprove: ', data)// Use the key sent by your server's response, ex. 'id' or 'token'
   });
};

onChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};


  render() {
    console.log('this.state.mode: ', this.state.mode)
const amount = this.state.exercises.rate_mode == "Daily"? Math.floor(this.state.date_diff/(1000*60 * 60 * 24))*parseFloat(this.state.exercises.roomprice)/**/: this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?parseFloat(this.state.exercises.roomprice)/**/:this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?parseFloat(this.state.exercises.roomprice)/**/: parseFloat(this.state.exercises.roomprice_hour)
    return (
    
<body>
<div class="tm-main-content" id="top">
            <div>
                <div class="tm-section tm-section-pad tm-bg-img" id="tm-section-5">                                                        
                    <div class="container ie-h-align-center-fix">
                        <div class="row tm-flex-align-center">
                          
                        <div className="container" style={{ padding: '3%'}}>
    <div className="row">
        <div className="col-md-3 register_user-left" style={{'text-align': 'center', color: '#fff'}}>
        
            {this.state.tagsPolicies.length > 0?  <p style={{fontSize: '20px', color: 'black', fontWeight: 'bold'}}>Fees & policies</p>:null }
                                  <div class="grid-room-infos-room-in">
                                          {this.state.tagsPolicies.map((info, index)=>
                                            <div class="form-group tm-form-element tm-form-element-50" key={index} style={{'text-align': 'left'}}>
                                                    <i class="fa fa-circle" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '15px'}}> </i>
                                                    <span style={{marginLeft: '20px', fontSize: '15px', color: 'black'}}>{info}</span>
                                            </div>
                                            )}
                                    </div>

                                    {this.state.tags.length > 0?  <p style={{fontSize: '20px', color: 'black', fontWeight: 'bold'}}>Anemeties</p>:null }
                        <div class="grid-room-infos-room-in">
                            {this.state.tags.map((info, index)=>
                                <div class="form-group tm-form-element tm-form-element-50" key={index} style={{'text-align': 'left'}}>
                                      <i class="fa fa-check-square-o" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '15px'}}> </i>
                                      <span style={{marginLeft: '20px', fontSize: '15px', color: 'black'}}>{info.text}</span>
                                </div>
                            )}
                        </div>
        </div>
        <div className="col-md-9" style={{'border-top-left-radius': `10% 50%`,  'border-bottom-left-radius' : `10% 50%`}}>
          
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h3 style={{  'text-align': `center`, 'margin-top': '5%',' margin-bottom': `-15%`, color: '#495057'}}>Reservation Information</h3>
                    <div className="row" style={{padding: '10%',  marginTop: '0%', paddingTop: '2%'}}>
                        <div className="col-md-6">
                        <div class="form-group"><p>Reservation Code:</p>
                              <input type="text" class="form-control rounded-left" placeholder="Room Type" value={this.state.reservation_code}
						disabled/>
                          </div>
                            <div className="form-group">
                            <p>Room Type:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Full Name" value={this.state.exercises.room_type}
						disabled/>  </div>
                            <div className="form-group">
                            <p>Room Price:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" value={this.state.exercises.rate_mode == "Daily"?this.state.exercises.roomprice+ '/night': this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?this.state.exercises.roomprice+"("+this.state.exercises.promo_duration+"nights)"/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?this.state.exercises.roomprice+"/"+this.state.exercises.hour_duration+"hours":this.state.exercises.roomprice_hour+ "/"+this.state.exercises.hour_duration+"hours" }
		 disabled/>
                          </div>
                          <div className="form-group">
                            <p>Stay:</p>
                            <input type="text" class="form-control rounded-left"  value={Math.floor(this.state.date_diff/(1000*60 * 60 * 24))+'Night(s)'}
			 disabled/>
                            </div>
                            <div className="form-group">
                            <p>Guest:</p>
                            <input type="text" class="form-control rounded-left" value={this.state.guest}
				 disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check In:</p>
                            <input type="text" class="form-control rounded-left" value={moment(this.state.in_check).format('MMMM D, YYYY hh:mm a')}
					 disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check Out:</p>
                            <input type="text" class="form-control rounded-left"  value={this.state.exercises.rate_mode == "Daily"?moment(this.state.out_check).format('MMMM D, YYYY'): this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?moment(this.state.in_check).add(this.state.exercises.promo_duration, 'days').format('MMMM D, YYYY')/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?moment(this.state.in_check).add(this.state.exercises.hour_duration, 'hours').format('MMMM D, YYYY'):moment(this.state.in_check).add(this.state.exercises.hour_duration, 'hours').format('MMMM D, YYYY hh:mm a')}
					 disabled/>
                            </div>
                            {this.state.vmode ==='empty'?null:
                            <div className="form-group">
                            <p>Voucher:</p>
                            <input type="text" class="form-control rounded-left"  value={this.state.code}
			disabled/>
                            </div>}
                            
                            <div className="form-group">
                            <p>{this.state.vmode ==='empty'?'Total':'Subtotal'}:</p>
                            <input type="text" class="form-control rounded-left" value={this.currencyFormat(amount)}
					disabled/>

{this.state.vmode ==='empty'?null:
            this.state.vmode === 'Percentage'?
            <div>
                      <p>Voucher Value:</p>
            <input type="text" class="form-control rounded-left" value={this.state.vamount+'% = '+ amount/this.state.vamount}
					 />
             <p>Total:</p>
               <input type="text" class="form-control rounded-left" value={amount-(amount/this.state.vamount)}
						/> </div>
            :
            <div>
               <p>Voucher Value:</p>
            <input type="text" class="form-control rounded-left" value={this.currencyFormat(parseFloat(this.state.vamount))}
						 />
             <p>Total:</p>
            <input type="text" class="form-control rounded-left" value={this.currencyFormat(amount-parseFloat(this.state.vamount).toFixed(2))}
						/>
             </div>
          
          }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>Full Name:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Full Name" name="name" value={this.state.name}
						onChange={this.onChange} disabled/>
                               
                            </div>
                            <div className="form-group">
                            <p>Email:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" name="email" value={this.state.email}
						onChange={this.onChange} disabled/>
                          </div>
                            <div className="form-group">
                            <p>Phone Number:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" name="phone_no" value={this.state.phone_no}
						onChange={this.onChange} disabled/>
                          </div>
                            <div className="form-group">
                            <p>Address:</p>
                            <div style={{maxHeight: '900px', borderWidth: 5, borderColor: 'gray'}}><span>{this.state.address}</span></div>
                        </div>
                            <div className="form-group">
                            <p>Nationality:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Nationality" name="nationality" value={this.state.nationality}
						onChange={this.onChange} disabled/>
                            </div>

                            <div className="form-group">
                            <p>Preferred Mode of Payment:</p>
                            <select name="mode" className="form-control" onChange={this.onChange}>
                    <option value="">-- Select Mode of Payment --</option>
                    <option value="Cash">Cash (Over the Counter</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="e-Wallet">e-Wallet</option>
                    <option value="Paypal">Paypal</option>
                    <option value="GooglePay">GooglePay</option>
			                      </select>
                            </div>

                            {this.state.mode === 'Paypal' || this.state.mode === 'Credit Card' || this.state.mode === 'Debit Card'?<PayPalButton
      createOrder={(data, actions) => this.createOrder(data, actions)}
      onApprove={(data, actions) => this.onApprove(data, actions)}
    />:null}

{this.state.mode === 'GooglePay'?<GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
  }}
/>:null}
                    
       
                    <button class="btn btn-primary rounded submit p-3 px-5" onClick={()=> this.printform()} style={{marginRight: '10px'}}>Pay Later Reserve Now</button>
                    <button class="btn btn-primary rounded submit p-3 px-5" onClick={()=> this.back()}>Go to Home Page</button>
                        </div>
                   
                    </div>
              
                </div>
                



            </div>
        </div>
    </div>

</div>




{window.innerWidth < 992?
    <div class="fixed-bottom-minimized">
 <div style={{textAlign: 'center', padding: '10px'}}>   <Link to={'/Home'}> <i class="fa fa-building-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Home</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/Booking'}>  <i class="fa fa-address-book-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Bookings</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/Voucher'}>  <i class="fa fa-ticket" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Voucher</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/More'}>  <i class="fa fa-cogs" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>More</span></Link></div>
 </div> :null


}
     



                        </div>
                    </div>
                </div>
            </div>           
            
          
            
            
        </div>

</body>
    )
  }
}