import React from 'react';
import './style.css';

class Layout extends React.Component {
  componentDidMount() {
    var topElement = this.refs['rb-layout__top'];
    var bottomElement = this.refs['rb-layout__bottom'];
    if(!topElement || !bottomElement) {
      return;
    }
    bottomElement.style.setProperty('padding-top', topElement.offsetHeight + 'px');
  }

  render() {
    return (
      <div className="rb-layout">
        {React.Children.map(this.props.children, (element) => {
          return React.cloneElement(element, { ref: element.props.className });
        })}
      </div>
    );
  }
}

export default Layout;
export {Layout};
