function Random(Seed) {
  var MBIG = 2147483647;
  var MSEED = 161803398;
  var SeedArray = new Array(56);
  var ii;
  var mj, mk;

  var inext = 0;
  var inextp = 21;

  var subtraction = Math.abs(Seed);
  mj = MSEED - subtraction;
  SeedArray[55]=mj;
  mk = 1;
  for (var i=1; i<55; i++) {
    ii = (21*i)%55;
    SeedArray[ii]=mk;
    mk = mj - mk;
    if (mk<0) mk+=MBIG;
    mj=SeedArray[ii];
  }
  for (var k=1; k<5; k++) {
    for (var i=1; i<56; i++) {
      SeedArray[i] -= SeedArray[1+(i+30)%55];
      if (SeedArray[i]<0) SeedArray[i]+=MBIG;
    }
  }

  this.sample = function () {
    return ( this.internalSample() * (1.0/MBIG) );
  }

  this.internalSample = function () {
    var retVal;
    var locINext = inext;
    var locINextp = inextp;

    if (++locINext >=56) locINext=1;
    if (++locINextp>= 56) locINextp = 1;

    retVal = SeedArray[locINext]-SeedArray[locINextp];

    if (retVal == MBIG) retVal--;
    if (retVal<0) retVal += MBIG;

    SeedArray[locINext] = retVal;

    inext = locINext;
    inextp = locINextp;

    return retVal;
  }

  this.next = function(maxValue) {
    if (maxValue === undefined) {
      return this.internalSample();  
    } else {
      return parseInt(this.sample() * maxValue);
    }
  }
}