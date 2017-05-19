// @flow

import npmCheck from 'npm-check';
import type { npmCheckOptions } from './types';

type schemaType = {
	properties: {
		outOfDate: {
			description: string,
			type: string
		},
		specials: {
			items: {
				description: string,
				type: string
			},
			type: string
		},
		unused: {
			type: string,
			description: string
		}
	},
	type: string
};

export const schema: schemaType = {
	properties: {
		outOfDate: {
			description: 'Include warnings for out of date dependencies.',
			type: 'boolean'
		},
		specials: {
			items: {
				description: 'List of depcheck special parsers to include.',
				type: 'string'
			},
			type: 'array'
		},
		unused: {
			description: 'Include warnings for unused dependencies.',
			type: 'boolean'
		}
	},
	required: [
		'outOfDate',
		'unused'
	],
	type: 'object'
};

type programType = {
	config: string
};

type resultType = Array<{
	message: string
}>;

type ruleConfigType = {
	outOfDate: boolean,
	specials: Array<string>,
	unused: boolean
};

export function test (ruleConfig: ruleConfigType, program: programType): Promise<resultType> {
	const results = [];
	const options = mapOptions(ruleConfig);

	return npmCheck(options).then((state) => {
		state.get('packages').forEach((pkg) => {
			if (pkg.unused) {
				results.push({
					message: `Package '${pkg.moduleName}' is not in use.`
				});
			}

			if (pkg.mismatch) {
				results.push({
					message: `Package '${pkg.moduleName}' installed outside of specified package.json range. Expected '${pkg.packageWanted}', actual '${pkg.installed}'.`
				});
			}

			if (ruleConfig.outOfDate && pkg.latest !== pkg.installed) {
				results.push({
					message: `Package '${pkg.moduleName}' is not up to date. Installed '${pkg.installed}', latest '${pkg.latest}'`
				});
			}
		});

		return results;
	});
}

function mapOptions (ruleConfig: ruleConfigType): npmCheckOptions {
	const options: npmCheckOptions = {
		skipUnused: !ruleConfig.unused
	};

	if (ruleConfig.specials && ruleConfig.specials.length > 0) {
		options.specials = ruleConfig.specials;
	}

	return options;
}
