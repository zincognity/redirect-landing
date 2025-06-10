import { readdir, readFile, writeFile } from "fs/promises";
import JSON5 from "json5";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import currentPackage from "../package.json" with { type: "json" };

// Read the bun.lock file manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const bunLockPath = join(__dirname, "..", "bun.lock");
const bunLockContent = await readFile(bunLockPath, "utf8");
const bunLock = JSON5.parse(bunLockContent);

const importRegex = /(?:from|import)\s*['"]([^'"]+)['"];/g;

/**
 * Strips comments from the given code.
 * @param {string} code - The code to strip comments from.
 * @returns {string} - The code without comments.
 */
function stripComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

/**
 * Recursively gets all .mjs files in the given directory.
 * @param {string} dir - The directory to search.
 * @returns {Promise<string[]>} - A promise that resolves to an array of file paths.
 */
async function getJsFilesRecursively(dir) {
  let results = [];
  const list = await readdir(dir, { withFileTypes: true });

  for (const dirent of list) {
    const filePath = join(dir, dirent.name);

    if (dirent.isDirectory()) {
      const nested = await getJsFilesRecursively(filePath);
      results = results.concat(nested);
    } else if (extname(filePath) === ".mjs") {
      results.push(filePath);
    }
  }

  return results;
}

/**
 * Extracts external dependencies from a .mjs file.
 * @param {string} filePath - The path to the .mjs file.
 * @returns {Promise<Set<string>>} - A promise that resolves to a set of external dependencies.
 */
async function extractExternalDependencies(filePath) {
  const content = await readFile(filePath, "utf8");
  const cleaned = stripComments(content);
  const dependencies = new Set();
  let match;

  while ((match = importRegex.exec(cleaned)) !== null) {
    const importPath = match[1];
    const dep = importPath.startsWith("@")
      ? importPath.split("/").slice(0, 2).join("/")
      : importPath.split("/")[0];

    if (!dep.startsWith(".") && !dep.startsWith("node")) {
      dependencies.add(dep);
    }
  }

  return dependencies;
}

/**
 * Gets all external dependencies from .mjs files in the given directory.
 * @param {string} basePath - The base directory to search.
 * @returns {Promise<string[]>} - A promise that resolves to an array of external dependencies.
 */
async function getAllExternalDependencies(basePath) {
  const jsFiles = await getJsFilesRecursively(basePath);
  const allDeps = new Set();

  for (const file of jsFiles) {
    const deps = await extractExternalDependencies(file);
    deps.forEach((dep) => allDeps.add(dep));
  }

  return Array.from(allDeps);
}

const targetDir = join(__dirname, "..", "./dist");

getAllExternalDependencies(targetDir).then(async (deps) => {
  // Create a package.json file with the dependencies
  const packageJson = {
    name: currentPackage.name,
    version: currentPackage.version,
    dependencies: {},
  };

  deps.forEach((dep) => {
    const bunLockEntry = bunLock.packages[dep]?.[0];

    // Use the version from bun.lock if available
    if (bunLockEntry) {
      packageJson.dependencies[dep] = bunLockEntry.split("@").pop();
    } else {
      packageJson.dependencies[dep] = "latest";
    }
  });

  // Write the package.json file
  const packageJsonPath = join(__dirname, "..", "./dist/package.json");
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
});
