import path             from 'path'
import fs               from 'fs'
import md5              from 'js-md5'

class fileUtil {
  constructor (file, storageLoc) {
    this.file       = file
    this.fileExt    = file.name.split('.').pop()
    this.storageLoc = storageLoc
  }
  get fileNamePathGenerator () {
    return `lms-${new Date().getFullYear().toString()}${(new Date().getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}${new Date().getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}-${(Math.random() * 10 ** 16).toString().substring(0, 8)}.${this.fileExt}`
  }
  uploadFile () {
    try {
      const fileName = this.fileNamePathGenerator
      const readStream =  fs.createReadStream(this.file.path)
      const writeStream = fs.createWriteStream(path.resolve(this.storageLoc, fileName))
      readStream.pipe(writeStream)
      return fileName
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default fileUtil
