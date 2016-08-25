import React from 'react';
import {Pagination, Table} from 'react-bootstrap';


function getPageSize(){
  return localStorage.getItem('table-component-page-size');
};
function setPageSize(value){
  return localStorage.setItem('table-component-page-size', value);
};

export default class RichTable extends React.Component {
  static defaultProps = {
    onPageSelect: ()=>{},
    totalCount: false,
    page: 1,
    pagesize: getPageSize() || 10
  }

  componentDidMount() {
    this.props.onPageSelect({
      page: this.props.page,
      pagesize: this.props.pagesize
    });
  }
  // 为了兼容28 和 29 react-bootstrap
  handlePageSelect = (e, selectEvent) => {
    var page = e;
    if(!Number.isInteger(page)){
      page = selectEvent.eventKey;
    }
    if(this.props.page !== page) {
      this.props.onPageSelect({
        page: page,
        pagesize: this.props.pagesize
      });
    }
  }

  render() {
    var items = Math.ceil(this.props.totalCount / this.props.pagesize);
    var activePage = this.props.page > items ? items : this.props.page;
    var paginationProps = Object.assign({
      prev: true, next: true, first: true, 
      last: true, maxButtons: 5, selectPagesize: false, 
      pagesizeOptions: [10, 20, 50, 100], hideOnePage: true}, this.props.paginationProps);
    return (
      <div className="rb-table-component">
        <Table responsive>
          {this.props.children}
        </Table>
        {items > (paginationProps.hideOnePage ? 1 : 0) ? 
          <div className="rb-table__pagination">
            <Pagination {...paginationProps}
                items={items}
                activePage={activePage}
                onSelect={this.handlePageSelect}
            />
            {paginationProps.selectPagesize ? 
              <div className="rb-table__pagination__pagesize">
              <span>每页显示：</span>
              <select
                  defaultValue={this.props.pagesize}
                  onChange={e => {
                    setPageSize(e.target.value);
                    this.props.onPageSelect({
                      page: 1,
                      pagesize: e.target.value
                    });
                  }}
              >
                {paginationProps.pagesizeOptions.map(size =>
                  <option key={size} value={size} label={size}>{size}</option>
                )}
              </select>
              </div> : null
            }
          </div> : ''}
        {(this.props.totalCount !== false && (!this.props.totalCount || this.props.totalCount === '0') ) ?
          <div className="table__footer--text">目前没有数据</div> : ''
        }
      </div>
    );
  }
}
export {RichTable};
