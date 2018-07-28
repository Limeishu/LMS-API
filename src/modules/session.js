import md5              from 'js-md5'

class Session {
  constructor(data) {
    this.uid = data._id
    this.lastIP = data.meta.lastIP
  }
  get make() {
    return md5(`${this.uid}${parseInt(this.lastIP.split(/\.|:+/).join(''), 10) + (new Date() - (new Date().getTime() % 3600000))}`)
  }
}

export default Session
