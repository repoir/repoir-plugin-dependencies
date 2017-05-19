import type { npmCheckOptions } from '../../src/types';

declare module "npm-check" {
	declare type currentState = {
		packages: Array<{
			moduleName: string, // name of the module.
			homepage: string, // url to the home page.
			regError: any, // error communicating with the registry
			pkgError: any, // error reading the package.json
			latest: string, // latest according to the registry.
			installed: string, // version installed
			isInstalled: boolean, // Is it installed?
			notInstalled: boolean, // Is it installed?
			packageWanted: string, // Requested version from the package.json.
			packageJson: string, // Version or range requested in the parent package.json.
			devDependency: boolean, // Is this a devDependency?
			usedInScripts: Array<string>, // Array of `scripts` in package.json that use this module.
			mismatch: boolean, // Does the version installed not match the range in package.json?
			semverValid: string, // Is the installed version valid semver?
			easyUpgrade: boolean, // Will running just `npm install` upgrade the module?
			bump: string, // What kind of bump is required to get the latest, such as patch, minor, major.
			unused: boolean // Is this module used in the code?
		}>
	};
	declare function npmCheck (options: npmCheckOptions): Promise<currentState>;
	declare module.exports: {
		(): npmCheck
	};
};
