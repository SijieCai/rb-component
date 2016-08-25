function render({RBTree}) {
  const {RowCross, Children, Node} = RBTree;
  const Row = RowCross;
  const key = 'id';
  if(!this.state.initRBTree) {
    this.state.initRBTree = true;
    this.state.trees = 
    [{
      id: 0, children: [{
        id: 1,
        children: [{
          id: 6,
          children: [{
            id: 7
          }]
        }]
      }, {
        id: 2,
        children: [{
          id: 3
        }, {
          id: 4,
          children: [{
            id: 5
          }]
        }]
      }]
    }, {id: 9}];
    this.state.treeState = {};
  }

  this.handleFold = (id)=>{
    let treeState = this.state.treeState;
    treeState[id] = !treeState[id];
    this.setState({treeState});
  }
  const buildNodeRow = (nodeObj, isRoot)=><div>this is node {nodeObj.id} {isRoot ? '(根节点)' : ''}</div>;
  const buildNode = (nodeObj, rowBuilder, isRoot)=>{
    var id = nodeObj[key];
    var isExpanded = this.state.treeState[id];
    return <Node key={id}>
      <Row
          noHandle={isRoot}
          foldable={nodeObj.children && nodeObj.children.length}
          isExpanded={isExpanded}
          onFold={()=>this.handleFold(id)}
      >
        {rowBuilder(nodeObj, isRoot)}
      </Row> 
      {(isExpanded) ?
      <Children>
        {(nodeObj.children || []).map((childObj, i)=>
          buildNode(childObj, rowBuilder, false)
        )}
      </Children> : null}
    </Node> 
  };

  return (
    <RBTree>
      {this.state.trees.map(tree=>buildNode(tree, buildNodeRow, true))}
    </RBTree>
  );
}