const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

// Read the base schema from prisma folder
const base = fs.readFileSync(
  path.join(__dirname, "../prisma/base.schema.prisma"),
  "utf-8"
);

const prismaDir = path.join(__dirname, "../prisma");
const schemaPath = path.join(__dirname, "../prisma/schema.prisma");

// Get all model files from prisma folder
const modelFiles = fs
  .readdirSync(prismaDir)
  .filter((f) => f.endsWith(".schema.prisma") && f !== "base.schema.prisma")
  .map((f) => fs.readFileSync(path.join(prismaDir, f), "utf-8"))
  .join("\n\n");

// Write merged schema
fs.writeFileSync(schemaPath, `${base}\n\n${modelFiles}`);
console.log("✅ prisma/schema.prisma generated successfully!");

try {
  // Run prisma generate
  console.log("🔄 Running prisma generate...");
  execSync("npx prisma generate", { stdio: "inherit" });
  console.log("✅ Prisma client generated successfully!");

  // Run prisma migrate dev
  console.log("🔄 Running prisma migrate dev...");
  execSync("npx prisma migrate dev", { stdio: "inherit" });
  console.log("✅ Prisma migration completed successfully!");

  // Delete the generated schema file
  fs.unlinkSync(schemaPath);
  console.log("🗑️  Temporary schema.prisma deleted!");
} catch (error) {
  console.error("❌ Error during prisma generate:", error.message);
  // Still delete the file even if generate fails
  if (fs.existsSync(schemaPath)) {
    fs.unlinkSync(schemaPath);
    console.log("🗑️  Temporary schema.prisma deleted!");
  }
}
