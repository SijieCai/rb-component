import React from 'react';
import LeftMenu from 'doc/components/left-menu';
const {docs} = require('doc/includes');
const MENUS = Object.keys(docs).map(key=>{
  return {
    label: key,
    to: `/component/detail/${key}`
  }
});

export default class extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  state = {
    menus: MENUS
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="app__content" ref="container">
        <LeftMenu menuGroups={this.state.menus}/>
        {this.props.children}
      </div>
    );
  };
};
