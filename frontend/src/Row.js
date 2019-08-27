import React, { Component } from 'react';
class Row extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            message: props.message
        };
        this.msgRef = React.createRef();
    }


    deleteRow() {
        this.props.deleteFromDB(this.props.id);
        this.props.getDataFromDB();
    };

    updateRow() {
        this.props.updateDataToDB(this.props.id, this.state.message);
        this.props.getDataFromDB();
    };

    onMessageChange(event) {
        var msg = event.currentTarget.textContent;
        this.setState({message:msg});
    };

    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                {/* <td contenteditable="true" onKeyUp={this.onMessageChange.bind(this)}>
                    {this.props.message}
                </td>
                <td contenteditable="true">
                    <input contenteditable="true" type="text" value={this.props.message}></input>
                </td> */}
                <td>
                    <div contentEditable="true" >
                        <input contentEditable="true" ref={this.msgRef} >
                        
                        </input>
                    </div>
                </td>
                <td >
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