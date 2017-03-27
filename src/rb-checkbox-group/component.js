import React from 'react';
import getObjectFacade from '../helper/get-object-facade';
class CheckboxGroup extends React.Component{
  static propTypes = {
    checkAll: React.PropTypes.bool,
    label: React.PropTypes.string,
    itemValue: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    itemLabel: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    items: React.PropTypes.array.isRequired,
    checkedValues: React.PropTypes.array,
    defaultCheckedValues: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired,
    filter: React.PropTypes.func,
    // use to obtain item's ref so to apply Sortablejs things like that
    itemRef: React.PropTypes.func,
    contentRef: React.PropTypes.func,
    allLabel: React.PropTypes.func
  }

  static defaultProps = {
    checkAll: false,
    filter: ()=>true,
    itemRef: new Function(),
    contentRef: new Function(),
    defaultCheckedValues: [],
    label: '',
    allLabel: ()=>'全部'
  }

  state = {}

  componentWillMount() {
    this.state.checkedValues = this.props.defaultCheckedValues || [];
  }

  getItemValue = item=>{
    return getObjectFacade(item, this.props.itemValue);
  }

  getItemLabel = item=>{
    return getObjectFacade(item, this.props.itemLabel);
  }

  emitChange = (values, isCheckAll)=>{
    this.props.onChange(values, isCheckAll);
  }

  isItemChecked = (item, checkedValues)=>{
    return (checkedValues.indexOf(this.getItemValue(item)) > -1);
  }

  handleCheckItem = (item, checkedValues)=>{
    var itemValue = this.getItemValue(item);
    var index = checkedValues.indexOf(itemValue);
    if(index === -1) {
      checkedValues = checkedValues.concat(itemValue);
    } else {
      checkedValues = checkedValues.slice();
      checkedValues.splice(index, 1);
    }
    this.setState({checkedValues}, this.emitChange(checkedValues, this.isCheckAll(checkedValues)));
  }

  getCheckedValues = ()=>{
    if(this.props.hasOwnProperty('checkedValues')) {
      return this.props.checkedValues || [];
    }
    return this.state.checkedValues;
  }

  getAllValues = ()=>this.props.items.map(item=>this.getItemValue(item))

  isCheckAll = (values)=>{
    if(values.length !== this.props.items.length) {
      return false;
    }
    var allValues = this.getAllValues();
    for (var i = 0, len = values.length; i < len; i++){
      if (allValues.indexOf(values[i]) < 0){
        return false;
      }
    }
    return true;
  }

  handleCheckAll = (isCheckAll)=>{
    var checkedValues = isCheckAll ? this.getAllValues() : [];
    this.setState({checkedValues}, ()=>this.emitChange(checkedValues, isCheckAll));
  }

  render(){
    var checkedValues = this.getCheckedValues();

    let allCheckbox = null;
    if(this.props.checkAll && this.props.items.length > 0 ) {
      var isCheckAll = this.isCheckAll(checkedValues);
      allCheckbox = (
        <div className="rb-checkbox-group__item item-all">
          <label className="rb-checkbox-group__item__label">
            <input
                type="checkbox"
                className="rb-checkbox-group__item__input"
                checked={isCheckAll}
                onChange={()=>this.handleCheckAll(!isCheckAll)}
            />
            {this.props.allLabel()}
          </label>
        </div>
      );
    }
    return (
      <div className="rb-checkbox-group">
        {this.props.label ?
          <div className="rb-checkbox-group__label">
            <span>{this.props.label}</span>
          </div> : null}
        <div className="rb-checkbox-group__content" ref={this.props.contentRef}>
          {allCheckbox}
          {this.props.items.filter(this.props.filter).map((item, i) =>
            <div className="rb-checkbox-group__item item-one" ref={this.props.itemRef} key={i}>
              <label className="rb-checkbox-group__item__label">
                <input
                    type="checkbox"
                    className="rb-checkbox-group__item__input"
                    checked={this.isItemChecked(item, checkedValues)}
                    onChange={()=>this.handleCheckItem(item, checkedValues)}
                />
                {this.getItemLabel(item)}
              </label>
            </div>
          )}
          {this.props.addon}
        </div>
      </div>
    );
  }
}

module.exports = CheckboxGroup;