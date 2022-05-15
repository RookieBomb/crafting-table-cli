#! /usr/bin/env node
/*
 * @Description: 
 * @Author: zhuxiaobing
 * @Date: 2022-05-15 09:56:28
 * @LastEditors: zhuxiaobing
 * @LastEditTime: 2022-05-15 11:30:03
 */
const { program } = require('commander')
const figlet = require('figlet')
const chalk = require('chalk')

// 脚本文件
const fnCreate = require('../lib/create')

program
.version('0.1.0', '-v --version', "输出当前版本信息")
.usage('<command> [option]')

program
.option('-h, --help', '显示命令帮助信息')

program
.command('create <name>')
.description('创建一个新的Minecraft数据包')
.option('-f, --force', '是否覆盖已有的数据包')
.action((name, options) => { 
    fnCreate(name, options)
})


program
  .on('--help', () => {
    console.log(`\r\r`, figlet.textSync('crafting-table-cli'))
    console.log(`\r\n运行${chalk.blue(' crafting-table-cli --help ')}查看更多帮助信息\r\n`)
  })

program.parse(process.argv)