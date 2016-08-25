import {Component} from 'react';
import './style.scss';
import TopMenu from 'doc/components/top-menu';

export default class extends Component {
  state = {
    menus: [
      {label: '介绍', to: '/md'},
      {label: '组件', to: '/component'}
    ]
  };

  render() {
    return (
      <div className="app-container">
        <TopMenu menus={this.state.menus}/>
        {this.props.children}
      </div>
    );
  };
};
