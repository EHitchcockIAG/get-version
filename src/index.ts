import * as core from '@actions/core';
import { parse } from 'semver';
import { resolve } from 'path';
import * as logging from './helpers/logging';

function getGithubInput () {
    return {
        packagePath: core.getInput('package') || 'package.json'
    }
}

async function main () {
    const { packagePath } = getGithubInput();
    logging.info('Using ', packagePath, ' as package directory');


    try {
        const pkg = resolve(packagePath);
        const { version } = require(pkg);
        const parsedVersion = parse(version);

        logging.success(parsedVersion?.version);
        logging.success(parsedVersion?.major);
        logging.success(parsedVersion?.minor);
        logging.success(parsedVersion?.patch);
        core.setOutput('version', parsedVersion?.version);
        core.setOutput('version-major', parsedVersion?.major);
        core.setOutput('version-minor', parsedVersion?.minor);
        core.setOutput('version-patch', parsedVersion?.patch);
    } catch (e: any) {
        logging.error("Unable to parse version from ", packagePath);
        throw Error(e);
    }
}

main().catch(e => {
    core.setFailed(`get-version failed: ${e.message}`)
})