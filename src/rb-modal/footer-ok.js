import React from 'react';

export default class extends React.Component {
  render(){
    return (
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary modal__btn-confirm" onClick={this.props.onOk}>确定</button>
      </div>
    );
  }
}