import axios from 'axios';
// import * as OPTIONS from './options';

interface OPTIONS_PROPS {
  baseURL: string,
  api: {
    resList?: string,
    resListService:string,
    logout?:string,
  },
  name:any,
  dev?: boolean,
  key:string
}
// const
const MiddleWare = (options: OPTIONS_PROPS) => {
  // const USER_OPTIONS = options.dev ? OPTIONS.DEV_OPTION : OPTIONS.PROD_OPTION;
  const USER_OPTIONS = options;
  const { name } = USER_OPTIONS;
  return async (req, res, next) => {
    const { data } = await axios({
      url: USER_OPTIONS.api?.resList || '/services/auth/userResList',
      baseURL: USER_OPTIONS.baseURL,
      method: 'post',
      headers: {
        AuthKey: USER_OPTIONS.key,
      },
      data: {
        service: USER_OPTIONS.api.resListService,
        email: typeof name === 'function' ? USER_OPTIONS.name(req, res) : name,
      },
    });
    req.$nox = req.$nox || {};
    req.$nox['mis-auth'] = {
      ...req.$nox['mis-auth'],
      resList: data.data?.list || [],
    };
    next();
    // console.log(req, res, next);
  };
};

export default MiddleWare;
