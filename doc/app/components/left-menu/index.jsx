import React from 'react';
import {Link} from 'react-router';
import './style.scss';

export default class extends React.Component {
  static defaultProps = {
    menuGroups: []
  }

  state = {
    hideGroup: {}
  }

  handleExpand = (i)=>{
    this.state.hideGroup[i] = !this.state.hideGroup[i];
    this.forceUpdate();
  }

  buildMenu(item) {
    return (
      <div className="left-menu__item left-menu__item--group">
        <Link activeClassName="active-menu" to={item.to}>
          <span className={`first-menu-item ${item.icon}`}></span>
          <span className="text">
            <span>{item.label}</span>
          </span>
        </Link>
      </div>
    );
  }

  render () {
    return (
      <header className="left-menu-component">
        <div className="left-menu__content">
          {this.props.menuGroups.map((item, i) =>
            <div key={i} className="left-menu__group">
              {this.buildMenu(item, i)}
            </div>
          )}
        </div>
      </header>
    );
  }
}
