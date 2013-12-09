
addChainablePredicate('lessThan',{
  execute : function(limit){
    return {
      matches:function(value,next){
        return next(value < limit);
      },
      describe:function(description,next){
        return description + " less than " + limit + next("");
      }
    };
  }
});

addChainablePredicate('greaterThan',{
  execute : function(limit){
    return {
      matches:function(value, next){
        return next(value > limit); //next(value > limit);
      },
      describe:function(description,next){
        return description + " greater than " + limit + next("");
      }
    };
  }
});

addCompositePredicate('and',{
  matches:function(value, lhs, rhs){
    return lhs(value) && rhs(value) ;
  },
  describe:function(description, lhs, rhs) {
    return description + " " + lhs("") + " and" + rhs("");
  }
});

addChainablePredicate('ok',{
  matches : function(value,next){
    return !!value;
  },
  describe:function(description,next){
    return description + " ok";
  }
});

addChainablePredicate('not',{
  matches:function(value,next){
    return !next(value);
  },
  describe:function(description,next){
    return description + " not" + next("");
  }
});

addChainablePredicate('lengthOf',{
  matches:function(value,next){
    return next(value.length);
  },
  describe:function(description,next){
    return description + " length of" + next("");
  }
});

addChainablePredicate('is',{
  matches:function(value,next){
    return next(value);
  },
  describe:function(description,next){
    return description + " is" + next("");
  }
});

addChainablePredicate('has',{
  matches:function(value,next){
    return next(value);
  },
  describe:function(description,next){
    return description + " has" + next("");
  }
});