import React, { Component } from 'react';

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
        this.props.handleMessageChang(this.refs.input.value);
    }

    render() {
        return this.state.editing ?
            <input ref='input' onBlur={() => this.onBlur()} onChange={() => this.onChange()}></input> :
            <div onClick={() => this.onFocus()}>{this.props.message}</div>
    }
}
export default EditableCell;