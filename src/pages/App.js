import React, { Component } from 'react';
import LoginBtn from './btn_login_base.png'
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import config from '../controller/config.js'
import HealthCheck from './HealthCheck'
import VerticalCentered from '../components/VerticalCentered'
import LoadingContainer from '../components/LoadingContainer'
import queryString from 'query-string'
import { getAccessToken } from '../controller/lineService'
import { Spin, Layout } from 'antd'
import 'antd/dist/antd.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      verified: false,
      loading: false,
    }
  }
  componentDidMount() {
    const { props } = this
    if (window.sessionStorage.getItem('accessToken')) {
      this.setState({ verified: true })
    }
    else if (props.location.search) {
      this.setState({ loading: true })
      const query = queryString.parse(props.location.search)
      getAccessToken(query.code).then(res => {
        if (res.access_token) {

          window.sessionStorage.setItem('accessToken', res.access_token)
          this.setState({ verified: true, loading: false })
        }
        else {

          window.sessionStorage.removeItem('accessToken')
          window.location.href = '/'
          this.setState({ loading: false })
        }
      })
    }


  }



  render() {
    const { state } = this
    if (state.loading) {
      return (
        <Layout>
          <LoadingContainer height="100vh">
            <VerticalCentered>
              <Spin tip="Loading..." spinning={state.loading} />
            </VerticalCentered>
          </LoadingContainer>
        </Layout>
      )
    }
    return (
      <>
        {state.verified ? (
          <Switch>
            <Route path="/healthCheck" component={HealthCheck} />
            <Redirect from="*" to='/healthCheck' />
          </Switch>
        ) :
          (<div className="App">
            <header className="App-header">
              <a href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${config.clientId}&redirect_uri=${process.env.REACT_APP_HOSTING || 'http://localhost:3000'}&state=12345abcde&scope=openid%20profile%20email`}>
                <img src={LoginBtn} alt=""></img>
              </a>

            </header>
          </div>)}
      </>
    );
  }
}

export default App;
