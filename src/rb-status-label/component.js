import React from 'react';
export default class extends React.Component {
  render() {
    return (
      <div className={`rc-status-label rc-${this.props.type || 'dot'}-status rc-status-${this.props.status || 'ok'}`}>
        <span>{this.props.label}</span>
      </div>    
    );
  }
}
