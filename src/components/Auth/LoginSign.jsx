import { useRef, useState } from "react";
import classes from "./LoginSign.module.css"
import { useDispatch } from "react-redux";
import { authActions } from "./AuthSlice";
const LoginSign = () => {
  const [toggler,setToggler] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const toggleHandler = () => {
    setToggler(!toggler);
  }

  const signUpHandler = async (event) => {
    event.preventDefault();
    if(!emailRef.current.value || !passwordRef.current.value){
      alert("Please Enter All the Data");
      return;
    }

    try{
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCG8ycfACaCjzv3zmrRKeeeK8YQQ7lkMDE',{
        method:'POST',
        headers:{
          'Content-Type': 'application.json'
        },
        body:JSON.stringify({
          email:emailRef.current.value,
          password:passwordRef.current.value,
          returnSecureToken:true,
        }),
       });

       if(!response.ok){
        throw new Error("Something went Wrong unable to Sign UP" + response.error);
       }

       const data = await response.json();
       console.log("Login Successfull",data);
    }

    catch(error){
      alert(error);
      
    }

    emailRef.current.value = '';
    passwordRef.current.value = '';
  }
  
  const loginHandler = async (event) => {
    event.preventDefault();
    if(!emailRef.current.value || !passwordRef.current.value){
      alert("please fill all the data");
      return;
    }

    try{
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCG8ycfACaCjzv3zmrRKeeeK8YQQ7lkMDE',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json '
        },
        body:JSON.stringify({
          email:emailRef.current.value,
          password:passwordRef.current.value,
          returnSecureToken:true,
        }),
      });

      if(!response.ok){
        throw new Error("Unable to Login");
      }

      const data = await response.json();

      console.log("logged in",data);
      dispatch(authActions.login(data.idToken));
    }
    catch(error){
      alert(error);
      
    }
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }

  return (
    <main className={classes.auth}>
    <h1 className={classes.authHeading}>MAILBOX</h1>
      <section >
        <form onSubmit={toggler ? signUpHandler : loginHandler}>
          <div className={classes.control}>
            <label>Email</label>
            <input type='email' placeholder="Enter Your Email" ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label>Password</label>
            <input type='password'  placeholder="Password" ref={passwordRef}/>
          </div>

          <div className={classes.toggler} onClick={toggleHandler}>{toggler? 'LogIn to Existing':'Create New Account'}</div>
          <button className = {classes.authBtn} type='submit'>{toggler ? 'Sign Up' : 'LogIn'}</button>
        </form>
      </section>
    </main>
  );
};

export default LoginSign;