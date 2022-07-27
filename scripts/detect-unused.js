// https://github.com/vercel/next.js/discussions/10655#discussioncomment-553
const madge = require("madge");
const path = require("path");

function pruneTree(subtree, tree) {
  if (!subtree || subtree.length === 0) return;
  for (let child of subtree) {
    const nextSubtree = tree[child];
    if (tree[child]) {
      delete tree[child];
    }
    pruneTree(nextSubtree, tree);
  }
}

madge(path.join(__dirname, "..", "src"), {
  baseDir: path.join(__dirname, "..", "src"),
  excludeRegExp: [/^translations\/locales\/.*\.js/, /.*.test.ts/],
  fileExtensions: ["js", "jsx", "ts", "tsx"],
  tsConfig: path.join(__dirname, "..", "tsconfig.json"),
}).then((res) => {
  const tree = res.obj();

  const entrypoints = Object.keys(tree).filter(
    (e) => e.startsWith("pages/") || e.startsWith("pages\\")
  );
  pruneTree(entrypoints, tree);

  const unusedFiles = Object.keys(tree);
  if (unusedFiles.length) {
    console.log(
      `⚠️  Found ${unusedFiles.length} files that no one is depending on, please consider removing:`
    );
    unusedFiles.forEach((file) => {
      console.log("\x1b[33m%s\x1b[0m", file);
    });
    process.exit(1);
  } else {
    console.log("🎉 No unused files found!");
    process.exit(0);
  }
});
