declare module "depcheck" {
	declare type optionsType = {
		ignoreBinPackage: boolean, // ignore the packages with bin entry
		ignoreDirs: Array<string>, // folder with these names will be ignored
		ignoreMatches: Array<string>, // ignore dependencies that matches these globs
		parsers: { // the target parsers
			[string]: string
		},
		detectors: Array<string>,
		specials: Array<string> // the target special parsers
	};

	declare function depcheck (rootDir: string, options: optionsType, callback: function): void;

	declare module.exports: {
		(): depcheck,
		detector: {
			[string]: string
		},
		parser: {
			[string]: string
		},
		special: {
			[string]: string
		}
	};
};
