import './assets/styles/login.scss';

function Login() {
  return (
    <form>
      <div className="imgcontainer">
        {/* <img  className="avatar" /> */}
        <h1>Boodu</h1>
      </div>

      <div className="container">
        <label htmlFor="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required />

        <button type="submit">Login</button>
      </div>

      <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
        <span className="psw">Forgot <a href="#">password?</a></span>
      </div>
    </form>
  );
}

export default Login;
