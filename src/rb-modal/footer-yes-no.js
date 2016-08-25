import React from 'react';

export default class extends React.Component {
  render(){
    return (
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary " disabled={this.props.disabled} onClick={this.props.onYes}>{this.props.yesLabel || '确定'}</button>
        <button type="button" className="btn btn-default btn-margin--left" onClick={this.props.onNo}>{this.props.noLabel || '取消'}</button>
      </div>
    );
  }
}