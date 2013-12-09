

describe('predicate',function(){
  var is = ChainablePredicate.prototype.is, has = ChainablePredicate.prototype.has;  // sugar

  it('5<6',function(){
    assertThat(5, is.lessThan(6));
  });

  it('6>5',function(){
    assertThat(6, is.greaterThan(5));
  });

  it('6 is not less than 5 passes',function(){
    var notLessThan6 = is.not.lessThan(6);
    assertThat(6, notLessThan6 );
    assertThat(7, notLessThan6 );
  });

  it('[1,2,3] has length < 5',function(){
    assertThat([1,2,3], has.lengthOf.lessThan(5));
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

});