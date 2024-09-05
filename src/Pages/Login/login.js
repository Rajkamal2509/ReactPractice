import React, { useEffect,useState } from 'react';
import axios from "axios";
import config from '../../config';
import './login.scss';
import { Form } from 'react-bootstrap';
import logo from '../../images/acumen.png';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


const LoginForm = () => {
  const route=useNavigate();
  useEffect(() => {
    getProjects()
  }, [])
  const [projectData, dataMaster] = useState(null);
  const getProjects=()=>{
    axios.get(`${config.API_URL}/projects`) .then((res) => {
      let masterdata=res.data.message
      dataMaster(masterdata);
    }).catch((e) => {
     console.log(e);
    })
  }
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    project:'select'
    
  });
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData,  [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};
    if(formData.name===''){
      formErrors.name = "Please enter your Username";
    }
    if(formData.password===''){
      formErrors.password = "Please enter your Password";
    }
    if(formData.project==='select'){
      formErrors.project = "Please select your Project";
    }
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      let data= {
        email: formData.name,
        password: formData.password,
        project_id: formData.project,
        device_id:" ",
        cosmic_type: "web"
      }
      axios.post(`${config.API_URL}/login`,data) .then((res) => {
        console.log(res.data);
        localStorage.setItem('Details', JSON.stringify(res.data));
       
        if(res.data){
          route("/HomePage")
        }
      }).catch((e) => {
        console.log(e);
      })
    }
  };


  return (
<>

  <div className="login_position ">
    <div className="row">
      <div className="col-md-7 col-lg-4 col-sm-8 m-auto login-form-1">
        <div className="text-center d-flex justify-content-center align-items-center">
          <img  className="logo"  src={logo}  alt="Logo Image"  />
          <span style={{ fontSize: 12, marginTop: 5 }}>beta</span>
        </div>
        <Form onSubmit={handleSubmit}>
        <div className="form-height">
          <select  className="form-select mt-4" aria-label="Default select example" defaultValue="select" onChange={handleChange}    value={formData.project} name="project">
          <option disabled  value='select'>Select Project</option>
          { projectData  && projectData.map(item => (  
         
             <option key={item.project_id} >{item.project_id}</option>
            ))}
          </select>      
        </div>
        {errors.project && <span style={{ color: 'red' }}>{errors.project}</span>} 




        <div className="form-group form-height mt-4">

        {/* <Form.Group controlId="formName"> */}
        <input  onChange={handleChange} className="form-control"   name="name" placeholder="Enter your name" value={formData.name}></input>
          {/* <Form.Control className="form-control" type="text"  name="name" value={formData.name}  onChange={handleChange} placeholder="Enter your name"/> </Form.Group> */}

        </div> 
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>} 
        <div className="form-group form-height mt-4">

          <Form.Group controlId="formPassword">
       
          <Form.Control className="form-control" type="password"name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" /> </Form.Group>
        </div>
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>} 
        <div className="form-group mt-4 text-center">
       
          <button className="btnSubmit"  type="submit">Login</button>
                                          
                                    
        </div>
       
      </Form>
      </div>
    </div>
  </div>
  <p className="copyright">© Hard n Soft Technologies</p>
  </>
  );
};

export default LoginForm;
