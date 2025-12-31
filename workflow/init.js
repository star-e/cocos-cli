const utils = require('./utils');

/**
 * 初始化，更新仓库以及同步代码等操作，目前强制更新
 * @returns {Promise<void>}
 */
(async () => {
    console.log('初始化\n');
    const forceFlag = '--force';
    // update repo
    await utils.runCommand('node', ['./workflow/update-repo.js', forceFlag].filter(Boolean));

    await utils.runCommand('npm run install:engine');
    await utils.runCommand('npm run generate:dts');

    const platforms = ['bytedance', 'sud', 'wechat', 'wechat-playable'];
    for (const platform of platforms) {
        await utils.runCommand(`npm i --prefix ./packages/platforms/${platform}`);
        await utils.runCommand(`npm run build --prefix ./packages/platforms/${platform}`);
    }

    console.log('\n初始化完成\n');
})();
