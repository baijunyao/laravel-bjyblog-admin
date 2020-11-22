/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    if (response.status === 422) {
      response.json().then(body => {
        Object.keys(body.errors).forEach(key => {
          body.errors[key].forEach((description: string) => {
            notification.error({
              message: key,
              description,
            });
          });
        })
      });
    } else {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, url } = response;

      const urlWithoutParameter = url.split('?')[0];

      if (urlWithoutParameter.slice(-11) === 'oauth/token' && status === 400) {
        notification.error({
          message: formatMessage({ id: 'Fail' }),
          description: formatMessage({ id: 'The email or password is incorrect' }),
        });
      } else if (urlWithoutParameter.slice(-17) !== 'socialiteUsers/me') {
        notification.error({
          message: formatMessage({ id: 'Fail' }),
          description: errorText,
        });
      }
    }
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: getToken(),
  },
});

interface Params {
  currentPage: number;
  page: number;
  sorter: string;
  sort: string;
}

request.use(async (ctx, next) => {
  if (ctx.req.options.method === 'get') {
    const params = ctx.req.options.params as Params;

    if (params !== undefined) {
      params['filter[trashed]'] = 'with';

      if (params.currentPage !== undefined) {
        params.page = params.currentPage;
      }

      if (params.sorter !== undefined) {
        const sorterArray = params.sorter.split('_');
        const direction = sorterArray[sorterArray.length - 1];
        const field = params.sorter.replace(`_${direction}`, '');

        params.sort = (direction === 'ascend' ? '' : '-') + field;
      }
    }
  }

  await next();

  if (ctx.res.meta !== undefined) {
    ctx.res.pagination = {
      total: ctx.res.meta.total,
      pageSize: ctx.res.meta.per_page,
      current: ctx.res.meta.current_page,
      showSizeChanger: false,
    }

    ctx.res.list = ctx.res.data;
  }

  if (ctx.req.options.method !== 'GET') {
    message.success(formatMessage({ id: 'Success' }));
  }
})

export function getToken() {
  return localStorage.getItem('token') === undefined ? '' : `Bearer ${localStorage.getItem('token')}`;
}

export default request;
