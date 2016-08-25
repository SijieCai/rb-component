import {Component} from 'react';
import Markdown from 'react-remarkable';
import hljs from 'highlight.js';
import Waypoint from 'react-waypoint';
import './style.scss';
import 'highlight.js/styles/github.css';
export default class extends Component {
  state = {
    markdown: '',
    menus: [
      {to: '/md/index', label: '介绍'},
      {to: '/md/route', label: '路由'}
    ]
  };

  componentWillMount = () => {
    this.getDocName(this.props);
  };

  componentDidMount = ()=>{
    // console.log(this.refs);
    // this.refs.container.addEventListener('scroll', (e)=>console.log('scrolling', e.target.scrollTop));
  };

  componentWillReceiveProps = (nextProps) => {
    this.getDocName(nextProps);
  };
  
  httpGetAsync = (theUrl, callback) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  };

  getDocToc = doc=>{
    var matches = doc.toString().match(/^#+\s.+$/mg);
    matches = matches.map(m=>{
      m = m.match(/^(#+)\s(.+)$/);
      return {
        lvl: m[1].length,
        title: m[2]
      }
    });
    return matches;
  };

  getDocName = props => {
    var name = props.routeParams.name;
    if(name) {
      this.httpGetAsync(`/mds/${name}.md`, data=>{
        let seperator = '--------!!!!--------';
        let markdownToc =  this.getDocToc(data);
        let markdown = data.replace(/^#+\s.+$/mg, seperator).split(seperator);
        var newMarkdown = [];
        
        markdownToc.forEach((item, i)=>{
          let toc = markdownToc[i];
          let header;
          switch(toc.lvl) {
            case 1:
              header = <h1 key={i} id={'toc-header-' + i}>{toc.title}</h1>;
              break;
            case 2:
              header = <h2 key={i} id={'toc-header-' + i}>{toc.title}</h2>;
              break;
            case 3:
              header = <h3 key={i} id={'toc-header-' + i}>{toc.title}</h3>;
              break;
            case 4:
              header = <h4 key={i} id={'toc-header-' + i}>{toc.title}</h4>;
              break;
            case 5:
              header = <h5 key={i} id={'toc-header-' + i}>{toc.title}</h5>;
              break;
          }

          newMarkdown.push(header);
          newMarkdown.push(
            <Waypoint key={'waypoint' + i}
                onEnter={()=>this.setState({active: i})}
            />
          );
          newMarkdown.push(markdown[i+1]);
        });
        this.setState({
          markdown: newMarkdown,
          tocJson: this.getTocJson(markdownToc)
        });
      });
    }
  };

  getTocJson = (tocContent)=>{
    let lvlMap = {};

    let tocContentRoot = [];
    let parent, parentLvl, lvlContents;
    tocContent.forEach((item)=>{
      if(item.lvl < 3) {return;}
      item.children = [];
      parentLvl = item.lvl - 1;
      lvlMap[parentLvl] = lvlMap[parentLvl] || [];
      lvlMap[item.lvl] = lvlMap[item.lvl] || [];

      lvlContents = lvlMap[parentLvl];
      if(lvlContents.length > 0) {
        parent = lvlContents[lvlContents.length - 1];
        parent.children.push(item); 
      }
      else {
        tocContentRoot.push(item);
      }
      lvlMap[item.lvl].push(item);
    });
    return tocContentRoot;
  };

  render() {
    var index = 0;
    var options = {
      highlight: (str, lang)=>{
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {console.log(err);}
        }
     
        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {console.log(err);}
     
        return ''; // use external default escaping 
      }
    };
    return ( 
      <div className="main main--doc">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-9 markdown-body">
              <Markdown options={options}>{this.state.markdown}</Markdown>
            </div>
            <div className="col-xs-3">
              <ul className="nav affix">
                {(this.state.tocJson || []).map((item, i)=>
                  <li className={this.state.active === index ? 'active' : ''} key={i}>
                    <a href={'#toc-header-' + (index++)}>{item.title}</a>
                    <ul className="nav" style={{marginLeft: 10}}>
                      {(item.children || []).map((child, j)=>
                        <li key={j} className={this.state.active === index ? 'active' : ''}>
                          <a href={'#toc-header-' + (index++)}>{child.title}</a>
                        </li>
                      )}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div> 
    );
  };
};
