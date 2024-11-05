import { readFileSync, writeFileSync } from "fs";

const lines = readFileSync("colors.styl").toString().split("\n");
const colors = {};

for (const line of lines) {
  const [name, hexCode] = line.split(" = #");
  let [, ...nameSegments] = name.split("-");

  if (/-\d+$/.test(name)) {
    nameSegments.pop();
  }

  const brand = nameSegments.join("-");

  if (colors[brand] === undefined) {
    colors[brand] = new Set();
  }

  colors[brand].add(hexCode);
}

for (const [key, value] of Object.entries(colors)) {
  colors[key] = [...value];
}

writeFileSync("colors.json", JSON.stringify(colors, undefined, 0));

writeFileSync(
  "colors-2-spaces.json",
  JSON.stringify(colors, undefined, 2),
);

writeFileSync(
  "colors-4-spaces.json",
  JSON.stringify(colors, undefined, 4),
);
