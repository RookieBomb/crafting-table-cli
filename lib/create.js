/*
 * @Description:
 * @Author: zhuxiaobing
 * @Date: 2022-05-15 10:51:11
 * @LastEditors: zhuxiaobing
 * @LastEditTime: 2022-05-15 16:09:14
 */
const path = require('path')
const fs = require('fs-extra')

const Generage = require('./generage')

module.exports = (name, options) => {
  const cwd  = process.cwd();
  const targetAir  = path.join(cwd, name)
  
  if(fs.existsSync(targetAir)) {
    // 目录已存在
    if(options.force) {
      // 覆盖时，直接删除
      fs.removeSync(targetAir)
    } else {
      // 否则不做任何处理
      return
    }
  }
  const generage = new Generage(targetAir, name)
  generage.download()
}