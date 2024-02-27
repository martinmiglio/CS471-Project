import fs from "fs";
import path from "path";

const migrationsFolder = path.join(__dirname, "migrations");

const folders = fs.readdirSync(migrationsFolder);

const sortedFolders = folders
  .map((folder) => ({ date: parseInt(folder.split("_")[0]), folder }))
  .sort((a, b) => b.date - a.date);

const latestMigrationFolder = sortedFolders[0];

const latestMigrationFile = fs
  .readdirSync(path.join(migrationsFolder, `${latestMigrationFolder.folder}`))
  .pop();

if (!latestMigrationFile) {
  throw new Error("No migration file found");
}

const latestMigrationPath = path.join(
  migrationsFolder,
  `${latestMigrationFolder.folder}`,
  latestMigrationFile,
);

console.log(latestMigrationPath);
