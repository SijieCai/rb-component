function render({RBItemSwitch}) { 
  if(!this.state.projectItems) {
    this.state.projectItems = [
      {name:'项目一'},
      {name:'项目二'},
      {name:'项目三'},
      {name:'项目四'}
    ]
  } 
  return (
    <RBItemSwitch
        data={this.state.projectItems}
        renderItem={item=> (
          <div className="item-list-item">
          <div>{item.name}</div>
          </div>
          )}
        onChange={projectItems => {
          this.state.projectItems = projectItems;
          this.forceUpdate();
        }}
        fromTitle="可选项目"
        toTitle="已选项目"
        placeholder="请输入项目名"
        fromPlaceholder="没有可选择的项目"
        toPlaceholder="请从左侧选择项目"
    />
  );
} 
