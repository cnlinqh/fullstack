import React, { Component } from 'react';
import EditableCell from './EditableCell'
class Row extends Component {

    constructor(props) {
        super(props);
        this.handleMessageChang = this.handleMessageChang.bind(this);
        this.state = {
            msg: this.props.message
        }
    }

    deleteRow() {
        this.props.deleteFromDB(this.props.id);
        // this.props.getDataFromDB();
    };

    updateRow() {
        this.props.updateDataToDB(this.props.id, this.state.msg);
        // this.props.getDataFromDB();
    };

    handleMessageChang(msg) {
        // var msg = event.currentTarget.textContent;
        this.setState({ msg: msg });
    };

    render() {
        return (
            <tr>
                <td className="idColumn">{this.props.id}</td>
                <td><EditableCell message={this.state.msg} handleMessageChang={this.handleMessageChang}></EditableCell></td>
                <td className="actionsColumn">
                    {/* ES6 => function*/}
                    <button onClick={() => this.deleteRow()}>Delete</button>
                    {/* ES5 bind method is needed*/}
                    <button onClick={this.updateRow.bind(this)}>Update</button>
                </td>
            </tr>
        );
    }
}
export default Row;