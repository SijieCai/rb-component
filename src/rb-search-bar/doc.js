function render({RBSearchBar}) { 
  var props = {
    placeholder: '输入搜索',
    onChange: e=>console.log('onChange', e),
    onSearch: e=>console.log('onSearch', e)
  };
  return <RBSearchBar {...props}/>;
}