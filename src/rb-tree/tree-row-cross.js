import React from 'react';

module.exports = class extends React.Component {
  static defaultProps = {
    key: ''
  }

  render() {
    var handleWrapperClassName = this.props.foldable ? (this.props.isExpanded ? 'handle--expanded' : 'handle--collapsed') : '';

    return (
      <div className={'rb-tree__node__row ' + (this.props.className || '')} key={this.props.key}>
        <div className={'rb-tree__node__row__handle ' + handleWrapperClassName}>
          <div className="rb-tree__node__row__handle__guide"></div>
          <div className="cross-wrap" onClick={this.props.onFold}>
            <div className="cross-v"></div>
            <div className="cross-h"></div>
          </div>
        </div>
        {this.props.children}
      </div>);
    }
}
