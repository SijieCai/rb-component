import React from 'react';

class SearchBar extends React.Component {
  static defaultProps = {
    onChange(){},
    onSearch(){console.log('please provide onSearch callback'); }
  }
  state = {
    value: ''
  }
  componentWillMount() {
    this.init(this.props);
  }

  init = props=>{
    this.state.value = props.defaultValue || '';
  }

  handleChange = (e)=>{
    this.props.onChange(e);
    if(!this.props.hasOwnProperty('value')) {
      this.setState({value: e.target.value});
    }
  }

  render() {
    var value = this.state.value;
    if(this.props.hasOwnProperty('value')) {
      value = this.props.value;
    }
    return (
      <div className="rb-search-bar">
        <input
            className="rb-search-bar__input"
            type="text"
            value={value}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            onKeyDown={e=>{
              if(e.keyCode === 13) {
                e.preventDefault();
                this.props.onSearch(this.state.value);
              }
            }}
        />
        <button className="rb-search-bar__button" type="button" onClick={e=>{e.preventDefault(); this.props.onSearch(value);}}>搜索</button>
      </div>
    );
  }
}

export {SearchBar};
export default SearchBar;
