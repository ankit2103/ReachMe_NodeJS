import { useContext, useRef } from "react";
import { useHistory } from "react-router";
import "./login.css";
import { loginCall } from "../../apiCalls";
import $ from 'jquery';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


export default function Login() {
  const email = useRef();
  const password = useRef();
  const {  dispatch } = useContext(AuthContext);


  const username = useRef();
  const newemail = useRef();
  const newpassword = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const Toggle = (e) => {
    if (e.target.id === 'sign-in-btn') {
      $('.container').removeClass('sign-up-mode');
    } else {
      $('.container').addClass('sign-up-mode');
    }
  }

  const login = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );

    console.log(dispatch);
  };

  const signup = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== newpassword.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: newemail.current.value,
        password: newpassword.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }

    console.log(dispatch);
  };

  return (
    <div>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={login} className="form sign-in-form">
              <h2 className="title">Sign in</h2>

              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type='email' placeholder='Please enter your email' required ref={email}/>

              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type='password' placeholder='Please enter your password' minLength='6' required ref={password}/>

              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="/" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form onSubmit={signup} className="form sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type='text' placeholder='Please enter username' ref={username} required />
                
              </div>

              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type='email' placeholder='Please enter email' ref={newemail}required />

              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type='password' placeholder='Please enter password' ref={newpassword} minLength='6' required />

              </div>

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type='password' placeholder='Please re-enter password' ref={passwordAgain} minLength='6' required />

              </div>
             
              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="/" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                ex ratione. Aliquid!
              </p>
              <button className="btn transparent" id="sign-up-btn" onClick={Toggle} >
                Sign up
              </button>
            </div>
            <img src='../../../public/assets/desk.svg' className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button className="btn transparent" id="sign-in-btn" onClick={Toggle}>
                Sign in
              </button>
            </div>
            <img src='../../../public/assets/desk.svg' className="image" alt="" />
          </div>
        </div>
      </div>
    </div>


    // <div className="login">
    //   <div className="loginWrapper">
    //     <div className="loginLeft">
    //       <h3 className="loginLogo">Lamasocial</h3>
    //       <span className="loginDesc">
    //         Connect with friends and the world around you on Lamasocial.
    //       </span>
    //     </div>
    //     <div className="loginRight">
    //       <form className="loginBox" onSubmit={handleClick}>
    //         <input
    //           placeholder="Email"
    //           type="email"
    //           required
    //           className="loginInput"
    //           ref={email}
    //         />
    //         <input
    //           placeholder="Password"
    //           type="password"
    //           required
    //           minLength="6"
    //           className="loginInput"
    //           ref={password}
    //         />
    //         <button className="loginButton" type="submit" disabled={isFetching}>
    //           {isFetching ? (
    //             <CircularProgress color="white" size="20px" />
    //           ) : (
    //             "Log In"
    //           )}
    //         </button>
    //         <span className="loginForgot">Forgot Password?</span>
    //         <button className="loginRegisterButton">
    //           {isFetching ? (
    //             <CircularProgress color="white" size="20px" />
    //           ) : (
    //             "Create a New Account"
    //           )}
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}
