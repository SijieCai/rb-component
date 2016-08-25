function render({RBTable}) {
  this.loadPage = ()=>{
    setTimeout(()=>{
      var result = {
        total: 100,
        list: []
      };
      var {page, pagesize} = this.state;
      for(var i = 0; i < this.state.pagesize; i++) {
        result.list.push({
          name: '名字' + (i + (page - 1) * pagesize),
          email: '邮箱@cn'
        });
      }
      this.setState(result);
    }, 500);
  }

  this.onPageSelect = (e)=>{
    var state = this.state;
    state.page = e.page;
    state.pagesize = e.pagesize;
    this.forceUpdate();
    this.loadPage();
  }
  return (
    <RBTable paginationProps={
          {prev: true, next: true, first: true, 
          last: true, maxButtons: 5, selectPagesize: true, 
          pagesizeOptions: [10, 20, 50, 100], hideOnePage: false}
        }
        totalCount={this.state.total}
        pagesize={this.state.pagesize}
        page={this.state.page} onPageSelect={this.onPageSelect}
    >
      <thead>
        <tr>
          <th>名字</th>
          <th>邮箱</th>
        </tr>
      </thead>
      <tbody>
        {(this.state.list || []).map( (item, i) =>
          <tr key={i}>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </tr>
        )}
      </tbody>
    </RBTable>
  );
} 
