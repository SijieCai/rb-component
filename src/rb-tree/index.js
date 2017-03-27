import React from 'react';
import Node from './tree-node';
import Children from './tree-children';
import RowCircle from './tree-row-circle';
import RowCross from './tree-row-cross';
import './style.scss';

class RBTree extends React.Component {
  render() {
    return (
      <div className={'rb-tree ' + (this.props.classWrapper || '')}>
        {this.props.children}
      </div>);
  }
}
RBTree.Children = Children;
RBTree.Node = Node;
RBTree.RowCircle = RowCircle;
RBTree.RowCross = RowCross;

module.exports = RBTree;