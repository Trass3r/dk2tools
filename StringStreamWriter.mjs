
export class StringStreamWriter {
	constructor() {
		this.buffer = "";
	}

	write(formattedString) {
		this.buffer += formattedString;
	}
}
