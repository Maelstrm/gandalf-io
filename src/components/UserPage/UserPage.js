import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Axios from 'axios';


const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {
constructor(props) {
  super(props);
  this.state = {
    itemCount: [],
  }
}

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getItemCount();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  getItemCount = () => {
    console.log('in getUserCount');
    Axios({
      method: 'GET',
      url: '/api/shelf/count'
    }).then((response) => {
      console.log('get countback from database:', response.data);
      this.setState({
        itemCount: response.data
      });
    }).catch((error) => {
      console.log('error getting items:', error);
      alert('error getting items');
    })
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <p>Your ID is: {this.props.user.id}</p>

          <div>
            {this.state.itemCount.map((item, i) => {
              return (<div>{item.count}, {item.username}</div>)
            })}
          </div>

          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

