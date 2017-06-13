import React from 'react';
import PropTypes from 'prop-types';
import animations from '../../utils/animations';

export default class MainSliders extends React.Component {

  static propTypes = {
    show: PropTypes.bool
  };

  constructor(props) {
    super(props);
    const dataCustominMap = {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scaleX: 0.5,
      scaleY: 0.5,
      skewX: 0,
      skewY: 0,
      opacity: 0,
      transformPerspective: 0,
      transformOrigin: '50% 50%',
    };

    const dataCustomoutMap = {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scaleX: 0.75,
      scaleY: 0.75,
      skewX: 0,
      skewY: 0,
      opacity: 0,
      transformPerspective: 600,
      transformOrigin: '50% 50%',
    };

    this.state = {

      dataCustomout: 'x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.75;scaleY:0.75;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;',
      sliders: [
        '/styles/images/sliders/font-end.png',
        '/styles/images/sliders/reactjs.png',
        '/styles/images/sliders/great-frontend.png',
        '/styles/images/sliders/life.png',
      ]
    };
  }

  componentDidMount() {
    animations.main_sliders(() => {
      $('.tp-banner-container').removeClass('hidden');
    });
  }

  render() {
    const { sliders, dataCustomout } = this.state;


    return (
      <div className="main-sliders">
        <div className="tp-banner-container hidden">
          <div className="tp-banner">
            <div className="tp-bannertimer"></div>
            <ul>
              <li data-transition="fade" data-slotamount="7" data-masterspeed="700">
                <div
                  className="tp-caption customin customout"
                  data-x="50"
                  data-hoffset="100"
                  data-y="110"
                  data-voffset="0"
                  data-customin="x:50;y:150;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.5;scaleY:0.5;skewX:0;skewY:0;opacity:0;transformPerspective:0;transformOrigin:50% 50%;"
                  data-customout={dataCustomout}
                  data-speed="800"
                  data-start="700"
                  data-easing="Power4.easeOut"
                  data-endspeed="800"
                  data-endeasing="Power4.easeIn">
                  <img src="/assets/revolution/images/woman.png" alt="woman" data-ww="230px" data-hh="280px" data-no-retina />
                </div>
                <div
                  className="tp-caption large_bold_white customin customout start"
                  data-x="400"
                  data-hoffset="0"
                  data-y="100"
                  data-customin="x:0;y:0;z:0;rotationX:90;rotationY:0;rotationZ:0;scaleX:1;scaleY:1;skewX:0;skewY:0;opacity:0;transformPerspective:200;transformOrigin:50% 0%;"
                  data-customout={dataCustomout}
                  data-speed="1000"
                  data-start="500"
                  data-easing="Back.easeInOut"
                  data-endspeed="300">Sweeter Blog
                </div>
                <div
                  className="tp-caption medium_bold_white skewfromrightshort customin customout"
                  data-x="440"
                  data-y="180"
                  data-customin="x:50;y:150;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.5;scaleY:0.5;skewX:0;skewY:0;opacity:0;transformPerspective:0;transformOrigin:50% 50%;"
                  data-customout={dataCustomout}
                  data-speed="3000"
                  data-start="1500"
                  data-easing="Back.easeOut"
                  data-endspeed="3000"
                  data-endeasing="Power4.easeIn"
                  data-captionhidden="on">Developer: Kenny
                </div>
              </li>
              <li data-transition="fade" data-slotamount="7" data-masterspeed="1500">
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
