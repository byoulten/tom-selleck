import jwt from 'jsonwebtoken';
import fs from "fs";

export default class Common {
  static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}