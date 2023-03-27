import { parse, SemVer } from 'semver';
import { readFileSync } from 'fs';
import * as logging from './helpers/logging';
import _ from 'lodash';

async function getVersion ({ packagePath = 'package.json', jsonPath = 'version' }): Promise<SemVer> {
    logging.info('Using', packagePath, 'as package directory');

    let pkg: string;
    try {
        pkg = readFileSync(packagePath, {
            encoding: 'utf-8'
        });
    } catch (e: any) {
        logging.error('Unable to resolve file at', packagePath);
        throw Error(e);
    }

    let version: string;
    try {
        version = _.get(JSON.parse(pkg), jsonPath);
    } catch (e: any) {
        logging.error('Unable to parse JSON field for', jsonPath, 'in', packagePath);
        throw Error(e);
    }

    let parsedVersion: SemVer | null | undefined;
    try {
        parsedVersion = parse(version);
    } catch (e: any) {
        logging.error('Specified field is not formatted as a semantic version,', version);
        throw Error(e);
    }

    if (!parsedVersion) { 
        throw TypeError('parsedVersion cannot be null');
    }
    return parsedVersion;
}

export default getVersion;
