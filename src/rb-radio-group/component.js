import React from 'react';
import getObjectFacade from '../helper/get-object-facade';

export default class RBRadioGroup extends React.Component{
  static propTypes = {
    checkAll: React.PropTypes.bool,
    label: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    itemValue: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    itemLabel: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    items: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    allLabel: React.PropTypes.func
  }

  static defaultProps = {
    checkAll: false,
    allLabel: ()=>'全部'
  }

  state = {}

  componentWillMount() {
    this.state.checkedValue = this.props.defaultCheckedValue || '';
  }

  handleClickItem(checkedValue) {
    this.setState({checkedValue}, ()=>this.props.onChange(
      checkedValue,
      this.isCheckAll(checkedValue)
    ));
  }

  getCurrentValue() {
    if(this.props.hasOwnProperty('checkedValue')) {
      return this.props.checkedValue;
    }
    return this.state.checkedValue;
  }

  getItemValue = item=>{
    return getObjectFacade(item, this.props.itemValue);
  }

  getItemLabel = item=>{
    return getObjectFacade(item, this.props.itemLabel);
  }

  isCheckAll = currentValue=>{
    return this.props.items.reduce((value, item)=>value && (this.getItemValue(item) !== currentValue), true)
  }

  render(){
    var currentValue = this.getCurrentValue();
    let allCheckbox = null;
    if(this.props.checkAll && this.props.items.length > 0) {

      allCheckbox = (
        <div className="rb-radio-group__item">
          <label className="rb-radio-group__item__label">
            <input
                type="radio"
                name={this.props.name}
                className="rb-radio-group__item__input"
                checked={this.isCheckAll(currentValue)}
                onChange={()=>this.handleClickItem()}
            />
            {this.props.allLabel()}
          </label>
        </div>
      );
    }
    return (
      <div className="rb-radio-group">

        {this.props.label ? <div className="rb-radio-group__label">
          <span>{this.props.label}</span>
        </div> : null}

        <div className="rb-radio-group__content">
          {allCheckbox}
          {this.props.items.map((item, i) =>
            <div className="rb-radio-group__item" key={i}>
              <label className="rb-radio-group__item__label">
                <input
                    type="radio"
                    name={this.props.name}
                    className="rb-radio-group__item__input"
                    checked={this.getItemValue(item) === currentValue}
                    onChange={()=>this.handleClickItem(this.getItemValue(item))}
                />
                {this.getItemLabel(item)}
              </label>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export {RBRadioGroup};
