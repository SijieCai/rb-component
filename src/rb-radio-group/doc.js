function render({RBRadioGroup}) { 
  var props0 = {
    label: '简　单：',
    items: [1, 2, 3, 4, 5],
    checkAll: true,
    onChange: (checkedValue, isCheckAll)=>{
      console.log('简单 值：', checkedValue, '  全选：', isCheckAll);
    }
  };

  var props1 = {
    label: '受　控：',
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
    checkedValue: this.state.checkedValue, // 受控
    onChange: (checkedValue, isCheckAll)=>{
      this.setState({checkedValue}); // 选择状态完全由父组件控制，注释掉这一样将无法改变值
      console.log('受控 值：', checkedValue, '  全选：', isCheckAll);
    }
  };

  var props2 = {
    label: '不受控：',
    items: [{
      value: 1,
      label: 'label（默认）'
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
    defaultCheckedValue: 1,
    onChange: (checkedValue, isCheckAll)=>{
      console.log('不受控 值：', checkedValue, '  全选：', isCheckAll);
    }
  };
  return (
    <div>
      <RBRadioGroup {...props0}/>
      <RBRadioGroup {...props1}/>
      <RBRadioGroup {...props2}/>
    </div>
  );
} 
