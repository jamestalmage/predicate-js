[ 'to', 'be', 'been'
  , 'is', 'has', 'have'
  , 'with', 'that', 'at'
  , 'of', 'does', 'same' ].forEach(function (chain) {
    addChainablePredicate(chain, {
      matches:function(value,next){
        return next(value);
      },
      describe:function(description,next){
        return description + " " + chain + next("");
      }
    });
  });

addChainablePredicate('not',{
  matches:function(value,next){
    return !next(value);
  },
  describe:function(description,next){
    return description + " not" + next("");
  }
});

addChainablePredicate('includes','include','contains','contain',{
  execute:function(includedValue){
    return {
      matches:function(value,next){
        return next(~value.indexOf(includedValue));
      },
      describe:function(description,next){
        return description + " include " + includedValue + next("");
      }
    };
  }
});

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

addChainablePredicate('true',{
  matches : function(value,next){
    return next(value === true);
  },
  describe:function(description,next){
    return description + " true" + next("");
  }
});

addChainablePredicate('false',{
  matches : function(value,next){
    return next(value === false);
  },
  describe:function(description,next){
    return description + " false" + next("");
  }
});

addChainablePredicate('null',{
  matches : function(value,next){
    return next(value === null);
  },
  describe:function(description,next){
    return description + " null" + next("");
  }
});

addChainablePredicate('undefined',{
  matches : function(value,next){
    return next(value === {}.undefinedValue$$321123);
  },
  describe:function(description,next){
    return description + " undefined" + next("");
  }
});

addChainablePredicate('exist',{
  matches : function(value,next){
    return next(value != null);
  },
  describe:function(description,next){
    return description + " exist" + next("");
  }
});

addChainablePredicate('empty',{
  matches : function(value,next){
    if (Array.isArray(value) || 'string' === typeof value) {
      return next(0 === value.length);
    } else if (value && typeof value === 'object') {
      return next(0 === Object.keys(value).length);
    }
    return next(false);
  },
  describe:function(description,next){
    return description + " empty" + next("");
  }
});

addChainablePredicate('arguments','Arguments',{
  matches : function(value,next){
    var valueType = Object.prototype.toString.call(value);
    return next('[object Arguments]' === valueType);
  },
  describe:function(description,next){
    return description + " arguments" + next("");
  }
});

addChainablePredicate('equal','equals','eq',{
  execute:function(val){
    return {
      matches:function(value,next){
        return next(val === value);
      },
      describe: function(description,next){
        return description + " equals " + val + next("");
      }
    }
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