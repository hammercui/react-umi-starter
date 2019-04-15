declare module 'dva';
declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module "*.json" {
  const content: object;
  export default content;
}

declare module "umi/locale";

declare interface IpropBoolean{
  [propName: string]: boolean;
}
declare interface IdvaLoading{
  effects:IpropBoolean;
  global:boolean;
  models:IpropBoolean;
}
