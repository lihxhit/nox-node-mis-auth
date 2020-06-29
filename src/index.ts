import path from 'path';
import axios from 'axios';
import ejs from 'ejs';
import { IncomingMessage, ServerResponse } from 'http';
import * as OPTIONS from './options';

declare module 'http' {
  interface IncomingMessage {
    $nox:{
      misAuth:{
        resList:[]
      }
    }
  }
}
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
export const AuthMiddleware = (options: OPTIONS_PROPS) => {
  // const USER_OPTIONS = options.dev ? OPTIONS.DEV_OPTION : OPTIONS.PROD_OPTION;
  const USER_OPTIONS = options;
  const { name } = USER_OPTIONS;
  return async (req:IncomingMessage, res, next) => {
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
    req.$nox = {
      ...req.$nox,
    };
    req.$nox.misAuth = {
      ...req.$nox.misAuth,
      resList: data.data?.list || [],
    };
    next();
    // console.log(req, res, next);
  };
};
AuthMiddleware.OPTIONS = OPTIONS;

export const ErrorAuthMiddleware = async (req:IncomingMessage, res:ServerResponse, next) => {
  if (!req.$nox.misAuth.resList.length) {
    const html = await ejs.renderFile(path.resolve(__dirname, '../error.ejs'), {}, { async: true });
    return res.end(html);
  }
  return next();
};
