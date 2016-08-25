function render({RBSlider}) { 
  return (
    <RBSlider
      checked={this.state.checked}
      onChange={newValue=>this.setState({checked: newValue})}
    />
  );
} 
