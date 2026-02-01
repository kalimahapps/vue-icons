type Modification = {
	start: number;
	end: number;
	replacement: string;
	type: 'icon' | 'attribute';
};

export type { Modification };