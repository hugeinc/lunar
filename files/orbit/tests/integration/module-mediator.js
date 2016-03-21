import test from 'blue-tape';
import Orbit from '../../src/index';
import objectMock from '../mocks/object';

let app = Orbit(objectMock);
let module = app.createModule();

app.Logger.setLevel('OFF');

test('Orbit.createModule', function(t) {
  t.plan(2);

  t.equal(module[module.actions.ONE](1), 2, 'Should return 2');
  t.equal(module[module.actions.TWO](1), 3, 'Should return 3');

  t.end();
});
