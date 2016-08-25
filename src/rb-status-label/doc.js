function render({RBStatusLabel}) {
  var list = [
    {key: 1, label: 'good', status: 'good', type: 'dot'}, //default
    {key: 2, label: 'normal', status: 'normal', type: 'triangle-top'},
    {key: 3, label: 'warning', status: 'warning', type: 'triangle-bottom'},
    {key: 4, label: 'danger', status: 'danger', type: 'triangle-left'},
    {key: 5, label: 'abnormal', status: 'abnormal', type: 'triangle-right'},
    {key: 6, label: 'danger', status: 'danger', type: 'rect'}
  ];
  return (
    <div>
      {list.map( (item, i)=><RBStatusLabel {...item}/>)}
    </div>

  );
} 
