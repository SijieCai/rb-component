import React from 'react';

export default class extends React.Component {
  render(){
    var map = {
      // danger: 'glyphicon-remove-sign text-danger',
      // warning: 'glyphicon-exclamation-sign text-warning'
      success: 'add-sign',      
      danger: 'remove-sign',
      warning: 'exclamation-sign'
    };
    var className = map[this.props.type] || map.warning;
    return (
      <div className="modal-body">
        <div className="container-fluid">
          {/*<span className={'col-md-2 modal-body__icon text-right glyphicon ' + className} aria-hidden="true"/>*/}
          <span className={'col-md-2 modal-body__icon text-right customicon ' + className} aria-hidden="true"/>
          <span className="col-md-9 modal-body__desc">
            {this.props.children}
          </span>
        </div>
      </div>
    );
  }
}
