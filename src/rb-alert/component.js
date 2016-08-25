import React from 'react';

var alertInstance = {};

export default class RBAlert extends React.Component {

  state = {messages: []}
  
  componentWillMount() {
    var id = this.props.id || '__global__';
    if(alertInstance[id]) {
      throw new Error(`Only one Alert instance is allowed with same id ${id}, use a different id value.`);
    }
    alertInstance[id] = message=>{
      this.handleMessageArrived(message);
    };
  }
  componentWillUnmount() {
    delete alertInstance[this.props.id || '__global__'];
    this.state.messages = [];
    clearTimeout(this.timeoutId);
  }
  handleMessageArrived(message) {
    var messages = this.state.messages;
    if(messages.length > 0 && messages[messages.length - 1].message === message.message) {
      if(messages.length === 1 && this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.scrolling = false;
      }
    } else {
      messages.push(message);
    }
    this.forceUpdate();
    this.scrollMessages(true);
  }

  invokeCallback(message) {
    message = message[0];
    if(message.cb) {
      message.cb();
    }
  }
  scrollMessages(startScrolling){
    if(this.scrolling && startScrolling) {
      return;
    }
    this.scrolling = true;

    this.timeoutId = setTimeout(()=> {
      var index = null;
      for(var i = 0, l = this.state.messages.length; i < l; i++ ) {
        if( this.state.messages[i].type !== 'error' ) {
          index = i;
          break;
        }
      }
      if( index !== null ) {
        var deleted = this.state.messages.splice(index, 1);
        this.invokeCallback(deleted);
        this.forceUpdate();
        this.scrollMessages(false);
      } else {
        this.scrolling = false;
      }
    }, 1000);
  }

  handleCloseAlert(index){
    var messages = this.state.messages;
    var message = messages.splice(index, 1);
    this.invokeCallback(message);
    this.setState({messages});
  }
  render(){
    return (
      <div className={'rb-alert' + (this.state.messages.length ? '' : ' rb-alert--hide')} >
        {this.state.messages.map((message, i)=>
        <div key={i} className={'rb-alert__content' + ` rb-alert__content--${message.type}`}> 
          <div className="rb-alert__message">{message.message}</div>
          <div className="rb-alert__close" onClick={()=>this.handleCloseAlert(i)}></div> 
        </div>
        )}
      </div>
    );
  }
}

RBAlert.show = function(message, type, cb, id='__global__'){
  if(!alertInstance[id]) {
    throw new Error(`No alert instance found with id of ${id}`);
  }
  alertInstance[id]({message, type, cb, id});
}
RBAlert.info = (message, id, cb)=>RBAlert.show(message, 'success', cb, id);
RBAlert.error = (message, id, cb)=>RBAlert.show(message, 'error', cb, id);

export {RBAlert};
