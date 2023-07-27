import React,{useState} from 'react'
import axios from 'axios'
import {  toast } from 'react-toastify';
import {createSearchParams, useNavigate} from 'react-router-dom'
import Home from './Home';



const LoginForm: React.FC = () =>{
    const [showForm,setShowForm] = useState(true);
    const [loginUsername,setLoginUsername] = useState("");
    const [signUpUsername,setSignUpUsername] = useState("");
    const [userNickname,setUserNickname] = useState("");
    const [userData,setUserData]= useState("");
    const navigate = useNavigate();

    const url: string = 'https://api-0C7E1462-839A-40B0-B4AC-5AED617BC521.sendbird.com/v3/';
    const header={
      'Content-Type': 'application/json; charset=utf8',
      'Api-Token': 'ac1eb1b9b8f15e36e6181c60fadc0880bc9abeae'
    }

    const showForms = () => {
        setShowForm(!showForm);
    }
    const submitLoginForm = (event:React.FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
      loginUser();
    }
    const submitSignUpForm = (event:React.FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
      signUpUser();
    }
    const userDetails = (newData:any) =>{
      console.log(newData);
      setUserData(newData);
      navigate({
        pathname: "/home",
        search : createSearchParams({
            id: newData['user_id']
        }).toString()

    });
    }
    const loginUser = async() =>{
      console.log(loginUsername);
      try {
        const {data} = await axios({
          method:'get',
          url: url+'users/'+loginUsername,
          headers: header
        })
        userDetails(data)
      } catch (error) {
        console.log(error);
        if(loginUsername)
        {
          toast.error('Invalid Username', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
        
          
      }


    }
    const signUpUser = async() =>
    {
      showForms();
      console.log(signUpUsername);
      console.log(userNickname);
      const body_data ={
        "user_id": signUpUsername,
        "nickname": userNickname,
        "profile_url": null,
        "profile_file": null,
        "issue_access_token": true,
      };
      try {
        const {res_data}:any = await axios({
          method:'post',
          url: url+'users',
          headers: header,
          data: body_data
        })
        userDetails(res_data)
        toast.success('User successfully created', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      } catch (error) {
        console.log(error);
        if(signUpUsername)
        {
          toast.error('Enter an unique username', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
          
      }
    }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        {
          showForm && (
            <form onSubmit={submitLoginForm} style={{
              borderRadius: '5px',
              backgroundColor: '#f2f2f2',
              padding:'20px'
            }
            }>
                <div>
                    <h2>Login</h2>
                </div>
              <div>
                <label>Username:
                  <input
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      margin: '8px 0',
                      display: 'inline-block',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                    type='text'
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <input style={{
                  width: '100%',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '14px 20px',
                  margin: '8px 0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }} type="submit" value="Submit"></input>
              </div>
              <div><button style={{
                  width: '100%',
                  fontSize:'15px',
                  color: 'navy',
                  padding: '14px 20px',
                  margin: '8px 0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
              }} onClick={signUpUser}>
                New User? Sign up now
                </button></div>
            </form>
          )
        }
        {
          !showForm && (
            <form onSubmit={submitSignUpForm} style={{
              borderRadius: '5px',
              backgroundColor: '#f2f2f2',
              padding:'20px'
            }
            }>
                <div>
                    <h2>Sign Up</h2>
                </div>
              <div>
                <label>Username:
                  <input
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      margin: '8px 0',
                      display: 'inline-block',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                    type='text'
                    value={signUpUsername}
                    placeholder='*Enter a Unique Username'
                    onChange={(e) => setSignUpUsername(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>Nickname:
                  <input
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      margin: '8px 0',
                      display: 'inline-block',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                    type='text'
                    value={userNickname}
                    onChange={(e) => setUserNickname(e.target.value)}
                  />
                </label>
                <input style={{
                  width: '100%',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '14px 20px',
                  margin: '8px 0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }} type="submit" value="Submit"></input>
              </div>
              <div><button style={{
                  width: '100%',
                  fontSize:'15px',
                  color: 'navy',
                  padding: '14px 20px',
                  margin: '8px 0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
              }} onClick={signUpUser}>
                Existing User? Login now!
                </button></div>
            </form>
          )
        }
    </div>
  )
}

export default LoginForm