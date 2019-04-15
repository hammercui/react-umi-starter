/*
 * @Description: 自定义flv
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2018-12-27 15:24:08
 * @LastEditors: hammercui
 * @LastEditTime: 2018-12-27 16:43:59
 */

import React, { Component } from 'react';
import FlvJs from 'flv.js';
import { Player } from 'video-react';

class FlvSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.flvPlayer = FlvJs.createPlayer({
      type: 'flv',
      url: props.src,
    });
  }

  componentDidMount() {
    const { src, video } = this.props;
    if (FlvJs.isSupported()) {
      this.flvPlayer.attachMediaElement(video);
      this.flvPlayer.load();
      this.flvPlayer.on(FlvJs.Events.METADATA_ARRIVED, () => {
        video.play();
      });
    }
  }

  componentWillUnmount() {
    if (this.flvPlayer) {
      this.flvPlayer.destroy();
    }
  }

  render() {
    const { src, type } = this.props;
    return <source src={src} type={type || 'application/x-mpegURL'} />;
  }
}

const ZVideo = ({ src, className, style }) => (
  <div className={className} style={style}>
    <Player>
      <FlvSource isVideoChild src={src} />
    </Player>
  </div>
);
export default ZVideo;
