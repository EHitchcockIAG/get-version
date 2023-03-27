import * as core from '@actions/core';

function getGithubInput () {
    return {
        packagePath: core.getInput('package') || undefined,
        jsonPath: core.getInput('jsonpath') || undefined
    };
}

export { getGithubInput };
