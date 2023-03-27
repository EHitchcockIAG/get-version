import mockFs from 'mock-fs';
import getVersion from '../get-version';

const testVersion = '1.2.3';

mockFs({
    'package.json': JSON.stringify({
        'version': testVersion
    }),
    'someTestPackage.json': JSON.stringify({
        'some': 'filler',
        'fields': 'here',
        'version': testVersion
    }),
    'some/test/path': {
        'package.json': JSON.stringify({
            'version': testVersion
        })
    },
    'notAJson.txt': 'Not a JSON file',
    'testAltVersion.json': JSON.stringify({
        'altVersion': testVersion
    }),
    'other/test/path': {
        'testJson.json': JSON.stringify({
            'altVersion': testVersion
        })
    },
    'someNestedPackage.json': JSON.stringify({
        some: {
            nested: {
                version: testVersion
            }
        }
    })
});

describe('get-version', () => {
    afterAll(() => {
        mockFs.restore();
    });

    describe('valid file path', () => {
        test('Expect parsed version to be returned for default file', async () => {
            const result = await getVersion({});
            expect(result.version).toBe(testVersion);
        });

        test('Expect parsed version to be returned for valid file', async () => {
            const result = await getVersion({
                packagePath: 'someTestPackage.json'
            });
            expect(result.version).toBe(testVersion);
        });

        test('Expect parsed version to be returned for valid nested file', async () => {
            const result = await getVersion({
                packagePath: 'some/test/path/package.json'
            });
            expect(result.version).toBe(testVersion);
        });

        test('Expect error thrown for existing file which is not JSON', async () => {
            expect(async () => {
                await getVersion({
                    packagePath: 'notAJson.txt'
                });
            }).rejects.toThrow();
        });
    });

    describe('valid jsonpath', () => {
        test('Expect parsed version valid jsonPath', async () => {
            const result = await getVersion({
                packagePath: 'testAltVersion.json',
                jsonPath: 'altVersion'
            });
            expect(result.version).toBe(testVersion);
        });

        test('Expect parsed version to be returned for valid file and jsonPath', async () => {
            const result = await getVersion({
                packagePath: 'other/test/path/testJson.json',
                jsonPath: 'altVersion'
            });
            expect(result.version).toBe(testVersion);
        });
    });

    test('Expect parsed version to be returned for valid nested json version', async () => {
        const result = await getVersion({
            packagePath: 'someNestedPackage.json',
            jsonPath: 'some.nested.version'
        });
        expect(result.version).toBe(testVersion);
    });
});