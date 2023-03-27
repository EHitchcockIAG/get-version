import * as core from '@actions/core';
import { SemVer } from 'semver';

function setOutput (version: SemVer) {
    core.setOutput('version', version?.version);
    core.setOutput('version-major', version?.major);
    core.setOutput('version-minor', version?.minor);
    core.setOutput('version-patch', version?.patch);
}

export { setOutput };
