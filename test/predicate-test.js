
//for testing that things fail
function assertNot(reason,actual,matcher){
  if(matcher){
    reason = reason + "\n";
  } else {
    matcher = actual;
    actual = reason;
    reason = "";
  }
  if(matcher.matches(actual)){
    throw new Error(reason + "\tExpected NOT:" + matcher.describe("") + "\n\tActual: " + actual);
  }
}


describe('predicates',function(){
  var is = ChainablePredicate.prototype.is, has = ChainablePredicate.prototype.has;  // sugar

  it('lessThan',function(){
    assertThat(5, is.lessThan(6));
    assertNot(6, is.lessThan(5));
    assertThat(6, is.not.lessThan(5));
    assertNot(6, is.lessThan(6));
    assertThat(6, is.not.lessThan(6));

    assertThat(8, is.lt(9));
    assertNot(9, is.lt(8));
    assertThat(9, is.not.lt(8));
    assertNot(9, is.lt(9));
    assertThat(9, is.not.lt(9));

    assertThat(2, is.below(3));
    assertNot(3, is.below(2));
    assertNot(3, is.below(3));
  });

  it('greaterThan',function(){
    assertThat(6, is.greaterThan(5));
    assertNot(5, is.greaterThan(6));
    assertNot(6, is.greaterThan(6));

    assertThat(9, is.gt(8));
    assertNot(8, is.gt(9));
    assertNot(9, is.gt(9));

    assertThat(3, is.above(2));
    assertNot(2, is.above(3));
    assertNot(3, is.above(3));
  });

  it('most / lte',function(){
    assertThat(5, is.at.most(6));
    assertNot(6, is.at.most(5));
    assertThat(6, is.at.most(6));

    assertThat(8, is.lte(9));
    assertNot(9, is.lte(8));
    assertThat(9, is.lte(9));
  });

  it('least / gte',function(){
    assertThat(6, is.at.least(5));
    assertNot(5, is.at.least(6));
    assertThat(6, is.at.least(6));

    assertThat(9, is.gte(8));
    assertNot(8, is.gte(9));
    assertThat(9, is.gte(9));
  });

  it('a / an',function(){
    assertThat(arguments, is.an('arguments'));
    assertThat(arguments, is.not.an('array'));
    assertThat(arguments, is.not.a('date'));
    assertThat(arguments, is.not.a('function'));
    assertThat(arguments, is.not.a('number'));
    assertThat(arguments, is.not.a('regexp'));
    assertThat(arguments, is.not.a('string'));
    assertThat(arguments, is.not.a('null'));
    assertThat(arguments, is.not.a('undefined'));
    assertThat(arguments, is.not.an('object'));

    assertThat([], is.not.an('arguments'));
    assertThat([], is.an('array'));
    assertThat([], is.not.a('date'));
    assertThat([], is.not.a('function'));
    assertThat([], is.not.a('number'));
    assertThat([], is.not.a('regexp'));
    assertThat([], is.not.a('string'));
    assertThat([], is.not.a('null'));
    assertThat([], is.not.a('undefined'));
    assertThat([], is.not.an('object'));

    assertThat(new Date(), is.not.an('arguments'));
    assertThat(new Date(), is.not.an('array'));
    assertThat(new Date(), is.a('date'));
    assertThat(new Date(), is.not.a('function'));
    assertThat(new Date(), is.not.a('number'));
    assertThat(new Date(), is.not.a('regexp'));
    assertThat(new Date(), is.not.a('string'));
    assertThat(new Date(), is.not.a('null'));
    assertThat(new Date(), is.not.a('undefined'));
    assertThat(new Date(), is.not.an('object'));

    assertThat(function(){}, is.not.an('arguments'));
    assertThat(function(){}, is.not.an('array'));
    assertThat(function(){}, is.not.a('date'));
    assertThat(function(){}, is.a('function'));
    assertThat(function(){}, is.not.a('number'));
    assertThat(function(){}, is.not.a('regexp'));
    assertThat(function(){}, is.not.a('string'));
    assertThat(function(){}, is.not.a('null'));
    assertThat(function(){}, is.not.a('undefined'));
    assertThat(function(){}, is.not.an('object'));

    assertThat(3, is.not.an('arguments'));
    assertThat(3, is.not.an('array'));
    assertThat(3, is.not.a('date'));
    assertThat(3, is.not.a('function'));
    assertThat(3, is.a('number'));
    assertThat(3, is.not.a('regexp'));
    assertThat(3, is.not.a('string'));
    assertThat(3, is.not.a('null'));
    assertThat(3, is.not.a('undefined'));
    assertThat(3, is.not.an('object'));

    assertThat(/abc/, is.not.an('arguments'));
    assertThat(/abc/, is.not.an('array'));
    assertThat(/abc/, is.not.a('date'));
    assertThat(/abc/, is.not.a('function'));
    assertThat(/abc/, is.not.a('number'));
    assertThat(/abc/, is.a('regexp'));
    assertThat(/abc/, is.not.a('string'));
    assertThat(/abc/, is.not.a('null'));
    assertThat(/abc/, is.not.a('undefined'));
    assertThat(/abc/, is.not.an('object'));

    assertThat('abc', is.not.an('arguments'));
    assertThat('abc', is.not.an('array'));
    assertThat('abc', is.not.a('date'));
    assertThat('abc', is.not.a('function'));
    assertThat('abc', is.not.a('number'));
    assertThat('abc', is.not.a('regexp'));
    assertThat('abc', is.a('string'));
    assertThat('abc', is.not.a('null'));
    assertThat('abc', is.not.a('undefined'));
    assertThat('abc', is.not.an('object'));

    assertThat(null, is.not.an('arguments'));
    assertThat(null, is.not.an('array'));
    assertThat(null, is.not.a('date'));
    assertThat(null, is.not.a('function'));
    assertThat(null, is.not.a('number'));
    assertThat(null, is.not.a('regexp'));
    assertThat(null, is.not.a('string'));
    assertThat(null, is.a('null'));
    assertThat(null, is.not.a('undefined'));
    assertThat(null, is.not.an('object'));

    assertThat({}.somethingUndefined, is.not.an('arguments'));
    assertThat({}.somethingUndefined, is.not.an('array'));
    assertThat({}.somethingUndefined, is.not.a('date'));
    assertThat({}.somethingUndefined, is.not.a('function'));
    assertThat({}.somethingUndefined, is.not.a('number'));
    assertThat({}.somethingUndefined, is.not.a('regexp'));
    assertThat({}.somethingUndefined, is.not.a('string'));
    assertThat({}.somethingUndefined, is.not.a('null'));
    assertThat({}.somethingUndefined, is.a('undefined'));
    assertThat({}.somethingUndefined, is.not.an('object'));

    assertThat({}, is.not.an('arguments'));
    assertThat({}, is.not.an('array'));
    assertThat({}, is.not.a('date'));
    assertThat({}, is.not.a('function'));
    assertThat({}, is.not.a('number'));
    assertThat({}, is.not.a('regexp'));
    assertThat({}, is.not.a('string'));
    assertThat({}, is.not.a('null'));
    assertThat({}, is.not.a('undefined'));
    assertThat({}, is.an('object'));

  });

  it('6 is not less than 5 passes',function(){
    var notLessThan6 = is.not.lessThan(6);
    assertThat(6, notLessThan6 );
    assertThat(7, notLessThan6 );
  });

  it('[1,2,3] has length < 5',function(){
    assertThat([1,2,3], has.length.lessThan(5));
  });

  it('[1,2,3] has length not < 2',function(){
    assertThat([1,2], has.lengthOf.not.lessThan(2));
  });

  it('3 is ok',function(){
     assertThat(3, is.ok);
  });

  it('0 is not ok',function(){
    assertThat(0, is.not.ok);
  });

  it('4<5<6',function(){
    var gr4 = is.greaterThan(4);
    var lt6 = is.lessThan(6);
    assertThat(5, lt6);
    assertThat(5, gr4);
    assertThat(5, lt6.and.greaterThan(4));
  });

  it('4<5<6',function(){
    var gr4 = is.greaterThan(4);
    var lt6 = is.lessThan(6);
    assertThat(5, lt6);
    assertThat(5, gr4);
    assertThat(5, lt6.and(gr4).and.lessThan(10));
  });

});