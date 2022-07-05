
const DEFAULT_OPTIONS = {
  forgetTry: false,
  notContinue: false,
  callback: null
};

function createClosure(repeaterPtr, callback, options) {
  return function() {
    var continueRun;
    if (options.forgetTry) {
      // Save complexity without a try catch when solidified.
      continueRun = callback(options);
    } else {
      try {
        continueRun = callback(options);
      } catch (e) {
        console.log(options.name);
        console.error(e);
        continueRun = true;
        if (options.notContinue) {
          continueRun = false;
        }
      }
    }
    if (continueRun) {
      repeaterPtr.start();
    } else {
      repeaterPtr._isRunning = false;
    }
  };
}

// TODO implement timestamp and timespan checking system to bea ble to make code reentrant.


export class RafRepeater {
  constructor(options) {
    if (!options.callback) {
      throw new Error('You need a callback to process the work off the RAF.');
    }
    let final = Object.assign(DEFAULT_OPTIONS, options);
    this.options = final;
    this._isRunning = false;
    this.closureCallback = createClosure(this, this.options.callback, this.options);
    this.start();
  }

  start() {
    this.token = requestAnimationFrame(this.closureCallback);
    this._isRunning = true;
  }

  get isRunning() {
    return this._isRunning;
  }

  pause() {
    cancelAnimationFrame(this.token);
    this._isRunning = false;
  }
}
