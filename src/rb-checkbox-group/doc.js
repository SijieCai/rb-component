function render({RBCheckboxGroup}) {
  var props0 = {
    label: '　　简单：',
    items: [1,2,3,4,5],
    defaultCheckedValues: [1,2],
    onChange: (checkedValues, isCheckAll)=>{
      console.log('简单 值：', checkedValues, '  全选：', isCheckAll);
    }
  };

    var props1 = {
    label: '允许全部：',
    items: [1,2,3,4,5],
    checkAll: true,
    onChange: (checkedValues, isCheckAll)=>{
      console.log('允许全部：', checkedValues, '  全选：', isCheckAll);
    }
  };


  var props2 = {
    label: '　　受控：',
    items: [{
      value: 1,
      label: 'label'
    }, {
      value: 2,
      label: 'label'
    }, {
      value: 3,
      label: 'label'
    }],
    itemValue: item=>item.value, // 支持函数或者字符串，字符串表示取对象的值
    itemLabel: 'label',          // 支持函数或者字符串，字符串表示取对象的值
    checkAll: true,
    checkedValues: this.state.checkedValues, // 受控
    onChange: (checkedValues, isCheckAll)=>{
      this.setState({checkedValues}); // 选择状态完全由父组件控制，注释掉这一样将无法改变值
      console.log('受控 值：', checkedValues, '  全选：', isCheckAll);
    }
  };

  var props3 = {
    label: '　不受控：',
    items: [{
      value: 1,
      label: 'label'
    }, {
      value: 2,
      label: 'label'
    }, {
      value: 3,
      label: 'label'
    }],
    itemValue: 'value',
    itemLabel: item=>`自定义 ${item.label} ${item.value}`,
    checkAll: true,
    defaultCheckedValues: [1,2,3],
    onChange: (checkedValues, isCheckAll)=>{
      console.log('不受控 值：', checkedValues, '  全选：', isCheckAll);
    }
  };

  var handleExpand = (update)=>{
    this.state.isExpand = !this.state.isExpand;
    this.state.items = this.state.isExpand ? [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5] : [1,2,3,4,5];
    if(update) { this.forceUpdate(); }
  }
  
  if(!this.state.isInit) {
    this.state.isInit = true;
    this.state.isExpand = true;
    handleExpand();
  }
  var props4 = {
    label: '　addon：',
    items: this.state.items,
    checkAll: true,
    onChange: (checkedValues, isCheckAll)=>{
      console.log('addon：', checkedValues, '  全选：', isCheckAll);
    },
    addon: <span style={{color: '#00A3F5', cursor: 'pointer', borderBottom: '1px solid #00A3F5'}} onClick={()=>handleExpand(true)}>{this.state.isExpand ? '收缩' : '展开'}</span>
  };
  return (
    <div>
      <RBCheckboxGroup {...props0}/>
      <RBCheckboxGroup {...props1}/>
      <RBCheckboxGroup {...props2}/>
      <RBCheckboxGroup {...props3}/>
      <RBCheckboxGroup {...props4}/>
    </div>
  );
} 
