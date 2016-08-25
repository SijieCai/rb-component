import React from 'react';

export default class extends React.Component {
  static defaultProps = {
      data: [],
      help: '',
      all: true,
      toTitle: '',
      search: true,
      errorHelp: '',
      className: '',
      fromTitle: '',
      placeholder: '',
      toPlaceholder: '',
      fromPlaceholder: '',
      isError: () => false,
      onChange: new Function,
      renderItem: new Function
  };

  state = {
    highlight: {},
    fromKeyword: '',
    toKeyword: ''
  };

  static PropsType = {
    all: React.PropTypes.bool,  //是否显示全选按钮
    help: React.PropTypes.help,   //底部显示帮助信息
    data: React.PropTypes.array,  //渲染数据，数组每个元素内部位会有一个 selected 属性标记是否选中
    search: React.PropTypes.bool, //是否显示搜索框
    isError: React.PropTypes.func, //验证是否出错函数
    onChange: React.PropTypes.func, //用户选择数据后出发事件
    renderItem: React.PropTypes.func, //列表单个元素的渲染函数，返回一个 React 组件
    errorHelp: React.PropTypes.string,  //当验证不通过时显示的错误信息
    className: React.PropTypes.string, //组件的 className
    placeholder: React.PropTypes.string, // 搜索框的 placeholder
    toTitle: React.PropTypes.string,  //右侧列表标题
    fromTitle: React.PropTypes.string,  //左侧列表标题
    toPlaceholder: React.PropTypes.string,  //右侧列表当元素为空时显示内容
    fromPlaceholder: React.PropTypes.string,  //左侧列表当元素为空时显示内容
  };

  /**
   * 选择 or 取消选择 高亮元素
   * @param side  ['from', 'to']
   * @return null
   */
  onSelectHighlight(side) {
    let list = this.filter(this.props.data, {selected: side === 'to', keyword: this.state[`${side}Keyword`], highlight: true});
    list.map(item => this.onSelect(item));
  }

  /**
   * 高亮 or 取消全部高亮
   * @param side  ['from', 'to']
   * @return null
   */
  onHightlightAll(side) {
    let list = this.filter(this.props.data, {selected: side === 'to', keyword: this.state[`${side}Keyword`]});
    let willHightlight = list.some(item => !this.state.highlight[item._rawId]); //选择的列表中有没被选中的话就选中全部
    list.forEach(item => this.state.highlight[item._rawId] = willHightlight);
    this.forceUpdate();
  }

  /**
   * 选择某元素
   * @param item Object 选择的元素
   * @return null
   */
  onSelect(item) {
    let data = this.props.data;
    data[item._rawId].selected = !data[item._rawId].selected;
    this.state.highlight[item._rawId] = false;
    this.props.onChange(data);
  }

  /**
   * 搜索元素
   * @param side String ['from', 'to']
   * @return null
   */
  onSearch(side) {
    let keyword = this.state[`${side}Keyword`];
    return this.filter(this.props.data, {selected: side === 'to', keyword});
  }

  /**
   * 高亮某元素
   * @param item Object 需要高亮的元素
   * @return null
   */
  onHighlight(item) {
    this.state.highlight[item._rawId] = !this.state.highlight[item._rawId];
    this.forceUpdate();
  }

  /**
   * 根据条件筛选列表
   * @param data Array 原始列表数据
   * @param {selected, keyword, highlight} Object 选择条件包括是否被选中，是否被高亮及关键词
   * @return result Array 筛选后列表
   */
  filter(data, {selected, keyword, highlight}) {
    var result = [];
    for(var i=0,l=data.length;i<l;i++) {
      if( !!data[i].selected !== selected ) { continue; }

      var filerText = Object.keys(data[i]).map(key => data[i][key]).join('').toLowerCase();
      if( filerText.indexOf(keyword.toLowerCase()) === -1 ) { continue; }

      if( highlight !== undefined && !!this.state.highlight[i] !== highlight ) { continue; }

      data[i]._rawId = i;
      result.push(data[i]);
    }
    return result;
  }

  /**
   * 渲染单个列表框
   * @param side  String  ['from', 'to']
   * @return React.Component
   */
  renderComponent(side = 'from') {
    let data = this.filter(this.props.data, {selected: side === 'to', keyword: this.state[`${side}Keyword`]});
    let list = [];
    if( data.length > 0 ) {
      list = data.map(item =>
        <li
            key={item._rawId}
            className={'rb-item-switch__component__body__list__ul__li ' + (this.state.highlight[item._rawId] ? 'highlight': '')}
            onClick={()=>this.onHighlight(item)}
            onDoubleClick={()=>this.onSelect(item)}
        >
          {this.props.renderItem(item)}
        </li>
      );
    }

    //若左侧列表有数据则不需要 Placehoder 文字
    let placeholder = (<div className="placeholder">{this.props[`${side}Placeholder`]}</div>);
    if( this.props.data.length > 0 && side === 'from' ) { placeholder = null; }

    return (
      <div className="rb-item-switch__component">
        <div className="rb-item-switch__component__head">
          {this.props.all ?
            <span
                className="rb-item-switch__component__head__all-button"
                onClick={()=> this.onHightlightAll(side)}
            >全选</span>
          : null}
          <span className="text-center">{this.props[`${side}Title`]}</span>
        </div>
        <div className="rb-item-switch__component__body">
          {this.props.search ? <div className="rb-item-switch__component__body__search input-group">
            <input
                type="text"
                className="form-control"
                placeholder={this.props.placeholder}
                value={this.state[`${side}Keyword`]}
                onChange={e => this.setState({[`${side}Keyword`]: e.target.value})}
                onKeyDown={e => {
                  if(e.keyCode === 13) {
                    e.preventDefault();
                    this.onSearch(side);
                  }
                }}
            />
            <span className="input-group-btn">
              <button type="button" className="btn btn-default" onClick={()=> this.onSearch(side)}>
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div> : null}
          <div className={'rb-item-switch__component__body__list' + (this.props.search ? ' rb-item-switch__component__body__list--search' : '')}>
            {list.length === 0 ? placeholder : <ul className="rb-item-switch__component__body__list__ul">{list}</ul>}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={'rb-item-switch ' + (this.props.className || '')}>
        <div className="rb-item-switch__left">{this.renderComponent()}</div>
        <div className="rb-item-switch__center">
          <div className="rb-item-switch__center__button" onClick={() => this.onSelectHighlight('from')}></div>
          <div className="rb-item-switch__center__button" onClick={() => this.onSelectHighlight('to')}></div>
        </div>
        <div className="rb-item-switch__right">{this.renderComponent('to')}</div>
        <div className={'rb-item-switch__help' + (this.props.isError() ? ' has-error' : '')}>
          <span className="help-block">
            {this.props.errorHelp !== '' && this.props.isError() ? this.props.errorHelp : this.props.help}
          </span>
        </div>
      </div>
    );
  }
}
