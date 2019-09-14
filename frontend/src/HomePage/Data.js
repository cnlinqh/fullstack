import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dataActions } from '../_actions';

class EditableCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    onFocus() {
        this.setState({ editing: true }, () => {
            this.refs.input.focus();
            this.refs.input.value = this.props.message;
        });
    }
    onBlur() {
        this.setState({ editing: false });
    }

    onChange() {
        this.props.handleMessageEditing(this.props.id, this.refs.input.value);
    }

    render() {
        return this.state.editing ?
            <input ref='input' onBlur={() => this.onBlur()} onChange={() => this.onChange()}></input> :
            <div onClick={() => this.onFocus()}>{this.props.message}</div>
    }
}

class Data extends Component {

    constructor(props) {
        super(props);
        this.handleMessageEditing = this.handleMessageEditing.bind(this);
        this.handleMessageUpdate = this.handleMessageUpdate.bind(this);
        this.handleMessageDelete = this.handleMessageDelete.bind(this);
        this.handleMessageAdd = this.handleMessageAdd.bind(this);
        this.findItemById = this.findItemById.bind(this);
    }
    handleMessageEditing(id, message) {
        //this.props.updateData(this.findItemById(id)._id, message);
        this.props.editingData(id, message);
    }

    handleMessageUpdate(event) {
        let item = this.findItemById(parseInt(event.target.id));
        this.props.updateData(item._id, item.id, item.message);
    }

    handleMessageDelete(event) {
        this.props.removeData(this.findItemById(parseInt(event.target.id))._id);
    }

    handleMessageAdd() {
        let currentIds = this.props.dataList.map(data => data.id);
        let id = 0;
        while (currentIds.includes(id)) {
            ++id;
        }
        this.props.createData(id, this.refs.input.value);
    }

    findItemById = (id) => {
        console.log(id);
        var re = {};
        for (var item of this.props.dataList) {
            if (item.id === id) {
                re = item;
                break;
            }
        }
        console.log(JSON.stringify(re));
        return re;
    }

    componentDidMount() {
        this.props.getDataList()
    }

    render() {
        const { dataList } = this.props;
        return (
            <div>
                <h3>All data:</h3>
                < div>
                    <input ref="input"
                        type="text"
                    />
                    <button onClick={this.handleMessageAdd}>Add</button>
                    <button onClick={() => this.props.getDataList()} >Refresh</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataList.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        <EditableCell id={item.id} message={item.message} handleMessageEditing={this.handleMessageEditing} />
                                    </td>
                                    <td>
                                        <button onClick={this.handleMessageDelete} id={item.id}>Delete</button>
                                        <button onClick={this.handleMessageUpdate} id={item.id}>Update</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { dataList } = state.data;
    return { dataList }
}
const mapDispatchToProps = {
    getDataList: dataActions.getDataList,
    editingData: dataActions.editingData,
    updateData: dataActions.updateData,
    removeData: dataActions.removeData,
    createData: dataActions.createData
}
const connectedData = connect(mapStateToProps, mapDispatchToProps)(Data)
export { connectedData as Data };