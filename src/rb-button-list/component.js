import React from 'react'

export default class ButtonList extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    disabledFunc: React.PropTypes.func,
    labelField: React.PropTypes.string,
    activeButtonClassName: React.PropTypes.string,
    buttonClassName: React.PropTypes.string,

  }

  static defaultProps = {
    items: [],
    activeItem: false,
    disableFunc() {
      return false;
    },
    labelField: 'label',
    activeButtonClassName: 'rb-button-list__button rb-button-list__button--active',
    buttonClassName: 'rb-button-list__button'
  }


  handleClick(item){
    if(item === this.props.activeItem) {
      return;
    }
    this.props.onClick(item);
  }

  getText(item) {
    if(this.props.buttonLabelField) {
      return item[this.props.buttonLabelField];
    }
    return item;
  }

  render() {
    return (
      <div className="rb-button-list">
        {this.props.label ? <label className={`rb-button-list__label`}>{this.props.label}</label> : null}
        <div className="rb-button-list__button-group">
          {this.props.items.map((item, i)=>
            <button key={i}
                disabled={this.props.disableFunc(item)}
                className={(item===this.props.activeItem) ? this.props.activeButtonClassName : this.props.buttonClassName}
                onClick={()=>this.handleClick(item)}
            >
              {this.getText(item)}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export {ButtonList};
