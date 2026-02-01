type Attributes = {
	fill?: 'currentColor' | string;
	multicolor?: 'true' | string;
	twotone?: 'true' | string;
	pathfill?: string;
};

type IconGroup = {
	path: string;
	formatter?: (fileName: string, filePath: string) => string;
	filesFilter?: (filesList: string[]) => string[];
	attributes?: Attributes;
};

type ManifestEntry = {
	group: string;
	name: string;
	license: string;
	url: string;
	repo: string;
	version?: string;
	icons: IconGroup[];
};
