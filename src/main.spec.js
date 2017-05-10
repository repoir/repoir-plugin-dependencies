import npmCheck from 'npm-check';
import { test } from './main';

jest.mock('npm-check');

describe('main', () => {
	const mockState = {
		get: () => {
			return [
				{
					installed: '4.6.7',
					latest: '4.7.0',
					mismatch: false,
					moduleName: 'lodash',
					unused: false
				},
				{
					installed: '2.0.0',
					latest: '3.19.0',
					mismatch: true,
					moduleName: 'eslint',
					packageWanted: '3.19.0',
					unused: false
				},
				{
					installed: '1.7.0',
					latest: '1.7.0',
					mismatch: false,
					moduleName: 'foo',
					unused: true
				}
			];
		}
	};

	beforeEach(() => {
		npmCheck.mockReturnValue(new Promise(resolve => resolve(mockState)));
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('test', () => {
		const expected = [
			{
				message: 'Package \'lodash\' is not up to date. Installed \'4.6.7\', latest \'4.7.0\''
			}, {
				message: 'Package \'eslint\' installed outside of specified package.json range. Expected \'3.19.0\', actual \'2.0.0\'.'
			}, {
				message: 'Package \'eslint\' is not up to date. Installed \'2.0.0\', latest \'3.19.0\''
			}, {
				message: 'Package \'foo\' is not in use.'
			}
		];

		it('finds several packages out of date without special parsers.', () => {
			const options = {
				outOfDate: true,
				unused: true
			};

			return test(options, {}).then((results) => {
				expect(npmCheck).toBeCalledWith({
					skipUnused: false
				});
				expect(results).toEqual(expected);
			});
		});
		it('finds several packages out of date.', () => {
			const options = {
				outOfDate: true,
				specials: [
					'es6'
				],
				unused: true
			};

			return test(options, {}).then((results) => {
				expect(npmCheck).toBeCalledWith({
					skipUnused: false,
					specials: [
						'es6'
					]
				});
				expect(results).toEqual(expected);
			});
		});
	});
});
