function BasePredicate(){}
BasePredicate.prototype = {};


function ChainablePredicate(matcher,parent,lhs){
  this.matcher = matcher;
  if(parent){
    this._parent = parent;
  }
  if(lhs){
    this._lhs = lhs;
  }
}

ChainablePredicate.prototype = new BasePredicate();

ChainablePredicate.prototype.matches = function(value,next){
  var self = this;
  next = next || function(val){return val;};
  if(this._parent){
    return this._parent.matches(value,function(val){
      return self.matcher.matches(val,next);
    });
  }
  return next(value);
};

ChainablePredicate.prototype.describe = function(description,next){
  var self = this;
  next = next || function(desc){return desc;};
  if(this._parent){
    return this._parent.describe(description,function(desc){
      return self.matcher.describe(desc,next);
    });
  }
  return next(description);
};

function CompositePredicate(matcher,lhs,rhs){
  this.matcher = matcher;
  this._lhs = lhs;
  this._rhs = rhs;
}

CompositePredicate.prototype = new BasePredicate();

CompositePredicate.prototype.matches = function(value,next){
  var self = this;
  next = next || function(val){return val;};
  var lhs = function (val){
    return self._lhs.matches(val);
  };
  if(this._rhs){
    var rhs = function (val){
      return self._rhs.matches(val);
    };
    return next(this.matcher.matches(value,lhs,rhs));
  }
  return this.matcher.matches(value,lhs,next);
};

CompositePredicate.prototype.describe = function(description,next){
  var self = this;
  next = next || function(desc){return desc;};
  function lhs (desc){
    return self._lhs.describe(desc);
  }
  if(this._rhs){
    var rhs = function rhs (desc){
      return self._rhs.describe(desc);
    };
    return next(this.matcher.describe(description,lhs,rhs));
  }
  return this.matcher.describe(description,lhs,next);
};


/* jshint -W103 */
function makeChainable(matcher,self){
  if(matcher.execute){
    var execute = function execute(){
      return new ChainablePredicate(
        matcher.execute.apply(null, Array.prototype.slice.call(arguments)),
        self
      );
    };
    //TODO: Brute force copy if __proto__ isn't supported
    execute.__proto__ = new ChainablePredicate(matcher,self);
    return execute;
  }
  return new ChainablePredicate(matcher,self);
}

function makeComposite(matcher,lhs){
  function execute(rhs){
    return new CompositePredicate(
      matcher,
      lhs,
      rhs
    );
  }
  //TODO: Brute force copy if __proto__ isn't supported
  execute.__proto__ = new CompositePredicate(matcher,lhs);
  return execute;
}
/* jshint +W103 */

function _addChainablePredicate(name,matcher){
  Object.defineProperty(
    BasePredicate.prototype,
    name,
    {
      get : function(){
        return makeChainable(matcher,this);
      }
    }
  );
}

function _addCompositePredicate(name,matcher){
  Object.defineProperty(
    BasePredicate.prototype,
    name,
    {
      get : function(){
        return makeComposite(matcher,this);
      }
    }
  );
}

function addChainablePredicate(names,matcher){
  var args = Array.prototype.slice.call(arguments);
  var nameCount = args.length - 1;
  matcher = args[nameCount];
  for (var i = 0; i < nameCount; i++) {
    _addChainablePredicate(args[i],matcher);
  }
}
function addCompositePredicate(names,matcher){
  var nameCount = (arguments.length - 1);
  matcher = arguments[nameCount];
  for (var i = 0; i < nameCount; i++) {
    _addCompositePredicate(arguments[i],matcher);
  }
}

function assertThat(reason,actual,matcher){
  if(matcher){
    reason = reason + "\n";
  } else {
    matcher = actual;
    actual = reason;
    reason = "";
  }
  if(!matcher.matches(actual)){
    throw new Error(reason + "\tExpected:" + matcher.describe("") + "\n\tActual: " + actual);
  }
}
