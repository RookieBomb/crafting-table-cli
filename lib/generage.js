/*
 * @Description: 
 * @Author: zhuxiaobing
 * @Date: 2022-05-15 14:22:47
 * @LastEditors: zhuxiaobing
 * @LastEditTime: 2022-05-15 16:06:24
 */
const downloadGitRepo = require('download-git-repo')
const path = require('path')
const fsExtra = require('fs-extra')
const fs = require('fs')
const ora = require('ora')

function download(repository, path) {
  return new Promise((resolve, reject) => {
    downloadGitRepo(repository, path, (err) => {
      if(err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

class Generage {
  constructor(path, name) {
    this.name = name
    this.path = path
    this.spinner = ora('downloading....');
  }

  // 下载模板
  async download() {
    try {
      this.spinner.start()
      await download(`RookieBomb/MCBlankDataPackage`, this.path)
      this.removeInvalidFile(this.path)
      this.rename()
      this.spinner.succeed('模板下载完成')
    } catch(err) {
      this.spinner.fail('模板下载失败，请重试')
    }
  }

  // 清除模板无用文件
  removeInvalidFile(pathStr) {
    const result = fsExtra.readdirSync(pathStr)
    result.forEach(item => {
      const temPath = path.join(pathStr, item)
      if(['package.json', 'README.md', '.gitkeep'].includes(item)) {
        return fsExtra.removeSync(temPath)
      } else {
        const fsStats = fs.statSync(temPath)
        if(fsStats.isDirectory()) {
          this.removeInvalidFile(temPath)
        }
      }
    })
  }

  // 修改文件加名字
  rename() {
    const oldPath = path.join(this.path, '/data/gun')
    const newPath = path.join(this.path, 'data', this.name)
    fs.renameSync(oldPath, newPath)
  }
}

module.exports = Generage