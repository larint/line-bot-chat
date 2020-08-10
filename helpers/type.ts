export interface typeArea {
	city?: string,
	confirmed?: string,
	active?: string,
	recovered?: string,
	deaths?: string,
}

export interface typeDataCovid {
	vn: {
		confirmed?: string,
		active?: string,
		recovered?: string,
		deaths?: string,
	},
	tg: {
		confirmed?: string,
		active?: string,
		recovered?: string,
		deaths?: string,
	},
	areas: typeArea[] | undefined
}
