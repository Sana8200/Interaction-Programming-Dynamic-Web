//import reactNativeTesting from "vitest-react-native";
import { defineConfig, loadEnv } from "vite";
import fs from "fs";
import virtualHtml from 'vite-plugin-virtual-html';
import vuePlugin from '@vitejs/plugin-vue';

import  {getAliases} from "./node_modules/@iprog/test/test/aliases"

const pages= {
    "":{
        entry:'/src/teacherFetch.js',
        title:"Choose framework", 
        body: 'Choose web framework: <a href="vue.html">Vue</a>,  <a href="react.html">React</a>'
    },
    "vue":{
        entry: '/src/vuejs/index.jsx',
        title:"DinnerPlanner Vue", 
        body: '<div id="root"></div>'
    },
    "react":{
        entry: '/src/reactjs/index.jsx',
        title:"DinnerPlanner React", 
        body: '<div id="root"></div>'
    },
}
// running tests from @iprog/test
// https://github.com/micromatch/micromatch?tab=readme-ov-file#extglobs
const exclude= ['node_modules/!(@iprog)/**', '**/__tests__/**'];

function splash(){   
    fs.readFile("./lab-pyramid.txt", "utf-8", (err,data)=> setTimeout(()=>console.log(data), 1000));
}
const splashPlugin = {
  name: 'build-index',
  // transformIndexHtml(){ splash(); },
  buildStart(){ splash(); },
};

export default defineConfig(function({mode,command, ...other}){
  const env = loadEnv(mode, process.cwd(), '')

  return{
    plugins: [
      //reactNativeTesting(), // does not seem to affect react and vue
      splashPlugin,
      virtualHtml({pages})      // HTML mappings
    ],
    server: {
      host: "0.0.0.0",
      port: 8080,
    },
    define: {
      //USERNAME: JSON.stringify(username),
      //TELEMETRY: JSON.stringify(telemetryUserInfo),
      //SEMESTER: JSON.stringify(semester),
      HASH_PAUSE:15,
      __VUE_OPTIONS_API__:JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__:JSON.stringify(true),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__:JSON.stringify(true) 
    },
    build: {
      target: 'esnext',   // javascript version to target: latest
      chunkSizeWarningLimit: 600,
      minify: false,
      sourcemap:true,
    },
    test:{
      environment: "happy-dom",
      //setupFiles: ['test-setup.js'],
      exclude: [...exclude, "**/*.native.test.*"],
      clearMocks:true,   // clear mocks after each test
      css:true
    },
    resolve: mode==="test"?getAliases("/node_modules/@iprog/test/test/dummy/"):{}
    };
});
