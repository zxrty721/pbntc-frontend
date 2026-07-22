import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";

export default defineConfig({
    plugins: [
        pluginReact(),
        // ปลั๊กอินนี้จะช่วยเช็ค Error ของ TypeScript บน Terminal ระหว่างที่คุณรันเซิร์ฟเวอร์
        pluginTypeCheck(),
    ],
    source: {
        entry: {
            index: "./src/main.tsx",
        },
    },
    html: {
        template: "./index.html",
    },
    output: {
        minify: true,
        assetPrefix: '/pbntc69/map/dist/',
    },
});
