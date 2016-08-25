import {Component} from 'react';
import LeftMenu from 'doc/components/left-menu';
import './style.scss';

export default class extends Component {
  state = {
    markdown: '',
    menus: [
      {to: '/md/page/index', label: '介绍'},
      {to: '/md/page/route', label: '路由'},
      {to: '/md/page/component', label: '组件'},
      {to: '/md/page/process', label: '开发环境'}
    ]
  };

  render() {
    return (
    <div className="app__content">
      <LeftMenu menuGroups={this.state.menus}/>
      {this.props.children}
    </div>
    );
  };
};