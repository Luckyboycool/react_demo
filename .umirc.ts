import { defineConfig } from 'umi';
import moment from 'moment';

export default defineConfig({
  title: 'AI+YEI',
  metas: [
    { name: 'version', content: 'v1.1.0' },
    { name: 'deploy', content: moment().format('YYYY-MM-DD HH:mm') },
  ],
  links: [{ rel: 'icon', href: 'favicon.ico' }],
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  proxy: {
    '/api': {
      target: 'http://192.168.2.178:30105',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
    '/my': {
      target: 'http://127.0.0.1:8080',
      pathRewrite: { '^/my': '' },
      changeOrigin: true,
    }
  },
  antd: {
    dark: false,
    compact: false,
  },
  dva: {
    immer: false,
    skipModelValidate: true,
    hmr: true,
  },
  dynamicImport: {
    loading: '@/components/loading',
  },
  outputPath: '/build',
  targets: {
    ie: 10,
  },
  // plugins: ['./src/plugins/umi-plugin-entry.ts']
  // theme: {
  //   '@primary-color': '#0dbc79',
  // },
});
