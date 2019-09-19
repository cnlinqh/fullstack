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
            <input className="col-md-12" ref='input' onBlur={() => this.onBlur()} onChange={() => this.onChange()}></input> :
            <div className="col-md-12" onClick={() => this.onFocus()}>{this.props.message}</div>
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
        var re = {};
        for (var item of this.props.dataList) {
            if (item.id === id) {
                re = item;
                break;
            }
        }
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
                < div className="row scrollable">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center">ID</th>
                                <th className="text-center">Message</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="col-md-1">

                                </td>
                                <td className="col-md-9">
                                    <input className="col-md-12" ref="input" type="text" />
                                </td>
                                <td className="col-md-2 text-center">
                                    <div className="btn-group text-center" role="group">
                                        <button type="button" className="btn btn-success glyphicon glyphicon-plus" onClick={this.handleMessageAdd} />
                                        <button type="button" className="btn btn-info glyphicon glyphicon-refresh" onClick={() => this.props.getDataList()} />
                                    </div>
                                </td>
                            </tr>
                            {
                                dataList.map(item => (
                                    <tr key={item.id}>
                                        <td className="col-md-1">
                                            {item.id}
                                        </td>
                                        <td className="col-md-9">
                                            <EditableCell id={item.id} message={item.message} handleMessageEditing={this.handleMessageEditing} />
                                        </td>
                                        <td className="col-md-2 text-center">
                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-warning glyphicon glyphicon-floppy-save" onClick={this.handleMessageUpdate} id={item.id} />
                                                <button type="button" className="btn btn-danger glyphicon glyphicon-remove" onClick={this.handleMessageDelete} id={item.id}></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
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