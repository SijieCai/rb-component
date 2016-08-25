import React from 'react';

export default class extends React.Component {
  render(){
    return (
      <div className="modal-footer">
        {this.props.children || this.props.buttons.map((btn, i)=>
          <button key={i} onClick={(e)=>btn.onClick(btn, e)} type="button" className={'btn ' + btn.className}>{btn.label}</button>
        )}
      </div>
    );
  }
}