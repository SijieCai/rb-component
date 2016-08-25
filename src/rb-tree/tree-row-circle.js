import React from 'react';

export default class extends React.Component {
  static defaultProps = {
    key: ''
  }
  render() {
    var handleWrapperClassName = this.props.foldable ? (this.props.isExpanded ? 'guide--expand' : 'guide--collapse') : '';
    return (
      <div className={'rb-tree__node__row ' + (this.props.className || '')} key={this.props.key}>
        {this.props.noHandle ? null :
          <div className={'rb-tree__node__row__handle ' + handleWrapperClassName}>
            <div className="rb-tree__node__row__handle__guide"></div>
            <div className="circle-wrap" onClick={this.props.onFold}>
              <div className="circle">
                <div className="circle-v"></div>
                <div className="circle-h"></div>
              </div>
            </div>
          </div>
        }
        {this.props.children}
      </div>);
  }
}
