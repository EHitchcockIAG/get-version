import * as core from '@actions/core';
import { getGithubInput, printVersion, setOutput } from './helpers';
import getVersion from './get-version';

const { packagePath, jsonPath } = getGithubInput();

getVersion({ packagePath, jsonPath }).then((version) => {
    if (version) {
        setOutput(version);
        printVersion(version);
    } else {
        throw new TypeError('Version path was not found in specified directory');
    }
}).catch(e => {
    core.setFailed(`get-version failed: ${e.message}`);
});
