import React from 'react';
import {Modal} from 'react-bootstrap';

import BodyConfirm from './body-confirm';
import Footer from './footer';
import FooterYesNo from './footer-yes-no';
import FooterOk from './footer-ok';

class ModalWrap extends React.Component {
  static defaultProps = {
    show: false,
    dialogClassName: '',
    backdrop: 'static'
  }

  state = {
    position: {x: 0, y: 0}
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.show && !nextProps.show ) {
      let dom = document.querySelector('.modal--pc');
      dom.style.top = 0;
      dom.style.left = 0;
    }
  }

  isMove = false;
  initialMove = {x: 0, y: 0};

  onMouseDown(e) {
    if(this.props.backdrop !== 'static') {
      return;
    }
    let dom = document.querySelector('.modal--pc');
    this.isMove = true;
    this.initialMove = {x: e.pageX - (parseInt(dom.style.left) || 0), y: e.pageY - (parseInt(dom.style.top) || 0)};
    document.body.style.userSelect="none";
    document.body.addEventListener('mousemove', this.onMouseMove);
    document.body.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(e) {
    if( !this.isMove || this.props.backdrop !== 'static') { return; }
    let dom = document.querySelector('.modal--pc');
    if( e.pageY > 0 && e.pageY < window.screen.height ) {
      dom.style.top = (e.pageY - this.initialMove.y) + 'px';
    }
    if( e.pageX > 0 && e.pageX < window.screen.width ) {
      dom.style.left = (e.pageX - this.initialMove.x) + 'px';
    }
  }

  onMouseUp() {
    if(this.props.backdrop !== 'static') {
      return;
    }
    this.isMove = false;
    document.body.style.userSelect="auto";
    document.body.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.body.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  render() {
    let cursorStyle = this.props.backdrop !== 'static' ? {cursor:'default'}:{cursor:'move'};
    return (
      <Modal
          dialogClassName={this.props.dialogClassName + ' modal--pc'}
          enforceFocus={false}
          bsSize={this.props.bsSize}
          show={this.props.show}
          onHide={this.props.onHide}
          container={this.props.container}
          backdrop={this.props.backdrop}
          animation={false}
      >
        <div className="modal-header" style={cursorStyle} onMouseDown={this.onMouseDown.bind(this)}>
          <span>{this.props.title}</span>
          <span onClick={this.props.onHide} className="glyphicon glyphicon-remove-sign icon icon-close glyphicon-remove-sign--hover" aria-hidden="true"></span>
        </div>
        {this.props.children}
      </Modal>
    );
  }
}
ModalWrap.Footer = Footer;
ModalWrap.FooterYesNo = FooterYesNo;
ModalWrap.FooterOk = FooterOk;

ModalWrap.Body = Modal.Body;
ModalWrap.BodyConfirm = BodyConfirm;

export { ModalWrap as Modal };
export default ModalWrap;
