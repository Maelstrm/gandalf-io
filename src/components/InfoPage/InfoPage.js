import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Axios from 'axios';
import DisplayItem from '../DisplayItem/DisplayItem';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: {
        description: '',
        image_url: ''
      },
      shelfItems: [],
    }
    // data is from database is currently store in this state will be moved to redux state and reducers
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

    this.getItems();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleChange = (event) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        description: event.target.value
      }
    })
  }

  handleImageChange = (event) => {
    this.setState({

      newItem: {
        ...this.state.newItem,
        image_url: event.target.value,
      }
    })
  }

  //POST ROUTE to add items to shelf
  addItem = (event) => {
    console.log('in addItem', this.state.newItem);
    event.preventDefault();
    Axios({
      method: 'POST',
      url: '/api/shelf',
      data: this.state.newItem
    }).then((reponse) => {
      //THIS IS WHERE THE GET FUNCTION WOULD BE CALLED
      this.getItems();
    }).catch((error) => {
      console.log('error in addItem', error);
    })
  }

  //GET ROUTE to get all items from database to display on shelf
  getItems = () => {
    console.log('in getItems');
    Axios({
      method: 'GET',
      url: '/api/shelf'
    }).then((response) => {
      console.log('back from database:', response.data);
      //DO THIS LATER  add response.data to redux store so we can parse and display on dom
      //currently adding response.data to local state
      this.setState({
        shelfItems: response.data
      });
    }).catch((error) => {
      console.log('error getting items:', error);
      alert('error getting items');
    })
  }

  deleteItem = (event) => {
    console.log('in deleteItem');
    const itemId = event.target.value;
    Axios({
      method: 'DELETE',
      url: '/api/shelf/' + itemId,
    }).then((response) => {
      this.getItems();
    }).catch((error) => {
      console.log('error making delete', error);
      alert('ERROR caught making delete request');
    })
  }

 

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>

          <h1>Add shelf items:</h1>
          <form onSubmit={this.addItem}>
            <div className="inputDiv">
              <input type="text" name="itemDescription" placeholder="description" onChange={this.handleChange} value={this.state.newItem.description} />
            </div>
            <div>
              <input type="text" name="itemImage" placeholder="image" onChange={this.handleImageChange} value={this.state.newItem.image_url} />
            </div>
            <div className="buttonDiv">
              <button>Submit</button>
            </div>
          </form>
          <div >
            {/* map items from database to li on dom */}
            {this.state.shelfItems.map((item, i) => {
              return (
                <DisplayItem key={i} itemData={item} />
              );
            })}
          </div>
          
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
