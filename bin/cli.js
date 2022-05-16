#! /usr/bin/env node
/*
 * @Description: 
 * @Author: zhuxiaobing
 * @Date: 2022-05-15 09:56:28
 * @LastEditors: zhuxiaobing
 * @LastEditTime: 2022-05-16 16:11:00
 */
const { program } = require('commander')
const figlet = require('figlet')
const chalk = require('chalk')

// 脚本文件
const fnCreate = require('../lib/create')

program
.version('0.1.0', '-v --version')
.usage('<command> [option]')

program
.command('create <name>')
.description('Create a new Minecraft package')
.option('-f, --force', 'Overwrite an existing packet')
.action((name, options) => { 
    fnCreate(name, options)
})


program
  .on('--help', () => {
    console.log(`\r\r`, figlet.textSync('crafting-table-cli'))
    console.log(`\r\nRun${chalk.blue(' crafting-table-cli --help ')}show more help information\r\n`)
  })

program.parse(process.argv)