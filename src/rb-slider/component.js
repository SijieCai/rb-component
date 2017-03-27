import React from 'react';

module.exports = class extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func
  }

  static defaultProps = {
    checked: false,
    onChange: function() {}
  }

  render() {
    let {onChange, checked} = this.props;
    var suffix = (checked ? 'on' : 'off');
    return (
      <div
          className={'rb-slider rb-slider--' + suffix}
          onClick={()=>onChange(!checked)}
      >
        <div className={'rb-slider__btn rb-slider__btn--' + suffix}/>
      </div>
    );
  }
}