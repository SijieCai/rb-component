import {Component} from 'react';
import Timeout from 'components/timeout';
const Babel = require('babel-standalone');
import 'babel-polyfill';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
var Codemirror = require('codemirror/lib/codemirror');
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/selection/active-line';
import  * as ReactRouter from 'react-router';
import RBAlert from 'components/rb-alert';
import './style.scss';
const ComponentDocs = require('components/doc');
const RBComponent = require('components');
const ComponentsProvider = {};
function inject(module) {
  Object.keys(module).reduce((obj, key)=>{
    obj[key] = module[key];
    return obj;
  }, ComponentsProvider);
};
inject(RBComponent);
inject(ReactRouter);

const EMPTY_FACTORY = function(){return null;};

export default class extends Component {
  state = {componentFactory: EMPTY_FACTORY}

  componentDidMount() {
    var name = this.props.params.name;
    var code = ComponentDocs[name];
    this.myCodeMirror = Codemirror.fromTextArea(this.refs.codemirrorArea, {
      value: this.state.code,
      mode:  "javascript",
      lineNumbers: true,
      readOnly: false,
      theme: 'material',
      styleActiveLine: true,
      matchBrackets: true
    });
    this.myCodeMirror.on('change', this.codemirrorValueChanged);
    this.myCodeMirror.setValue(code);
    this.tryInitComponent(code);
  }

  componentWillReceiveProps(nextProps) {
    var name = nextProps.params.name;
    if(this.myCodeMirror && name !== this.props.params.name) {
      var code = ComponentDocs[name];
      this.myCodeMirror.setValue(code);
      this.tryInitComponent(code);
    }
  }

  tryInitComponent= code=>{
    var transformed;

    try {
      transformed = Babel.transform(code, {
        presets: [
          "es2015",
          "react"
        ]
      });
      var code = `(${transformed.code.replace(/.use strict.;/, '')})`;
      var myRender = eval(code);
      var componentFactory = ()=>myRender.call(this, ComponentsProvider);
      RBAlert.info('编译成功');
      this.setState({componentFactory, output: ''});
    } catch (err) {
      console.log(err);
      this.setState({componentFactory: EMPTY_FACTORY, output: err.message});
    }
  }

  updateCode = value=>{
    this.setState({code: value})
  }

  codemirrorValueChanged= (doc, change)=>{
    if(change.origin != 'setValue') {
      var value = doc.getValue();
      this.setState({componentFactory: EMPTY_FACTORY, output: '编译中'});
      Timeout.startBouncing(()=>this.tryInitComponent(value),1000);
    }
  }

  render() {
    return ( 
      <div className="main">
        <RBAlert/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <legend>代码（支持ES2015和JSX，this指向容器组件）</legend>
              <textarea ref="codemirrorArea"/>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <legend>效果</legend>
              <div className="well">
                {this.state.output || this.state.componentFactory()}
              </div>
            </div>
          </div>        
        </div>
      </div>
    );
  };
};
