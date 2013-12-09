predicate-js
============

Chainable Predicates for JS

The goal is an assertion library that combines Chai's chainable syntax (i.e. `has.lengthOf.lessThan(4)`), but adds the condition that predicates be separate first class objects benefit of allowing compositional reuse of predicates:
```js
var lessThan6 = is.lessThan(6);
var greaterThan10 = is.lessThan(7);
var between6and10 = and(lessThan6,greaterThan10);

assertThat(7, between6and10);
```

In addition to allowing compositional reuse, making predicates first class objects should make async assertions much easier to accomplish. In Chai, this is hard:
```js
expect(someValueWeDontHaveYet).to.have.length.greaterThan(5);
```
The difficulty is that the assertion and predicate are inexorably linked in Chai. By having predicates be a separate first class object like this:
```js
expect(someValueWeDontHaveYet, to.have.length.greaterThan(5));
```
You keep a nice chainable syntax, but `to.have.length.greaterThan(5)` is an immutable object representing the predicate. This object can be passed around, held onto and evaluated when the async result is returned, or combined with other predicates.