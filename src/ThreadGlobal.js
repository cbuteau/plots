
class ThreadGlobal {
  constructor() {
    //this.url = Constants.API_URL;
  }

  log() {
    console.log.apply(this, arguments)
    // also telegraph to the thread manager.
  },

  warn() {
    console.warn.apply(this, arguments)

  }

  error() {
    console.error.apply(this, arguments)
    
  }
}

const ThreadGlobal = new ThreadGlobal();
export default ThreadGlobal;
