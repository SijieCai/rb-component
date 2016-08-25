import React from 'react';

export default class extends React.Component {
  static defaultProps = {
    key: ''
  }
  render() {
    return (
      <div className="rb-tree__node__children" key={this.props.key}>
        <div className="rb-tree__node__children__indent"></div>
        <div className="rb-tree__node__children__block">
          {this.props.children}
        </div>
      </div>);
  }
}
