// filepath: /my-electron-app/preload.js
// filepath: /E:/Seafile/Nacho_2/My Libraries/My Library/Software/Other/gltf-bulk-optimizer/preload.js

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector);
		if (element) element.innerText = text;
	};

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency]);
	}
	const { contextBridge, ipcRenderer } = require('electron');
	
	contextBridge.exposeInMainWorld('electron', {
		browseInputDirectory: () => ipcRenderer.invoke('browse-input-directory'),
		browseOutputDirectory: () => ipcRenderer.invoke('browse-output-directory'),
		startOptimization: (directory, output_dir, formValues) => ipcRenderer.invoke('start-optimization', directory, output_dir, formValues),
		getResetValues: () => ipcRenderer.invoke('reset-values')
	});
});