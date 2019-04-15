import React, { Component,CSSProperties } from 'react';
export interface IZVideo{
  src:string;
  className?:string;
  style?:CSSProperties
}
export default class ZVideo extends React.Component<IZVideo, any> {}
