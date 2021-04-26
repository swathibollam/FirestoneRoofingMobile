const propReader = require('properties-reader');
const path = require("path");
const fs = require('fs');
const sb = require('stringbuilder');

module.exports = function (logger, projectData, usbLiveSyncService) {

    const srcDirName = 'config/';
    const destDirName = 'app/config/';
    const destFileName = 'environment.ts';

    return new Promise(function (resolve, reject) {

        // do not copy on live sync.
        if (!!usbLiveSyncService.isInitialized) {
            console.log('is initialized');
            resolve();
            return;
        }

        let directoryToWriteTo = path.join(projectData.projectDir, 'app', 'config');
        let buildProfile = process.env['BUILD_PROFILE'];

        console.log('Build profile: ' + buildProfile
            + '\nDir to write to: ' + directoryToWriteTo
            + '\nFile to write to: ' + destFileName
        );

        buildProfile = !buildProfile ? 'dev' : buildProfile;


        let props = propReader(srcDirName + 'env.common.properties');
        props.append(srcDirName + 'env.' + buildProfile + '.properties');

        let constantsOfFile = new sb();
        constantsOfFile.appendLine('/** '
            + '\n * Please don\'t add to this file. '
            + '\n * This file gets GENERATED automatically.'
            + '\n * Please add properties to config/env.common.properties or '
            + '\n *\tconfig/environment specific file. '
            + '\n * Properties in env.common.properties can be overridden in environment'
            + '\n * specific file. '
            + '\n **/');
        constantsOfFile.appendLine('export const environment = {');
        constantsOfFile.appendLine();

        props.each((key, value) => {
            constantsOfFile.appendLine('\t' + key + ' : ' + value + ',');
    });

        constantsOfFile.appendLine();
        constantsOfFile.appendLine('}');

        let fileToWriteTo = path.join(destDirName + destFileName);
        let writeStream = fs.createWriteStream(fileToWriteTo);
        constantsOfFile.pipe(writeStream);
        constantsOfFile.flush();
        resolve();

    });
};
