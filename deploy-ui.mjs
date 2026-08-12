import fs from 'fs-extra';
import path from 'path';
import process from 'process';

const cwd = process.cwd();
const uiDist = path.join(cwd, 'ui/dist');
const assetsDist = path.join(uiDist, 'assets');
const outDist = path.join(cwd, 'dist');

const indexHtml = fs.readFileSync(path.join(uiDist, 'index.html'), 'utf8');

const scriptRegex = /<script[^>]*src="(?:\.?\/)?assets\/([^"]*\.js)"[^>]*><\/script>/g;
const cssRegex = /<link[^>]*href="(?:\.?\/)?assets\/([^"]*\.css)"[^>]*>/g;

let htmlContent = indexHtml;

htmlContent = htmlContent.replaceAll(
  scriptRegex,
  "<?!= include('$1'); ?>\n"
);

htmlContent = htmlContent.replaceAll(
  cssRegex,
  "\n<?!= include('$1'); ?>\n"
);

fs.writeFileSync(path.join(outDist, 'ui.html'), htmlContent);

const assetFiles = fs.readdirSync(assetsDist);

for (const filename of assetFiles) {
  const oldPath = path.join(assetsDist, filename);
  const ext = path.extname(filename);
  const newName = filename + '.html';
  const newPath = path.join(outDist, newName);

  if (ext === '.js') {
    const jsContent = fs.readFileSync(oldPath).toString();
    fs.writeFileSync(newPath, `<script type="module">\n${jsContent}\n</script>`);
  } else if (ext === '.css') {
    const cssContent = fs.readFileSync(oldPath).toString();
    fs.writeFileSync(newPath, `<style>\n${cssContent}\n</style>`);
  }
}
