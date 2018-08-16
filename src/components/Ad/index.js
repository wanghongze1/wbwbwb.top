/* 广告渲染 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tag } from 'antd';
import style from './style.sass';
import { isWindowLoaded } from './windowLoad';

class Ad extends Component{
  static propTypes: Object = {
    src: PropTypes.string,
    className: PropTypes.string
  };

  iframeBox: Object = createRef();

  constructor(): void{
    super(...arguments);

    if(typeof window === 'object' && isWindowLoaded === false){
      window.addEventListener('load', this.handleAdLoad, false);
    }
  }
  componentDidMount(): void{
    this.loadAd();
  }
  componentDidUpdate(prevProps: Object, prevState: Object): void{
    this.loadAd();
  }
  handleAdLoad: Function = (): void=>{
    this.loadAd();
    window.removeEventListener('load', this.handleAdLoad);
  };
  loadAd(): void{
    const props: Object = this.props;
    if((isWindowLoaded === true || document.readyState === 'complete') && props.src){
      let element: ?Element = document.createElement('iframe');
      element.src = this.props.src;
      element.scrolling = 'no';
      element.width = '100%';
      element.height = '100%';
      element.frameBorder = '0';
      this.iframeBox.current.appendChild(element);
      element = null;
    }
  }
  render(): ?React.Element{
    const props: Object = this.props;

    if(props.src){
      return (
        <div className={ classNames(style.ad, props.className) }>
          <div ref={ this.iframeBox } className={ style.iframeBox } />
          <Tag className={ style.text }>广告</Tag>
        </div>
      );
    }else{
      return null;
    }
  }
}

export default Ad;