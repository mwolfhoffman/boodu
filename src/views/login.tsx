import "../assets/styles/login.scss";
import { useEffect } from 'react';

function Login() {

  const onGithubSuccess = (response: any) => console.log(response);
  const onGithubFailure = (response: any) => console.error(response);

  const githubLogin = (event: any) => {
    // https://www.graphql.college/implementing-github-oauth-flow/
    event.preventDefault()
    const foo = process.env.REACT_APP_AUTH_REDIRECT;
    debugger
    window.location.href = ` http://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_AUTH_REDIRECT}/oauth_redirect`;
  }

  useEffect(() => {
    if (window.location.href.includes("/login/oauth2/code/github/oauth_redirect?code=")) {
      const codeParam = '?code=';
      const tokenStart = window.location.href.indexOf(codeParam);
      const token = window.location.href.slice(tokenStart + codeParam.length)

      //  TODO: CANNOT SEND FROM CLIENT. Need API req or cloud function.
      
      // const accessTokenUrl = `https://github.com/login/oauth/access_token?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_AUTH_REDIRECT}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&code=${token}`;
      // fetch(accessTokenUrl, { method: 'POST' })
      //   .then(response => {
      //     if (response.ok) {
      //       response.json()
      //         .then(data => {
      //           debugger
      //         })
      //     } else {
      //       //  TODO: handle error
      //     }
      //   })
    }
  }, [])

  return (
    <div className="container">
      <form>
        <div className="row">
          <h2 style={{ textAlign: 'center' }}>Login</h2>


          <div className="center">
            <a onClick={event => githubLogin(event)} className="github btn"><i className="fa fa-github fa-fw">
            </i> Login with Github
        </a>
          </div>
        </div>
      </form>
    </div>
  );

}

export default Login;
