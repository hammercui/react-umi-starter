declare module '*.css';
declare module "*.png";
declare module '*.less';
declare interface IpropBoolean{
  [propName: string]: boolean;
}
declare interface IdvaLoading{
  effects:IpropBoolean;
  global:boolean;
  models:IpropBoolean;
}
