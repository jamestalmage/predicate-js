addChainablePredicate('most','lte',{
  execute : function(limit){
    return {
      matches:function(value,next){
        return next(value <= limit);
      },
      describe:function(description,next){
        return description + " less than or equal to " + limit + next("");
      }
    };
  }
});

addChainablePredicate('least','gte',{
  execute : function(limit){
    return {
      matches:function(value, next){
        return next(value >= limit);
      },
      describe:function(description,next){
        return description + " greater than or equal to " + limit + next("");
      }
    };
  }
});

addChainablePredicate('below','lessThan','lt',{
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

addChainablePredicate('above','greaterThan','gt',{
  execute : function(limit){
    return {
      matches:function(value, next){
        return next(value > limit);
      },
      describe:function(description,next){
        return description + " greater than " + limit + next("");
      }
    };
  }
});


addChainablePredicate('ok',{
  matches : function(value,next){
    return next(!!value);
  },
  describe:function(description,next){
    return description + " ok" + next("");
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

addChainablePredicate('lengthOf','length',{
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
    return description + " is " + next("");
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


addChainablePredicate('at',{
  matches:function(value,next){
    return next(value);
  },
  describe:function(description,next){
    return description + " at" + next("");
  }
});


//Major portions of the 'a' and 'an' predicates copied from:
//https://github.com/chaijs/chai/blob/master/lib/chai/utils/type.js

var natives = {
  '[object Arguments]': 'arguments'
  , '[object Array]': 'array'
  , '[object Date]': 'date'
  , '[object Function]': 'function'
  , '[object Number]': 'number'
  , '[object RegExp]': 'regexp'
  , '[object String]': 'string'
};

function type(obj) {
  var str = Object.prototype.toString.call(obj);
  if (natives[str]) return natives[str];
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (obj === Object(obj)) return 'object';
  return typeof obj;
}

addChainablePredicate('a','an',{
  execute:function(expectedType){
    expectedType = expectedType.toLowerCase();
    var article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(expectedType.charAt(0)) ? 'an ' : 'a ';
    return {
      matches:function(value,next){
        //console.log(type(value) + ' === ' + expectedType);
        return next(type(value) === expectedType);
      },
      describe:function(description, next){
        return description + ' ' + article + expectedType + next("");
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

addCompositePredicate('or',{
  matches:function(value, lhs, rhs){
    return lhs(value) || rhs(value) ;
  },
  describe:function(description, lhs, rhs) {
    return description + " " + lhs("") + " or" + rhs("");
  }
});