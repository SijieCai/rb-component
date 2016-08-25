export default function getObjectFacade(object, decorator){
  if(decorator) {
    if(typeof decorator === 'string') {
      return object[decorator];
    }
    if(typeof decorator === 'function') {
      return decorator(object);
    }
    throw new Error('decorator must be typeof string or function');
  }
  return object;
}


