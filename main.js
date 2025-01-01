const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs'); 
const { startOptimization } = require('./dist/optimization'); // Require the compiled JavaScript file


function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			enableRemoteModule: false,
			nodeIntegration: false
		}
	});

	mainWindow.loadFile('./dist/index.html');
	mainWindow.on('closed', () => {
		console.log('Main window closed');
	});
}

app.whenReady().then(() => {
	createWindow();
	console.log('App is ready');
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', function () {
	console.log('All windows closed');
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('browse-input-directory', async () => {
	const result = await dialog.showOpenDialog({
		properties: ['openDirectory']
	});
	return result.filePaths;
});

ipcMain.handle('browse-output-directory', async () => {
	const result = await dialog.showOpenDialog({
		properties: ['openDirectory']
	});
	return result.filePaths;
});

ipcMain.handle('start-optimization', async (event, input_dir, output_dir, formValues) => {
	
	// if input_dir is empty, show error dialog and return
	if (input_dir === '') {
		await dialog.showMessageBox({
			type: 'error',
			title: 'Input Directory Error',
			message: 'Please select an input directory.',
			buttons: ['OK']
		});
		return;
	}
	// if input_dir is not a valid directory, show error dialog and return
	if (!fs.existsSync(input_dir)) {
		await dialog.showMessageBox({
			type: 'error',
			title: 'Input Directory Error',
			message: 'The selected input directory does not exist.',
			buttons: ['OK']
		});
		return;
	}
	// if output_dir is empty, show error dialog and return
	
	
	console.log('Starting optimization with:', input_dir, output_dir, formValues);

	try {
		const result = await startOptimization(input_dir, output_dir, formValues);
		if (result) {
			// Show dialog box with success message
			await dialog.showMessageBox({
				type: 'info',
				title: 'Optimization Complete',
				message: 'The optimization process completed successfully.',
				buttons: ['OK']
			});
		} else {
			// Show dialog box with error message
			await dialog.showMessageBox({
				type: 'error',
				title: 'Optimization Failed',
				message: 'The optimization process failed. Please check the console for more details.',
				buttons: ['OK']
			});
		}
	} catch (error) {
		// Show dialog box with error message
		await dialog.showMessageBox({
			type: 'error',
			title: 'Optimization Error',
			message: `An error occurred during the optimization process: ${error.message}`,
			buttons: ['OK']
		});
	}
});

ipcMain.handle('reset-values', async () => {
	// Implement the resetValues logic here
	const result = await dialog.showMessageBox({
		message: 'Are you sure you want to reset the values?',
		buttons: ['Yes', 'No']
	});
	// If answer is no, return
	if (result.response === 1) return;
	// If answer is yes, reset the values
	else {
		const defaultValues = {
			EMISSIVE_STRENGTH: 1.0,
			DRACO_METHOD: 'edgebreaker',
			WELD_TOLERANCE: 0.0001,
			SIMPLIFY: true,
			SIMPLIFY_RATIO: 0.75,
			SIMPLIFY_ERROR: 0.01,
			TEXTURE_RESIZE_RESOLUTION: 1024,
			TEXTURE_RESIZE_FILTER: 'LANCZOS3',
		};
		return defaultValues;
	}
});


;