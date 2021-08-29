const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const pathToRootDir = path.join(__dirname, '..')
const buildFolder = path.join(__dirname, '..', 'build')
const currentVersion = require(path.join(pathToRootDir, 'package.json')).version;

const shouldSkipTests = !!process.argv.find(param => param === '--skip-tests')

const log = (msg) => console.log(typeof msg === 'string' ? 'ℹ️  ' + msg : msg)
const logErr = (msg) => console.error(typeof msg === 'string' ? '⛔️ ' + msg : msg)

/**
 * @param {string} commandToExecute
 * @param {boolean} noData throw error if command generate any data
 * @returns {Promise}
 */
const runCommand = (commandToExecute, noData) => {
  const [command, ...commandArgs] = commandToExecute.split(' ')
  
  const child = spawn(command, commandArgs)

  return new Promise((resole, reject) => {
    child.stdout.on('data', (data) => {
      console.log(data.toString())
      if(noData) reject()
    })
  
    child.stderr.on('data', (data) => {
      console.log(data.toString())
      if(noData) reject()
    })

    child.on('close', (code) => {
      if(code === 0) {
        resole()
      } else {
        logErr('Failed with code ' + code)
        reject(code)
      }
    });
  })
}

(async () => {
  try {
    await runCommand(`cd ${pathToRootDir}`)

    try {
      await runCommand('git status --porcelain', true) 
    } catch (e) {
      logErr('Error: you must commit or stash your changes before start')
      throw e
    }

    log('switching to main branch...')
    
    await runCommand('git fetch')
    await runCommand('git checkout origin/main')
    
    if(!shouldSkipTests) {
      log('start testing...')
    
      await runCommand('yarn install')
      await runCommand('yarn lint')
      await runCommand('yarn test --watchAll=false')

      log('testing finished...')
    }
    
    log('starting build...')
    
    if (fs.existsSync(buildFolder))  await runCommand(`rm -r ${buildFolder}`)
    await runCommand('yarn build')

    log('checkout gh-pages branch...')
    await runCommand('git checkout gh-pages')

    log('deleting previous version files...')
    if (fs.existsSync(path.join(pathToRootDir, 'static'))) await runCommand(`rm -r ${path.join(pathToRootDir, 'static')}`)

    fs.readdir(pathToRootDir, (e, files) => {
      if (e) console.log(e)
    
      files.forEach(file => {
        const fileDir = path.join(pathToRootDir, file);
        if(fs.lstatSync(fileDir).isFile() && file.charAt(0) !== '.') fs.unlinkSync(fileDir)
      });
    });

    log('moving build files to root directory...')
    
    await runCommand(`cp -r ${path.join(buildFolder, 'static')} ${pathToRootDir}`)
    await runCommand(`rm -r ${path.join(buildFolder, 'static')}`)

    fs.readdirSync(buildFolder).forEach(async file => {
      const fileDir = path.join(buildFolder, file);
      if(fs.lstatSync(fileDir).isFile() && file.charAt(0) !== '.') { 
        await runCommand(`cp ${fileDir} ${pathToRootDir}`)
      }
    });

    await runCommand(`rm -r ${path.join(buildFolder)}`)

    log('pushing changes to GitHub Pages...')  
    
    await runCommand('git add --all')
    await runCommand(`git commit -m v${currentVersion}`)
    await runCommand('git push')

    console.log('🎉 deploy finished successfully 🎉')
  } catch (e) {
    if(e) logErr('Build failed with the following code: ' + e)
    else logErr('Build failed')
  }
})()
