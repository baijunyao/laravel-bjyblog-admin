import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
      ]
    },
    {
      path: '/admin',
      component: '../layouts/BasicLayout',
      routes: [
        {
          name: 'category',
          icon: 'highlight',
          path: '/admin/category',
          routes: [
            {
              name: 'index',
              path: '/admin/category/index',
              component: './admin/category/index',
            },
          ],
        },
        {
          name: 'tag',
          icon: 'highlight',
          path: '/admin/tag',
          routes: [
            {
              name: 'index',
              path: '/admin/tag/index',
              component: './admin/tag/index',
            },
          ],
        },
        {
          name: 'comment',
          icon: 'highlight',
          path: '/admin/comment',
          routes: [
            {
              name: 'index',
              path: '/admin/comment/index',
              component: './admin/comment/index',
            },
          ],
        },
        {
          name: 'adminUser',
          icon: 'highlight',
          path: '/admin/adminUser',
          routes: [
            {
              name: 'index',
              path: '/admin/adminUser/index',
              component: './admin/adminUser/index',
            }
          ],
        },
        {
          name: 'socialiteClient',
          icon: 'highlight',
          path: '/admin/socialiteClient',
          routes: [
            {
              name: 'index',
              path: '/admin/socialiteClient/index',
              component: './admin/socialiteClient/index',
            },
          ],
        },
        {
          name: 'socialiteUser',
          icon: 'highlight',
          path: '/admin/socialiteUser',
          routes: [
            {
              name: 'index',
              path: '/admin/socialiteUser/index',
              component: './admin/socialiteUser/index',
            },
          ],
        },
        {
          name: 'friendshipLink',
          icon: 'highlight',
          path: '/admin/friendshipLink',
          routes: [
            {
              name: 'index',
              path: '/admin/friendshipLink/index',
              component: './admin/friendshipLink/index',
            },
          ],
        },
        {
          name: 'site',
          icon: 'highlight',
          path: '/admin/site',
          routes: [
            {
              name: 'index',
              path: '/admin/site/index',
              component: './admin/site/index',
            },
          ],
        },
        {
          name: 'note',
          icon: 'highlight',
          path: '/admin/note',
          routes: [
            {
              name: 'index',
              path: '/admin/note/index',
              component: './admin/note/index',
            },
          ],
        },
        {
          name: 'openSource',
          icon: 'highlight',
          path: '/admin/openSource',
          routes: [
            {
              name: 'index',
              path: '/admin/openSource/index',
              component: './admin/openSource/index',
            },
          ],
        },
        {
          name: 'config',
          icon: 'highlight',
          path: '/admin/config',
          routes: [
            {
              name: 'email',
              path: '/admin/config/email',
              component: './admin/config/email',
            },
            {
              name: 'commentAudit',
              path: '/admin/config/commentAudit',
              component: './admin/config/commentAudit',
            },
            {
              name: 'qqQun',
              path: '/admin/config/qqQun',
              component: './admin/config/qqQun',
            },
            {
              name: 'backup',
              path: '/admin/config/backup',
              component: './admin/config/backup',
            },
            {
              name: 'seo',
              path: '/admin/config/seo',
              component: './admin/config/seo',
            },
            {
              name: 'socialShare',
              path: '/admin/config/socialShare',
              component: './admin/config/socialShare',
            },
            {
              name: 'socialLink',
              path: '/admin/config/socialLink',
              component: './admin/config/socialLink',
            },
            {
              name: 'search',
              path: '/admin/config/search',
              component: './admin/config/search',
            },
            {
              name: 'otherSetting',
              path: '/admin/config/otherSetting',
              component: './admin/config/otherSetting',
            },
          ],
        },
        // {
        //   component: '404',
        // },
      ]
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/oauth/*': {
      target: 'http://laravel-bjyblog.test/',
      changeOrigin: true,
    },
    '/api/*': {
      target: 'http://laravel-bjyblog.test/',
      changeOrigin: true,
    },
  },
} as IConfig;
