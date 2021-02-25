import "../assets/styles/login.scss";
import { useEffect } from "react";
import axios from "axios";
import * as Cookie from "js-cookie";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const onGithubSuccess = (response: any) => console.log(response);
  const onGithubFailure = (response: any) => console.error(response);

  const githubLogin = (event: any) => {
    event.preventDefault();
    window.location.href = ` http://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_AUTH_REDIRECT}/oauth_redirect`;
  };

  useEffect(() => {
    if (
      window.location.href.includes(
        "/login/oauth2/code/github/oauth_redirect?code="
      )
    ) {
      const codeParam = "?code=";
      const tokenStart = window.location.href.indexOf(codeParam);
      const token = window.location.href.slice(tokenStart + codeParam.length);

      if (process?.env?.REACT_APP_GITHUB_ACCESS_TOKEN_URL) {
        axios
          .post(
            process.env.REACT_APP_GITHUB_ACCESS_TOKEN_URL,
            { token },
            { headers: { "content-type": "application/json" } }
          )
          .then((response: any) => {
            if (response.data) {
              const tokenStartDelimiter = "access_token";
              const accessTokenStart = response.data.indexOf(
                tokenStartDelimiter
              );
              if (accessTokenStart > -1) {
                const tokenEndDelimter = "&scope";
                const tokenEndIndex = response.data.indexOf(tokenEndDelimter);
                const accessToken = response.data.slice(
                  accessTokenStart + tokenStartDelimiter.length + 1,
                  tokenEndIndex
                );
                if (accessToken) {
                  Cookie.set("access_token", accessToken);
                  history.push("/dashboard");
                } else {
                  history.push("/");
                }
              }
            }
          });
      }
    }
  }, []);

  return (
    <div className="container">
      <form>
        <div className="row">
          <h2 style={{ textAlign: "center" }}>Login</h2>

          <div className="center">
            <a onClick={(event) => githubLogin(event)} className="github btn">
              <i className="fa fa-github fa-fw"></i> Login with Github
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
