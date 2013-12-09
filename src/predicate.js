function ChainablePredicate(matcher,parent){
  this.matcher = matcher;
  if(parent){
    this._parent = parent;
  }
}

ChainablePredicate.prototype = {
  matches:function(value,next){
    var self = this;
    next = next || function(val){return val;};
    if(this._parent){
      return this._parent.matches(value,function(val){
        return self.matcher.doMatch(val,next);
      });
    }
    return next(value);
  },
  describe:function(description,next){
    var self = this;
    next = next || function(desc){return desc;};
    if(this._parent){
      return this._parent.describe(description,function(desc){
        return self.matcher.doDescribe(desc,next);
      });
    }
    return next(description);
  }
};

function makeChainable(matcher,self){
  function execute(){
    return new ChainablePredicate(
      matcher.execute.apply(null, Array.prototype.slice.call(arguments)),
      self
    );
  }
  execute.__proto__ = new ChainablePredicate(matcher,self);
  return execute;
}

function addChainablePredicate(name,matcher){
  Object.defineProperty(
    ChainablePredicate.prototype,
    name,
    {
      get : function(){
        return makeChainable(matcher,this);
      }
    }
  )
}

addChainablePredicate('lessThan',{
  execute : function(limit){
    return {
      doMatch:function(value,next){
        return value < limit;
      },
      doDescribe:function(description,next){
        return description + " less than " + limit;
      }
    };
  }
});

addChainablePredicate('greaterThan',{
  execute : function(limit){
    return {
      doMatch:function(value, next){
        return value > limit; //next(value > limit);
      },
      doDescribe:function(description,next){
        return description + " greater than " + limit;
      }
    };
  }
});

addChainablePredicate('ok',{
  doMatch : function(value,next){
    return !!value;
  },
  doDescribe:function(description,next){
    return description + " ok";
  }
});

addChainablePredicate('not',{
  doMatch:function(value,next){
    return !next(value);
  },
  doDescribe:function(description,next){
    return description + " not" + next("");
  }
});

addChainablePredicate('lengthOf',{
  doMatch:function(value,next){
    return next(value.length);
  },
  doDescribe:function(description,next){
    return description + " length of" + next("");
  }
});

addChainablePredicate('is',{
  doMatch:function(value,next){
    return next(value);
  },
  doDescribe:function(description,next){
    return description + " is" + next("");
  }
});
addChainablePredicate('has',{
  doMatch:function(value,next){
    return next(value);
  },
  doDescribe:function(description,next){
    return description + " has" + next("");
  }
});

function assertThat(reason,actual,matcher){
  if(!matcher){
    matcher = actual;
    actual = reason;
    reason = "";
  }
  if(!matcher.matches(actual)){
    throw new Error(reason + "\n\tExpected:" + matcher.describe("") + "\n\tActual: " + actual);
  }
}