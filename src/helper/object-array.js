export default {
  mergeValue(targetList, srcList, valueField, idField) {
    var indexedTargetList = {};
    targetList.forEach(tar=>{
      indexedTargetList[tar[idField]] = tar;
    });

    srcList.forEach(src=>{
      var mergeTo = indexedTargetList[src[idField]];
      if(mergeTo) {
        mergeTo[valueField] = src[valueField];
      }
    });
  }
};