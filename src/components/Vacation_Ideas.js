import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {DropzoneDialog} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import cogoToast from 'cogo-toast';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default class Vacation_Ideas extends Component {
  constructor(props) {
    super(props);

    this.state = {
        online: [], 
        exercises: [],
        open: false,
        files: [],
        imageUrl: null,
    imageAlt: null,
    title: "",
    projects:[],
    members: [],
    
    };
  }

  componentDidMount() {
    const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }
      axios.post('https://gloreto.herokuapp.com/vacation/View_vacation/', hotel)
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


  handleClose() {
    this.setState({
        open: false
    });
}

handleSave(files) {
    //Saving files to state for further use and closing Modal.
    console.log('files: ', files.target.files)
    this.setState({
        files: files,
        open: false
    });
}

handleOpen() {
    this.setState({
        open: true,
    });
}

handleImageUpload  = () =>{
    cogoToast.success('Please wait');
    const {  title  } = this.state;
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData();
    formData.append('file', files[0]);    formData.append('upload_preset', 'bgzuxcoc');
    const options = {
      method: 'POST',
      body: formData,
    };

    return fetch('https://api.cloudinary.com/v1_1/kusinahanglan/image/upload', options)
      .then(res => res.json())
      .then(res => {
        
        const exercise = {
            title: title , 
            image_url: res.secure_url,
            createdAt: moment().unix(),
            _partition: 'project=60641fde66ceb2089b1bc468'
          }
    
          axios.post('https://gloreto.herokuapp.com/vacation/add_Vacation', exercise)
          .then(res =>{
           
   
            
              if(res.data == 'Vacation added!'){
                window.location.reload()
              }
              else{
                  cogoToast.error('Please Try Again');
              }
              
          });


      })
      .catch(err => console.log(err));


   
    

  }
send(url){
    const exercise = {
        title: this.state.title , 
        image_url: url,
        createdAt: moment().unix(),
        _partition: 'project=60641fde66ceb2089b1bc468'
      }

      axios.post('https://gloreto.herokuapp.com/vacation/add_Vacation', exercise)
      .then(res =>{
        cogoToast.success('Please wait');
        console.log('res: ', res)
        /*
          if(res.data == 'Vacation added!'){
            window.location.reload()
          }
          else{
              cogoToast.error('Please Try Again');
          }
          */
      });
     

}
  onChangetitle = event => {
    this.setState({ title: event.target.value });

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
            onClick: () =>  axios.post('https://gloreto.herokuapp.com/vacation/vacation_Delete', exercise)
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
      console.log('title: ', this.state.title)
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
              <li class="treeview">
              <Link to="/Highlight_Activities" >  
                  <i class="fa fa-clipboard"></i> <span>Highlight Activities</span>
                  </Link>
              </li>
              <li class="treeview active">
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
              Vacation Ideas
            </h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">Vacation Ideas</li>
         
            </ol>
          </section>
      
          <section class="content">
            <div class="row">
            <div class = "col-md-3" >
  
      <div class="form-group">
          <label for="file">Title:</label> <br />
          <TextField id="outlined-basic" label="Title" variant="outlined" onChange={this.onChangetitle} />
<br />
<label for="file">File Upload:</label><br />
<input type="file"/>


      </div>
      <button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.handleImageUpload}>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>


</div>
              <div class="col-xs-12">
                <div class="box">
                  <div class="box-body">
                  <table class="table table-hover">
  <thead>
    <tr>
    
    <th>#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Image</th>
                       
                        <th scope="col">Actions</th>
                      
    </tr>
  </thead>
  <tbody>
  { this.state.exercises.map((room,index) =>
    <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>{room.title}</td> 
                                    <td> <img src={room.image_url} className="displayed-image" width={100} height={100} /></td>
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