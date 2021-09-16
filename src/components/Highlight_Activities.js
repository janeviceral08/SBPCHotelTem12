import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import cogoToast from 'cogo-toast';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default class Highlight_Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {exercises: [],   projects:[],
      members: [], title: "", description: "",   online: [], };
    
  }

  componentDidMount() {
  const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }
	axios.post('https://gloreto.herokuapp.com/highlight/View_Highlight/', hotel)
	.then(response => {
	  this.setState({ exercises: response.data })
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

  const myhotel = {  val: localStorage.getItem('hotel_id'), }
  axios.post('http://localhost:5000/user/User_info', myhotel)
  .then(response => {
 
      this.setState({projects: response.data, members: response.data.memberOf})
  })
  .catch((error) => {
    console.log(error);
  })
   
  }


  onSubmit = () => {
    const {  title, description  } = this.state;
     console.log('title: ', title)
     const exercise = {
        title, 
        description,
        createdAt: moment().unix(),
        _partition: 'project=60641fde66ceb2089b1bc468'
      }
      if (!title.trim()) {
        cogoToast.error('Please Enter Title');
        return;
      }
      if (!description.trim()) {
        cogoToast.error('Please Enter Description');
        return;
      }
     
      axios.post('https://gloreto.herokuapp.com/highlight/highlight_activities', exercise)
      .then(res =>{
        cogoToast.success('Please wait');
          if(res.data == 'Highlight Activity added!'){
            window.location.reload()
          }
          else{
              cogoToast.error('Please Try Again');
          }
          
      });

    
};

onDelete = (id,title) => {
    const exercise = {
        id: id
      }
    confirmAlert({
        title: 'Confirm to Delete '+title,
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>  axios.post('https://gloreto.herokuapp.com/highlight/Highlight_Delete', exercise)
            .then(res =>{
             
              window.location.reload()
            })
          },
          {
            label: 'No',
            onClick: () => console.log('no')
          }
        ]
      });
    
};
onChangetitle = event => {
    this.setState({ title: event.target.value });

};
onChangedescription = event => {
    this.setState({ description: event.target.value });

};

logout = () => {
  confirmAlert({
    title: 'Logout ',
    message: 'Are you sure to do this?',
    buttons: [
      {
        label: 'Yes',
        onClick: () =>
        {
  localStorage.removeItem("hotel_id")
  this.props.history.push('Home')

        }

      },
      {
        label: 'No',
        onClick: () => console.log('no')
      }
    ]
  });

}
  render() {
      
    return (
      <body class="hold-transition skin-blue sidebar-mini">
      <div class="wrapper">
      
        <header class="main-header">
          <a href="" class="logo">
            <span class="logo-mini"><b>G</b></span>
            <span class="logo-lg"><b>Gloreto</b></span>
          </a>
          <nav class="navbar navbar-static-top">
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
      
          </nav>
        </header>
        <aside class="main-sidebar">
          <section class="sidebar">
 
          <ul class="sidebar-menu">
            <li class="header">Hotels</li>
            {this.state.members.length >0 ? this.state.members.map((info,i)=>
     
     localStorage.getItem('getInfoID')===info.partition?
     <li onClick={()=> this.getInfoID(info.partition, info.expiration)} key={i} className="treeview active">
              <Link >  
                  <i class="fa fa-building"></i> <span style={{fontSize: 15}}>{info.name}</span>
                  </Link>
              </li>
              :
              localStorage.getItem('getInfoID') === null && info.name === 'My Hotel'?
              <li onClick={()=> this.getInfoID(info.partition, info.expiration)} key={i} className="treeview active">
              <Link >  
                  <i class="fa fa-building"></i> <span style={{fontSize: 15}}>{info.name}</span>
                  </Link>
              </li>
              :
              <li onClick={()=> this.getInfoID(info.partition, info.expiration)} key={i} className="treeview">
              <Link >  
                  <i class="fa fa-building"></i> <span style={{fontSize: 15}}>{info.name}</span>
                  </Link>
              </li>
            
            
            
            ):null}
              <li class="header">MAIN NAVIGATION</li>
              <li class="treeview">
              <Link to="/">  
                  <i class="fa fa-user"></i> <span>Reservations</span>
                      <span class="pull-right-container">
                        <small class="label pull-right bg-green" style={{padding: 5, borderRadius: 50, marginTop: -10}}>{this.state.online.length}</small>
                      </span>
                      </Link>
              </li>
              <li class="treeview">
              <Link to="/Rooms" >  
                  <i class="fa fa-building"></i> <span>Rooms</span>
                  </Link>
              </li>
              <li class="treeview">
              <Link to="/Goods">  
                  <i class="fa fa-shopping-cart"></i> <span>Goods</span>
                  </Link>
              </li>
              <li class="treeview active">
              <Link to="/Highlight_Activities" >  
                  <i class="fa fa-clipboard"></i> <span>Highlight Activities</span>
                  </Link>
              </li>
              <li class="treeview">
              <Link to="/Vacation_Ideas" >  
                  <i class="fa fa-list-alt"></i> <span>Vacation Ideas</span>
                  </Link>
              </li>
              <li class="treeview">
              <Link to="/Guest_FeedBack" >  
                  <i class="fa fa-users"></i> <span>Guest FeedBack</span></Link>
               
              </li>
              <li class="treeview">
              <Link to="/Voucher" >  
              <i class="fa fa-ticket"></i> <span>Voucher</span></Link>
              </li>
              <li class="treeview">
                  <Link to="/Additional_Info" >  
                  <i class="fa fa-cogs"></i> <span>Additional Hotel Info</span></Link>
              </li>
              <li class="treeview">
                  <Link to="/Reports" >  
                  <i class="fa fa-bar-chart"></i> <span>Reports</span></Link>
              </li>
              <li class="treeview">
              <a onClick={this.logout} style={{color: 'white'}}>  
              <i class="fa fa-sign-out"></i> <span>Logout</span></a>
              </li>
            </ul>
          </section>
        </aside>
      
        <div class="content-wrapper">
          <section class="content-header">
            <h1>
            Highlight Activities
            </h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">  Highlight Activities</li>
             
            </ol>
          </section>
      
          <section class="content">
            <div class="row">
            <div class = "col-md-3" >
  
			
				<div class="form-group">
					<label for="title">Title:</label> <br />
                    <TextField id="outlined-basic" label="Title" variant="outlined" onChange={this.onChangetitle}/>
                    
<br />
          <label for="file">Description:</label><br />
          <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          onChange={this.onChangedescription}
          variant="outlined"
        />
				</div>
				<button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.onSubmit}>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>
			
   
		</div>
		



              <div class="col-md-9">
                <div class="box" >
                  <div class="box-body">
                  <table class="table table-hover">
  <thead>
    <tr>
    
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  { this.state.exercises.map((room,index) =>
    <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>{room.title}</td> 
                                    <td>{room.description}</td>
                                    <td>
                                  
                                                            <Link to="#" onClick={() => this.onDelete(room._id, room.title)}>
                                                            <i class='fa fa-trash text-red' title='Delete'></i>
															</Link>
                               
                                    </td>
                                 
                                </tr>



)

}

    
  </tbody>
</table>
                  </div>
                 
                </div>
              
              </div>
            
            </div>
         
          </section>
        
        </div>
        
    
      
      
      </div>
   
      </body>
    )
  }
}