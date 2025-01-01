# GLTF Bulk Optimizer

GLTF Bulk Optimizer is a tool that enhances [Juunini's gltf-optimizer](https://github.com/juunini/gltf-optimizer) to process multiple GLTF files in bulk. It optimizes the textures of 3D models and applies Draco compression to save storage space and improve performance. This version allows users to select a folder, find all `.glb` files within it, and compress them into another output folder.

## Video showcase


## Features

- **Bulk Optimization**: Process multiple GLTF files at once.
- **Texture Optimization**: Optimize textures to reduce file size.
- **Draco Compression**: Apply Draco compression to 3D models.
- **Customizable Output**: Choose an output folder for the optimized files.

## Installation

To install the dependencies, run:

```
npm install
```

## Usage
To start the application, run:

```
npm start
```

## Command Line Interface
You can also use the command line interface to optimize GLTF files:

```
gltf-optimizer --input <input-folder> --output <output-folder>
```

## Development
Building the Project
To build the project, run:

```
npm run build
```


Packaging the Application
To package the application for distribution, run:


## Acknowledgements
Juunini: For creating the original CLI version of gltf-optimizer. GitHub
Don McCurdy: For the glTF-Transform API. GitHub
Harvard's CS50: For teaching the fundamentals of coding. Special thanks to David Malan, Doug Lloyd, and Brian Yu.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
Developed by Ignacio Parentella for Harvard's CS50 Final Project.
