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
      path: '/',
      redirect: '/dashboard/analysis',
    },
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
              component: '404',
            },
          ],
        },
      ]
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['user'],
      routes: [
        {
          name: 'dashboard',
          icon: 'highlight',
          path: '/dashboard',
          hideInMenu: true,
          routes: [
            {
              name: 'analysis',
              path: '/dashboard/analysis',
              component: './admin/dashboard/analysis/index',
            },
          ],
        },
        {
          name: 'category',
          icon: 'icon-category',
          path: '/category',
          routes: [
            {
              name: 'index',
              path: '/category/index',
              component: './admin/category/index',
            },
          ],
        },
        {
          name: 'tag',
          icon: 'icon-tag',
          path: '/tag',
          routes: [
            {
              name: 'index',
              path: '/tag/index',
              component: './admin/tag/index',
            },
          ],
        },
        {
          name: 'article',
          icon: 'icon-article',
          path: '/article',
          routes: [
            {
              name: 'index',
              path: '/article/index',
              component: './admin/article/index',
            },
            {
              path: '/article/create',
              component: './admin/article/create',
            },
            {
              path: '/article/edit/:id',
              component: './admin/article/edit',
            },
          ],
        },
        {
          name: 'comment',
          icon: 'icon-comment',
          path: '/comment',
          routes: [
            {
              name: 'index',
              path: '/comment/index',
              component: './admin/comment/index',
            },
          ],
        },
        {
          name: 'nav',
          icon: 'icon-menu',
          path: '/nav',
          routes: [
            {
              name: 'index',
              path: '/nav/index',
              component: './admin/nav/index',
            },
          ],
        },
        {
          name: 'adminUser',
          icon: 'icon-admin-user',
          path: '/adminUser',
          routes: [
            {
              name: 'index',
              path: '/adminUser/index',
              component: './admin/adminUser/index',
            }
          ],
        },
        {
          name: 'socialiteClient',
          icon: 'icon-third-login',
          path: '/socialiteClient',
          routes: [
            {
              name: 'index',
              path: '/socialiteClient/index',
              component: './admin/socialiteClient/index',
            },
          ],
        },
        {
          name: 'socialiteUser',
          icon: 'icon-user',
          path: '/socialiteUser',
          routes: [
            {
              name: 'index',
              path: '/socialiteUser/index',
              component: './admin/socialiteUser/index',
            },
          ],
        },
        {
          name: 'friend',
          icon: 'icon-link',
          path: '/friend',
          routes: [
            {
              name: 'index',
              path: '/friend/index',
              component: './admin/friend/index',
            },
          ],
        },
        {
          name: 'site',
          icon: 'icon-blog',
          path: '/site',
          routes: [
            {
              name: 'index',
              path: '/site/index',
              component: './admin/site/index',
            },
          ],
        },
        {
          name: 'note',
          icon: 'icon-note',
          path: '/note',
          routes: [
            {
              name: 'index',
              path: '/note/index',
              component: './admin/note/index',
            },
          ],
        },
        {
          name: 'openSource',
          icon: 'icon-open-source',
          path: '/openSource',
          routes: [
            {
              name: 'index',
              path: '/openSource/index',
              component: './admin/openSource/index',
            },
          ],
        },
        {
          name: 'config',
          icon: 'icon-setting',
          path: '/config',
          routes: [
            {
              name: 'email',
              path: '/config/email',
              component: './admin/config/email',
            },
            {
              name: 'commentAudit',
              path: '/config/commentAudit',
              component: './admin/config/commentAudit',
            },
            {
              name: 'qqQun',
              path: '/config/qqQun',
              component: './admin/config/qqQun',
            },
            {
              name: 'backup',
              path: '/config/backup',
              component: './admin/config/backup',
            },
            {
              name: 'upload',
              path: '/config/upload',
              component: './admin/config/upload',
            },
            {
              name: 'seo',
              path: '/config/seo',
              component: './admin/config/seo',
            },
            {
              name: 'socialShare',
              path: '/config/socialShare',
              component: './admin/config/socialShare',
            },
            {
              name: 'socialLink',
              path: '/config/socialLink',
              component: './admin/config/socialLink',
            },
            {
              name: 'search',
              path: '/config/search',
              component: './admin/config/search',
            },
            {
              name: 'licenses',
              path: '/config/licenses',
              component: './admin/config/licenses',
            },
            {
              name: 'otherSetting',
              path: '/config/otherSetting',
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
      target: 'http://staging.baijunyao.com/',
      changeOrigin: true,
    },
    '/api/*': {
      target: 'http://staging.baijunyao.com/',
      changeOrigin: true,
    },
  },
  base: '/admin/',
  publicPath: '/admin/',
  history: 'hash',
} as IConfig;
