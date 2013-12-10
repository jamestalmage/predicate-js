predicate-js
============

Chainable Predicates for JS

The goal is an assertion library that combines Chai's chainable syntax (i.e. `has.lengthOf.lessThan(4)`), but adds the condition that predicates should be first class objects allowing compositional reuse:
```js
var lt10 = is.lessThan(10);
var gt6 = is.greaterThan(6);
var between6and10 = gt6.and(lt10);

assertThat(7, between6and10);
assertThat(8, between6and10);
```

Making predicates first class objects brings additional benefits when dealing with anything async. In Chai, this is hard:
```js
expect(someValueWeDontHaveYet).to.have.length.greaterThan(5);
```
The difficulty is that the assertion and predicate are inexorably linked in Chai. By making predicates first class object like this:
```js
assertThat(someValueWeDontHaveYet, has.length.greaterThan(5));
```
You keep a nice chainable syntax, but `has.length.greaterThan(5)` is an object representing the predicate that can be passed around, evaluated when the async result is returned, or combined with other predicates.