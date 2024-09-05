import React, { useEffect,useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './homepage.scss';
import logo from '../../images/acumen.png';
import LogoMark from '../../images/LogoMark.svg';
import stop from '../../images/stop.png';
import mbl_send from '../../images/mbl_send.png';
import mbl_attach from '../../images/mbl_attach.png';
import $ from 'jquery'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import config from '../../config';
import axios from "axios";

const HomePage = () => {
    const route=useNavigate();
    const [username, userData] = useState(null);
    const [microopen, microopenData] = useState(false);
    const [sendstop, sendstopData] = useState(true);
    const [formattedDate, userDate] = useState(null);
    const [Projects, userProjects] = useState(null);
    const [assistantKey, assitantData] = useState(null);
    const [question, questionData] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
    useEffect(() => {
      getdetails()
    },[inputValue])
    const ToggleSideBar=(value)=>{
      if(value==true){
          $(".arrow_btn").hide();
          gsap.to('.sidebar-container',{
              x:0,
              width:'350px',
              minWidth:'350px',
              duration:0.30,
              ease:'ease',
              display:'block'
        })
      }
      else{
          $(".arrow_btn").show();
          gsap.to('.sidebar-container',{
              width:0,
              minWidth:0,
              x:-400,
              ease:'ease'
        })
 
      }
}
const getdetails=async()=>{
    let projectDetails=JSON.parse(localStorage.getItem('Details'))
    const date = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    userDate(date.toLocaleDateString('en-US', options))
    userData(projectDetails.user_details.first_name)
    let response = await require('../../json/projects.json');
    let projects = response.filter((i) => i.id == projectDetails.project_details.project_id);
    questionData(projects[0].questions)
    userProjects(projects)
    assitantData(projectDetails.project_details.asst_assistant_name)
    let profileImg=`${config.API_URL}/${projectDetails.user_details.profile_photo}`
    let thread_id =localStorage.getItem('theardId')
    console.log(thread_id)
    if (thread_id == null) {
      createThread();
    }


}
const suggestion=(item)=>{
  setInputValue(item.question);
  // $('#exampleModal').modal('hide');
}
const logout=()=>{
  route("/")
}
const createThread=()=>{
  let projectDetails=JSON.parse(localStorage.getItem('Details'))
  let data = {
    member_id: projectDetails.user_details.member_id,
    project_id: projectDetails.project_details.project_id,
  };
  axios.post(`${config.API_URL}/create-thread`,data) .then((res) => {
    console.log(res.data);
    localStorage.setItem('theardId', res.data.thread_id);
  }).catch((e) => {
    console.log(e);
  })
}
const sendButton=(e)=>{
  e.preventDefault();
  let projectDetails=JSON.parse(localStorage.getItem('Details'))
  let theard=localStorage.getItem('theardId');
  let data = {
    prompt: inputValue,
    thread_id:theard ,
    member_id: projectDetails.user_details.member_id,
    project_id: projectDetails.project_details.project_id,
    a360_features:null
  }    
  axios.post(`${config.API_URL}/textgen/stream`,data,{ responseType: 'stream' }) .then((res) => {
    console.log(res.data);

    const stream = res.data;

stream.on('data', data => { 
    console.log(data);
});

stream.on('end', () => {
    console.log("stream done");
});
  }).catch((e) => {
    console.log(e);
  })
}
return (


<>

<div className="desktop">
  <div className="d-flex">
    {/*----- SideBar ----*/}
    <div className="sidebar-container">
      <div className="top_bar">
        <div className="ms-auto">
          <button type="button" className="btn_close">
          <i className="fa fa-chevron-left" aria-hidden="true"  onClick={()=>{ToggleSideBar(false)}}></i>
          </button>
        </div>
        <div></div>
      </div>
      {/* History List */}
      <div className="history_area ">
        <div className="profile">
          <div className="d-flex justify-content-between lign-items-center">
            <div>
              <img className="profile_pic" src="{{this.profileImage}}" alt="" />
            </div>
            <div className="ms-2">
              <p className="user_name m-0">
                <b>
                 Welcome {username}
                </b>
              </p>
              <p className="date m-0" >{formattedDate}</p>
            </div>
            <div className="d-flex align-items-end"style={{ cursor: "pointer" }}   onClick={()=>{logout()}}>
              Logout
            </div>
          </div>
        </div>
        <div className="selection_area">
          <div className="row my-4">
            <div className="col-4">Profile :</div>
            <div className="col-8">Technician</div>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-4">Product :</div>
            <div className="col-8">
              <select className="form-select " aria-label="Default select example" >
              { Projects  && Projects.map(item => (  
                <option key={item.id} >{item.productName}</option>
              ))}
              </select>
            </div>
          </div>
        </div>
        <div className="voice_area">
          <div className="row my-2 d-flex align-items-center">
            <div className="col-4">Voice :</div>
            <div className="col-8">
              <select className="form-select" aria-label="Default select example">
             
                <option value="alloy">Alloy</option>
                <option value="echo">Echo</option>
                <option value="fable">Fable</option>
                <option value="onyx">Onyx</option>
                <option value="nova">Nova</option>
                <option value="shimmer">Shimmer</option>
              </select>
            </div>
          </div>
        </div>
        <div className="newChat">
          <div className="d-flex align-items-center newChat_box">
            <img src={{logo}} alt="" /> 
            <span className="mx-2"> New Chat </span>
            <i className="fa fa-external-link-square ms-auto newChat_icon" />
          </div>
        </div>
       
      </div>
    </div>
    {/* Container */}
    <div className="Chat-container">
      {/*---- Header  ----*/}
      <div className="menu">
        <button className="arrow_btn">
          <i className="fa fa-chevron-right" aria-hidden="true" onClick={()=>{ToggleSideBar(true)}}></i>
        </button>
      </div>
      <div className="header">
        <div className="d-flex">
          <div className="centered_header container">
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-flex align-items-center">
                  <img style={{ width: 160 }}  src={logo}alt="" />
                </div>
                <p style={{ paddingLeft: 0, margin: "-5px 0 0 0",color: "#339af0"  }} >
                { assistantKey }
                  &nbsp;
                  <span
                    style={{ fontSize: 12, marginTop: 5, color: "#878787" }}
                  >
                    (Beta)
                  </span>
                </p>
              </div>
              <div className="pe-2">
                <i  style={{ width: 35,  height: 35, marginTop: 20,cursor: "pointer",fontSize: 20, color: "#339af0" }} className="fa fa-random" data-bs-toggle="modal" data-bs-target="#exampleModal"/>

                <div className="btn-group dropup">
                  <button className="option_btn" data-bs-toggle="dropdown">
                    <i style={{ marginLeft: 10, width: 35,  height: 35,  marginTop: 10, cursor: "pointer", fontSize: 20, color: "#339af0" }} className="fa fa-ellipsis-v"  />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-lg-end p-0 bg-white" style={{ width: "max-content" }} >
                    <li className="pointer rounded p-1">
                      <a className="dropdown-item text-end" data-bs-toggle="dropdown" >
                        <i className="fa-solid fa-xmark close_btn_img" />
                      </a>
                    </li>
                    <li className="pointer pb-1">
                      <a className="dropdown-item d-flex">
                        <div className="me-2">
                          <i
                            className="fa fa-bell"
                            style={{ color: "#878787" }}
                          />
                        </div>
                        <div>TekAlerts</div>
                      </a>
                    </li>
                    <li className="pointer pb-1">
                      <a className="dropdown-item d-flex">
                        <div className="me-2">
                          <i
                            className="fa fa-cog"
                            style={{ color: "#878787" }}
                          />
                        </div>
                        <div>R&amp;R Trainer</div>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <img src="../../../assets/images/question.png" alt/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="help_box">
        <img className="help_img"  src={LogoMark} alt=""
        />
        <p className="help_txt">How can I help you?</p>
      </div>

      <div className="full_width" >
        <div className="msg_area container">
        </div>
        </div>
      <div className="position-relative w-100">
        <div id="showTimeoutMessage" style={{ display: "none" }}>
          <div
            className="d-flex justify-content-center "
            style={{
              position: "absolute",
              bottom: 85,
              left: "50%",
              transform: "translate(-50%,-50%)",
              background: "white",
              zIndex: 99
            }}
            id=""
          >
            <div className=" align-items-center text-secondary rounded border">
              <div className="d-flex">
                <div className="toast-body border-end px-3 py-2">
                  Please Try again
                </div>
                {/* <button type="button" style="width: 5px;height: 5px;" class="btn-close btn-close-dark mx-3 m-auto" " ></button> */}
              </div>
            </div>
          </div>
        </div>
        <div id="audioTimeoutMessage" style={{ display: "none" }}>
          <div
            className="d-flex justify-content-center"
            style={{
              position: "absolute",
              bottom: 85,
              left: "50%",
              transform: "translate(-50%,-50%)",
              background: "white",
              zIndex: 99
            }}
          >
            <div className=" align-items-center text-secondary rounded border">
              <div className="d-flex">
                <div className="toast-body border-end px-3 py-2 ">
                  Your limit exceeds
                </div>
                <button
                  type="button"
                  style={{ width: 5, height: 5 }}
                  className="btn-close btn-close-dark mx-3 m-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="showErrorMessage" style={{ display: "none" }}>
          <div
            className="d-flex justify-content-center "
            style={{
              position: "absolute",
              bottom: 100,
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
            id=""
          >
            <div className=" align-items-center text-secondary rounded border">
              <div className="d-flex">
                <div className="toast-body border-end px-3 py-2">
                  Your Limit is Exceeded
                </div>
                <button
                  type="button"
                  style={{ width: 5, height: 5 }}
                  className="btn-close btn-close-dark mx-3 m-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="down_container">
          <button className="down_arrow_btn">
            <i className="fa-solid fa-arrow-down down_arrow_img" />
            {/* <img class="" src="../../../assets/images/down_arrow.png" alt=""> */}
          </button>
        </div>
        <div className="input_container container">
          <form>
            <div className="input_area container bg-white">
              <div className="d-flex">
                <div
                  className="position-relative w-100"
                  style={{ cursor: "pointer", margin: "0 15px 0 0" }}
                >
                  <div className="file-upload">
                    <div
                      className="file-select file-select-box"
                      style={{ cursor: "pointer" }}
                    >
                      <button
                        className="file-upload-custom-btn"
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={mbl_attach}
                          alt=""
                          style={{ width: 25 }}
                        />
                      </button>
                      <input
                        type="file"
                        className="fileinput"
                        style={{ cursor: "pointer" }}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="file-upload">
                    <div
                      className="file-select file-select-box"
                      style={{ cursor: "pointer" }}
                    >
                      <button
                        className="file-upload-custom-btn"
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className="fas fa-ban"
                          style={{ color: "#878787", width: 25 }}
                        />
                      </button>
                    </div>
                  </div>
                  {microopen && (
                  <button className="microphone">
                    <i
                      className="fa fa-ban"
                      style={{ width: 25 }}
                    />
                  </button>
                  )}
                  <button className="microphone" id="audio_stop">
                    <i className="fa fa-microphone" style={{ width: 25 }} />
                  </button>
                  <div className="microphone mic_play">
                    <div className="boxContainer icons ">
                      <div className="box box1" />
                      <div className="box box2" />
                      <div className="box box3" />
                      <div className="box box4" />
                      <div className="box box5" />
                    </div>
                    <div style={{ fontSize: 12 }}>Stop</div>
                  </div>
                  <div className="microphone" id="microphoneLoading">
                    <img
                      className="icons"
                      src="../../../assets/images/icons8-loading-circle.gif"
                    />
                  </div>
                  <textarea
                    className="input_msg"
                    id="chatinput"
                    autoComplete="off"
                    required=""
                    formcontrolname="userInput"
                    name="chatinput"
                    type="text"
                    placeholder="Message to Acumen360"
                    rows={1}
                    value={inputValue}
                    onChange={handleChange}
                  />
                </div>
                <div
                  style={{
                    marginBottom: 15,
                    display: "flex",
                    alignItems: "end"
                  }}
                >
                  {sendstop ?(
                  <button className="send_btn" type="submit" onClick={(e)=>{sendButton(e)}}> 
                    <img
                      style={{ width: 20 }}
                      src={mbl_send}
                    />
                  </button>
                  ):(
                  <button className="send_btn" type="submit">
                    <img
                      style={{ width: 20 }}
                      src={stop}
                    />
                  </button>
                  )}
                </div>
              </div>
              <p
                style={{
                  fontSize: 10,
                  textAlign: "center",
                  margin: 0,
                  paddingTop: 2
                }}
              >
                Powered by Hard n Soft Technologies. Subscribed to Acumen
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>






<div  className="modal fade"id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true"style={{ cursor: "pointer" }}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="ms-auto">
        <button type="button" className="modal_btn_close_question" data-bs-dismiss="modal" aria-label="Close" >
          <i className="fa fa-times" />
        </button>
      </div>
      <div className="modal-body">
        <h5 className="mb-3 text-center">Suggested Questions</h5>
        <ul className="p-0">

        { question  && question.map(item => (    
          <li className="list">
            <p className="list_txt" key={item.question} onClick={()=>{suggestion(item)}}>{item.question }</p>
          </li>
           ))}
        </ul>
      </div>
    </div>
  </div>
</div>

</>


)
    
}
export default HomePage;