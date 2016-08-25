function render({RBButtonList}) {
  this.state.items = this.state.items || [
    {label: '选项一', otherFields: 'content1'},
    {label: '选项二', otherFields: 'content2'},
    {label: '选项三(disabled)', otherFields: 'content3'}
  ];
  return (
    <RBButtonList items={this.state.items} 
        label="按钮选项"
        buttonLabelField="label"
        onClick={item=>{this.setState({activeItem: item}); console.log('item clicked', item);}}
        activeItem={this.state.activeItem}
        disableFunc={item=>item.otherFields==='content3'}
        activeButtonClassName="btn btn-primary"
        buttonClassName="btn btn-default"
    />
  );
} 
