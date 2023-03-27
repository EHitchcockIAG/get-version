import * as core from '@actions/core';
import { parse, SemVer } from 'semver';
import { resolve } from 'path';
import * as logging from './helpers/logging';
import {setPriority} from "os";

function getGithubInput () {
    return {
        packagePath: core.getInput('package') || 'package.json'
    }
}

function printVersion (version: SemVer) {
    logging.success('Version:', version?.version);
    logging.success('Major Version:', version?.major);
    logging.success('Minor Version:', version?.minor);
    logging.success('Patch Version:', version?.patch);
}

function setOutput (version: SemVer) {
    core.setOutput('version', version?.version);
    core.setOutput('version-major', version?.major);
    core.setOutput('version-minor', version?.minor);
    core.setOutput('version-patch', version?.patch);
}

async function main () {
    const { packagePath } = getGithubInput();
    logging.info('Using', packagePath, 'as package directory');


    try {
        const pkg = resolve(packagePath);
        const { version } = require(pkg);
        const parsedVersion = parse(version);

        if (parsedVersion) {
            setOutput(parsedVersion);
            printVersion(parsedVersion);
        } else {
            throw new TypeError("Version path was not found in specified directory");
        }
    } catch (e: any) {
        logging.error("Unable to parse version from ", packagePath);
        throw Error(e);
    }
}

main().catch(e => {
    core.setFailed(`get-version failed: ${e.message}`)
})