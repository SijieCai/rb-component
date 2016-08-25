function render({RBModal}) {
  return (
    <div>
      <button onClick={()=>this.setState({showOkModal: true})}>点击弹出OkModal</button>
      <RBModal
          title="警告"
          show={this.state.showOkModal}
          onHide={()=>this.setState({showOkModal: false})}
      >
        <RBModal.BodyConfirm type="danger">
          你确定要删除吗？
        </RBModal.BodyConfirm>
        <RBModal.FooterOk
            onOk={()=> {
              this.setState({showOkModal: false});
            }}
            
        />
      </RBModal>
    </div>  
  );
} 
