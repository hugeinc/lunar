import postal from 'postal';
import 'postal.request-response';
import Q from 'q';

postal.configuration.promise.createDeferred = function() {
  return Q.defer();
};

postal.configuration.promise.getPromise = function(dfd) {
  return dfd.promise;
};

export default postal.channel('ORBIT');
