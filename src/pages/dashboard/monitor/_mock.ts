import mockjs from 'mockjs';

export default {
  'GET  /api/tags2': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
};
