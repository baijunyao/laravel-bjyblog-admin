import { Subscription } from 'dva';

export interface GlobalModelState {
  collapsed: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
