
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
