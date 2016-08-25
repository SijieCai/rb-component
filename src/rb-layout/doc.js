function render({RBLayout}) {
  return (
    <RBLayout>
      <div className="rb-layout__top">
        <div style={{background: '#B5B3E1', padding: 10}}>
          <p><strong>A</strong></p>
          顶部菜单position为absolute，控件会根据 rb-layout__top 的高度自动给 rb-layout__bottom 添加 padding-top
        </div>
      </div>
      <div className="rb-layout__bottom">
        <div className="rb-layout__bottom__left">
          <div style={{height: '100%', overflow: 'auto'}}> 
            {['B',0,0,0,0,0,0,0,0,0,0,0,'底部'].map((value, i)=>
              <div key={i} style={{background: '#A3D2C7', padding: 10}}>
                <div>{value ? <strong>{value}</strong> : '二级级菜单'+i}</div>
              </div>
             )}
          </div>
        </div>
        <div className="rb-layout__bottom__left">
          <div style={{height: '100%', overflow: 'auto'}}>
            {['C',0,0,0,0,0,0,0,0,0,0,0,'底部'].map((value, i)=>
              <div key={i} style={{background: '#DFCB72', padding: 10}}>
                <div>{value ? <strong>{value}</strong> : '三级菜单'+i}</div>
              </div>
            )}
          </div>
        </div>
        <div className="rb-layout__content">
          <div style={{height: 1000, padding: 10, border: 'solid 1px red'}}>
          <p><strong>Content</strong></p> 
            Layout控件用于实现一个典型的页面布局。<br/><br/>
            控件功能和特性：<br/><br/>

            <strong>A</strong> 就是 rb-layout__top <br/>
            rb-layout__bottom就是除去 <strong>A</strong> 剩下的区域 <br/>
            <strong>B、C（可以有D，E...)</strong> 就是 rb-layout__bottom__left <br/>
            <strong>Content</strong> 就是 rb-layout__content <br/><br/>

            <strong>A</strong>的高度自定义，而且需要让<strong>B、C、Content</strong>占满剩下的高度，而且都能使用height：100%（主要用于滚动条）。<br/><br/>
            <strong>B、C（可以有D，E...)</strong>宽度自定义，<strong>Content</strong>的宽度占满剩下的区域，并且<strong>Content</strong>能使用width：100%。
          </div>
        </div>
      </div>
    </RBLayout>
  );
}