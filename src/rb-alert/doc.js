function render({RBAlert}) { 
  var countOK = 1, 
      countError = 1;  
  return (
    <div>
        <RBAlert id="demo"/>
        <button onClick={()=>RBAlert.info('你点击了'+(countOK++)+'次成功信息', 'demo')}>弹出成功信息</button>
        <button onClick={()=>RBAlert.error('你点击了'+(countError++)+'次错误信息', 'demo')}>弹出错误信息</button>
    </div>    
  );
} 
