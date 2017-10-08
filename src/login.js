import React from 'react';

const Login = (props) => (

  <section className="hero is-fullheight is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <article className="card is-rounded">
                <div className="card-content">
                                   
                  <p className="control has-icon">
                    <input className="input" type="email" placeholder="Email"/>
                    <i className="fa fa-envelope"></i>
                  </p>
                  <p className="control has-icon">
                    <input className="input" type="password" placeholder="Password" />
                    <i className="fa fa-lock"></i>
                  </p>
                  <p className="control">
                    <label className="checkbox">
                      <input type="checkbox"/>
                      Remember me
                    </label>
                  </p>
                  <p className="control">
                    <button className="button is-primary is-medium is-fullwidth">
                      <i className="fa fa-user"></i>
                      Login
                    </button>
                  </p>
                </div>
              </article>
            </div>
          </div>
    </div>
  </section>

)

export default Login;
