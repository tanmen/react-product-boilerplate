'use strict';

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const VERSION_FILENAME = 'VERSION';

const updateFile = (res) => fs.writeFile(`config/${path.basename(res.config.url)}`, res.data.replace(/^\s*\/\/\s?@remove-on-eject-begin[\s\S]*?\/\/\s?@remove-on-eject-end\n/gm, ''));
const updatePackageJson = (res) => fs.readFile('package.json', {encoding: 'utf8'}).then(json => {
    const packageJson = JSON.parse(json);
    return ({...packageJson, dependencies: {...packageJson.dependencies, ...res.data.dependencies}});
  })
  .then(packageJson => fs.writeFile('package.json', JSON.stringify(packageJson, undefined, 2)));

axios.get('https://api.github.com/repos/facebook/create-react-app/tags', {headers: {Accept: 'application/vnd.github.v3+json'}})
  .then(res => res.data.map(data => ({
    version: data.name,
    order: data.name.replace('v', '').split('.').reduce((pre, cur, index) => Number(cur) * Math.pow(100, (3 - index)) + pre, 0)
  })))
  .then(versions => versions.reduce((a, b) => a.order > b.order ? a : b))
  .then(version => fs.readFile(VERSION_FILENAME, {encoding: 'utf8'})
    .then(data=> {
      if (version.version === data.match(/.+/)[0]) {
        console.log('Already the latest version.')
      } else {
        return Promise.all([
          axios.get(`https://raw.githubusercontent.com/facebook/create-react-app/${version.version}/packages/react-scripts/config/env.js`)
            .then(updateFile),
          axios.get(`https://raw.githubusercontent.com/facebook/create-react-app/${version.version}/packages/react-scripts/config/getHttpsConfig.js`)
            .then(updateFile),
          axios.get(`https://raw.githubusercontent.com/facebook/create-react-app/${version.version}/packages/react-scripts/config/modules.js`).then(updateFile),
          axios.get(`https://raw.githubusercontent.com/facebook/create-react-app/${version.version}/packages/react-scripts/config/paths.js`).then(updateFile),
          axios.get(`https://raw.githubusercontent.com/facebook/create-react-app/${version.version}/packages/react-scripts/config/pnpTs.js`).then(updateFile),
          axios.get(`https://raw.githubusercontent.com/facebook/create-react-app/${version.version}/packages/react-scripts/config/webpack.config.js`).then(updateFile),
          axios.get(`https://raw.githubusercontent.com/facebook/create-react-app/${version.version}/packages/react-scripts/config/webpackDevServer.config.js`).then(updateFile),
          axios.get(`https://raw.githubusercontent.com/facebook/create-react-app/${version.version}/packages/react-scripts/package.json`)
            .then(updatePackageJson)
        ]).then(() => fs.writeFile(VERSION_FILENAME, version.version))
          .then(() => console.log('Update completed :)'))
      }
    }));
