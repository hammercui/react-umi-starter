import * as React from 'react';

export interface IZImage {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  key?:number|string;
}

export default class ZImage extends React.Component<IZImage, any> {}
