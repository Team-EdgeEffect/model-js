import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    target: "node",
};
