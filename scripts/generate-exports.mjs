import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({ console });

for (const relativePath of ['js/rib-atoms.js', 'js/tokens.js', 'js/exports.js']) {
  const source = fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
  vm.runInContext(source, context, { filename: relativePath });
}

const exportsApi = vm.runInContext('GlobalDSExports', context);
const outputDirectories = {
  'kotlin-react': 'kotlin-react',
  flutter: 'flutter',
  swiftui: 'swiftui',
};

for (const target of exportsApi.targets) {
  const outputDirectory = path.join(projectRoot, outputDirectories[target.id]);
  fs.mkdirSync(outputDirectory, { recursive: true });

  for (const filename of target.files) {
    const outputPath = path.join(outputDirectory, filename);
    fs.writeFileSync(outputPath, exportsApi.generate(filename), 'utf8');
    console.log(path.relative(projectRoot, outputPath));
  }
}
