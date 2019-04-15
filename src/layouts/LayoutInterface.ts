import { string } from "prop-types";

export interface IrouteData{
  authority?:string[];
  children?:IrouteData[];
  icon?:string;
  locale?:string;
  name?:string;
  path?:string;
  exact?:boolean;
  component?:any;
}

export interface IBasicLayoutState{
  rendering:boolean;
  isMobile:boolean;
  menuData:IrouteData[];
}
