import React, { Component } from 'react';
import Axios from 'axios';


class DisplayItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editItem: false,
            itemDescription: this.props.itemData.description
        }
    }

    handleEdit = (event) => {
        this.setState({
            itemDescription: event.target.value
        })
    }


    itemRender = () => {
        if (this.state.editItem) {
            return (
                <div>
                    <input type='text' value={this.state.itemDescription} onChange={this.handleEdit} />
                    <button onClick={this.editItem}>Submit Edit</button>
                </div>
            )
        } else if (!this.state.editItem) {
            return (

                <div>not editing<br />
                    {this.state.itemDescription}
                </div>
            )
        }
    }

    toEdit = () => {

        if (this.state.editItem === true) {
            this.setState({
                editItem: false
            });
        } else if (this.state.editItem === false) {
            this.setState({
                editItem: true
            });
        }
        console.log(this.state.editItem);
    }

    editItem() {
        try {
            console.log('in editItem', this.state.itemDescription);
            const editId = this.state.itemDescription;

            Axios({
                method: 'PUT',
                url: '/api/shelf/',
                data: editId
            }).then((response) => {
                console.log('Edit works!');
            }).catch((error) => {
                console.log('error editing item', error);
            })

        }
        catch (error) {
            console.log('Put request not working', error);

        }


    }

    render() {
        return (
            <div>
                {this.itemRender()}
                <button onClick={this.toEdit}>Edit Item</button>
            </div>

        )

    }
}

// this allows us to use <App /> in index.js
export default DisplayItem;
