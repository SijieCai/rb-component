// var plocks = {};
var oLocks = {};

// setPreemptTimeout 是排他的，先占用的执行setTimeout（后来setTimeout会被忽略）
// setOccupyTimout   是排他的，强占用的执行setTimeout（后来会取消前一个未完成的setTimeout）
// function setPreemptTimeout(callback, timeout, preemptKey) {
//   if(!plocks[preemptKey]) {
//     setTimeout(()=>{
//       plocks[preemptKey]();
//       plocks[preemptKey] = false;
//     }, timeout);

//     plocks[preemptKey] = callback;
//   }
// }

const Timeout = {
  startBouncing(callback) {
    Timeout.setOccupyTimeout(callback, 300, '__start_bountcing');
  },

  setOccupyTimeout(callback, timeout, occupyKey) {
    var oLock = oLocks[occupyKey];

    if(oLock && oLock.pending) {
      oLock.callback = callback;
      oLock.timeout = timeout;
      return;
    }

    if(oLock && oLock.timeoutId) {
      clearTimeout(oLock.timeoutId);
    }

    var timeoutId = setTimeout(()=>{
      callback();
      oLocks[occupyKey] = false;
    }, timeout);

    oLocks[occupyKey] = {callback, timeoutId, timeout};
  },

  pendingOccupyTimeout(occupyKey) {
    var oLock = oLocks[occupyKey];

    if(oLock && oLock.timeoutId) {
      clearTimeout(oLock.timeoutId);
      oLock.pending = true;
    }
  },

  resumeOccupyTimeout(occupyKey) {
    var oLock = oLocks[occupyKey];

    if(oLock && oLock.pending) {
      var timeoutId = setTimeout(()=>{
        oLock.callback();
        oLocks[occupyKey] = false;
      }, oLock.timeout);

      var {callback, timeout} = oLocks[occupyKey];
      oLocks[occupyKey] = {callback, timeoutId, timeout};
    }
  }
};

export default Timeout;