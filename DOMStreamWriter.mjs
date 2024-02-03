
export class DOMStreamWriter {
	constructor(targetElementId) {
		this.targetElement = document.getElementById(targetElementId);
	}

	write(formattedString) { //data, ...args) {
		if (this.targetElement) {
			//const formattedString = util.format(data, ...args);
			this.targetElement.textContent += formattedString;
		} else {
			console.error(`Element with id '${targetElementId}' not found.`);
		}
	}
}

/*
function writeToStream(data, outputStream, ...args) {
	outputStream.write(data, ...args);
}

const outputDivWriter = new DOMStreamWriter('output');
writeToStream('Formatted text: %s - %s', outputDivWriter, 'arg1', 'arg2');
*/