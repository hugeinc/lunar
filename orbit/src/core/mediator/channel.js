import postal from 'postal';
import 'postal.request-response';
import Q from 'q';

export default function() {
  postal.configuration.promise.createDeferred = function() {
    return Q.defer();
  };

  postal.configuration.promise.getPromise = function(dfd) {
    return dfd.promise;
  };

  return postal.channel('ORBIT');
}
