import { test } from 'blue-tape';
import lorem from '../../index.js';

test('Should return my name', t => {
  t.plan(1);
  t.equal(lorem(), 'Heya Caio');
  t.end();
});
