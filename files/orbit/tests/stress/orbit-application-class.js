import test from 'blue-tape';
import RandomGenerator from '../mocks/random';

test('Should generate 10 classes without problems', function(t) {
	t.plan(1);

	t.equal(RandomGenerator.randomObjects(10).length, 10);
});

test('Should generate 100 classes without problems', function(t) {
	t.plan(1);

	t.equal(RandomGenerator.randomObjects(100).length, 100);
});

test('Should generate 1000 classes without problems', function(t) {
	t.plan(1);

	t.equal(RandomGenerator.randomObjects(1000).length, 1000);
});
