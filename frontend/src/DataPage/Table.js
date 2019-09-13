import React, { Component } from "react";
import Header from './Header';
import Row from './Row'
import axios from "axios";
import '../style.css'
import dotenv from 'dotenv'
dotenv.config();
var BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
console.log(BACKEND_URL);
class Table extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  componentDidMount() {
    this.getDataFromDB();
  }

  findItemById = (id) => {
    var re = {};
    for (var item of this.state.data) {
      if (item.id === id) {
        re = item;
        break;
      }
    }
    return re;
  }

  removeItemById = (id) => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === id) {
        this.state.data.splice(i, 1);
        this.setState({ data: this.state.data });
        break;
      }
    }
  }

  getDataFromDB = () => {
    fetch(BACKEND_URL + "/api/getData")
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data.messages });
        console.log(JSON.stringify(data.messages, null, 2));
      })
      .catch(err => console.log(err));
  };

  updateDataToDB = (idToUpdate, updateToApply) => {
    console.log(idToUpdate + " : " + updateToApply)
    axios
      .post(BACKEND_URL + "/api/updateData", {
        id: this.findItemById(idToUpdate)._id,
        update: { message: updateToApply }
      });
  };

  putDataToDB = message => {
    console.log(message);
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    axios
      .post(BACKEND_URL + "/api/putData", {
        id: idToBeAdded,
        message: message
      })
      .then(() => this.getDataFromDB());
  };

  deleteFromDB = idToDelete => {
    console.log(idToDelete);
    axios
      .delete(BACKEND_URL + "/api/deleteData", {
        data: {
          id: this.findItemById(idToDelete)._id
        }
      })
      .then(() => this.removeItemById(idToDelete));
  };

  render() {
    return (
      <div>
        <div>
            <h2>Backend URL: {BACKEND_URL}</h2>
        </div>
        <div>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="Message"
            className="input"
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>Add</button>
          <button onClick={() => this.getDataFromDB()}>Refresh</button>
        </div>
        <div>
          <table className="blueTable">
            <Header></Header>
            <tbody>
              {this.state.data.map(item => (
                <Row key={item.id} id={item.id} message={item.message}
                  deleteFromDB={this.deleteFromDB}
                  updateDataToDB={this.updateDataToDB}
                  getDataFromDB={this.getDataFromDB}>
                </Row>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
