// vite.config.js
import { defineConfig } from "file:///home/arlosmar/webs/protectoraxativa/node_modules/vite/dist/node/index.js";
import laravel from "file:///home/arlosmar/webs/protectoraxativa/node_modules/laravel-vite-plugin/dist/index.js";
import react from "file:///home/arlosmar/webs/protectoraxativa/node_modules/@vitejs/plugin-react/dist/index.mjs";
import commonjs from "file:///home/arlosmar/webs/protectoraxativa/node_modules/vite-plugin-commonjs/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.jsx",
      refresh: true
    }),
    react(),
    commonjs()
    //compression({/*include: [/\.(js)$/, /\.(css)$/],*/deleteOriginalAssets: false}) // it deletes the original css and js files
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hcmxvc21hci93ZWJzL3Byb3RlY3RvcmF4YXRpdmFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2FybG9zbWFyL3dlYnMvcHJvdGVjdG9yYXhhdGl2YS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9hcmxvc21hci93ZWJzL3Byb3RlY3RvcmF4YXRpdmEvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBsYXJhdmVsIGZyb20gJ2xhcmF2ZWwtdml0ZS1wbHVnaW4nO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBjb21tb25qcyBmcm9tICd2aXRlLXBsdWdpbi1jb21tb25qcyc7XG5cbi8vaW1wb3J0IHsgY29tcHJlc3Npb24gfSBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbjInO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgbGFyYXZlbCh7XG4gICAgICAgICAgICBpbnB1dDogJ3Jlc291cmNlcy9qcy9hcHAuanN4JyxcbiAgICAgICAgICAgIHJlZnJlc2g6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICByZWFjdCgpLFxuICAgICAgICBjb21tb25qcygpLFxuICAgICAgICAvL2NvbXByZXNzaW9uKHsvKmluY2x1ZGU6IFsvXFwuKGpzKSQvLCAvXFwuKGNzcykkL10sKi9kZWxldGVPcmlnaW5hbEFzc2V0czogZmFsc2V9KSAvLyBpdCBkZWxldGVzIHRoZSBvcmlnaW5hbCBjc3MgYW5kIGpzIGZpbGVzXG4gICAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UixTQUFTLG9CQUFvQjtBQUMzVCxPQUFPLGFBQWE7QUFDcEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sY0FBYztBQUlyQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUE7QUFBQSxFQUViO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
