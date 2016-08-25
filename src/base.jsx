import React from 'react';
import {decorate as mixin} from 'react-mixin';
import {ListenerMixin} from 'reflux';

class Base extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.__stores = [];
    this.__listens = [];
  }
  /**
   * 获取store的位置，支持监听多个store
   * @param  {[type]} store [description]
   * @return {[type]}       [description]
   */
  _getStoreIndex(store){
    let index = this.__stores.indexOf(store);
    if(index > -1){
      return index;
    }
    this.__stores.push(store);
    return this.__stores.length - 1;
  }
  /**
   * listen store data change
   * @param  {[type]}   store    []
   * @param  {[type]}   type     []
   * @param  {Function} callback []
   * @return {[type]}            []
   */
  listen(store, callback, type){
    let index = this._getStoreIndex(store);
    if(!this.__listens[index]){
      this.__listens[index] = [];
      this.listenTo(store, (data, triggerType) => {
        this.__listens[index].forEach(fn => {
          fn(data, triggerType);
        });
      });
    }
    type.split(/\s+/).forEach( t => {
      this.__listens[index].push((data, triggerType) => {
        if(t && t === triggerType || !t){
          callback.bind(this)(data, triggerType);
        }
      });
    });
  }
}

Base = mixin(ListenerMixin)(Base);
export {Base};
export default Base;
