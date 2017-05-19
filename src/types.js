export type npmCheckOptions = {
	global: boolean, // Default false
	update: boolean, // Default false
	skipUnused: boolean, // Default false
	ignoreDev: boolean, // Default false
	devOnly: boolean, // Default false
	cwd: string, // Default process.cwd
	saveExact: boolean, // Default false. Update package.json with exact version instead of semver range.
	specials: Array<string>
};
