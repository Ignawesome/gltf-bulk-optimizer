//const { node } = require('./node');
const { optimizer } = require('./index');
// const { web } = require('./web');
const constants = require('./constants');

const fs = require('fs');
const path = require('path');
//const { Options } = require('./node/index.ts');
//import { Options }  from './node/index';

async function startOptimization(input_path: string, output_dir: string, formValues: object): Promise<boolean> {
	try {
		// Read all the files in the directory and pass them to the optimizer
		const directory = fs.readdirSync(input_path);

		// If output directory does not exist, create it
		if (!fs.existsSync(output_dir)) {
			fs.mkdirSync(output_dir);
		}

		for (const file of directory) {
			if (!file.endsWith('.glb')) {
				continue;
			}
			const filePath = path.join(input_path, file);
			const glb = fs.readFileSync(filePath);
			try {
				const result = await process_glb(glb, formValues);

				// Save the optimized files to the output directory
				const outputFilePath = path.join(output_dir, `${path.basename(file, '.glb')}_compressed.glb`);
				fs.writeFileSync(outputFilePath, result);
				console.log(`Optimized file saved to ${outputFilePath}`);
			} catch (error: any) {
				console.error(`Error processing file ${file}:`, error.message);
			}
		}
		return true;
	} catch (error: any) {
		console.error('Error during optimization:', error.message);
		return false;
	}
}

async function process_glb(glb: Uint8Array, _options?: any): Promise<Uint8Array> {
	return await optimizer.node(glb, {
		emissiveStrength: _options?.emissiveStrength ?? constants.EMISSIVE_STRENGTH,
		transform: {
			draco: { method: _options?.transform?.draco?.method ?? constants.DRACO_METHOD },
			weld: { tolerance: _options?.transform?.weld?.tolerance ?? constants.WELD_TOLERANCE },
			simplify: {
				enabled: _options?.transform?.simplify?.enabled ?? constants.SIMPLIFY,
				ratio: _options?.transform?.simplify?.ratio ?? constants.SIMPLIFY_RATIO,
				error: _options?.transform?.simplify?.error ?? constants.SIMPLIFY_ERROR
			},
			texture: {
				resize: {
					resolution: _options?.transform?.texture?.resize?.resolution ?? constants.TEXTURE_RESIZE_RESOLUTION,
					filter: _options?.transform?.texture?.resize?.filter ?? constants.TEXTURE_RESIZE_QUALITY
				}
			}
		}
	});
}

module.exports = {
	startOptimization
};
// Add this line to mark the file as a module
export { };