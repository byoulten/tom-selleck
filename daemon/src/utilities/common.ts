import jwt from 'jsonwebtoken';
import fs from "fs";

export default class Common {
  static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static saveContentBytesToFile(contentBytes: string, filePath: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          console.log("Saving " + filePath)
          //write to the file system
          fs.writeFileSync(filePath, contentBytes, "base64");

          resolve(true)
        } else {
          console.log(filePath + " already exists")
        }
      } catch (err) {
        reject(false)
      }
    })
  }

  static deleteFile(filePath: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {

          console.log(filePath + " does not exist")
        } else {
          fs.unlink(filePath, (err) => {
            if (!err) {
              reject(false)
              console.log(err)
            } else {
              resolve(true)
            }
          })
        }
        resolve(true)
      } catch (err) {
        reject(false)
      }
    })
  }
}