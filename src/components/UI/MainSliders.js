/* eslint-disable all, max-len*/

import React from 'react';
import PropTypes from 'prop-types';
import animations from '../../utils/animations';

export default class MainSliders extends React.Component {

  static propTypes = {
    show: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      dataCustomout: 'x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.75;scaleY:0.75;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;',
      dataImgCuromin: 'x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;',
      dataTextCustomin: 'x:0;y:0;z:0;rotationX:90;rotationY:0;rotationZ:0;scaleX:1;scaleY:1;skewX:0;skewY:0;opacity:0;transformPerspective:200;transformOrigin:50% 0%;',
      sliders: [
        '/styles/images/sliders/font-end.png',
        '/styles/images/sliders/reactjs.png',
        '/styles/images/sliders/great-frontend.png',
        '/styles/images/sliders/life.png',
      ]
    };
  }

  componentDidMount() {
    if (this.props.show) {
      animations.main_sliders(async (revol) => {
        await $('.tp-banner-container').removeClass('hidden');
        setTimeout(async () => {
          const slidesliHeight = await $('.tp-revslider-slidesli').height();
          $('.main-sliders').height(slidesliHeight);
          this.revol = revol;
        }, 1500);
      });
    }

    window.addEventListener('resize', () => {
      if (!$('.main-sliders').hasClass('loaded')) {
        $('.main-sliders').height('auto');
        $('.main-sliders').addClass('loaded');
      }
    });
  }

  componentWillUnmount() {
    // eslint-disable-next-line
    this.revol && this.revol.revkill(); // clear the animation
  }

  render() {
    const { dataCustomout, dataImgCuromin, dataTextCustomin } = this.state;
    const { show } = this.props;
    if (!show) return;

    return (
      <div className="main-sliders">
        <div className="tp-banner-container hidden">
          <div className="tp-banner">
            <div className="tp-bannertimer"></div>
            <ul>
              <li data-transition="fade" data-slotamount="7" data-masterspeed="700">
                <div
                  className="tp-caption customin customout"
                  data-x="80"
                  data-hoffset="100"
                  data-y="80"
                  data-voffset="0"
                  data-customin={dataImgCuromin}
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
                  data-y="80"
                  data-customin={dataTextCustomin}
                  data-customout={dataCustomout}
                  data-speed="1000"
                  data-start="500"
                  data-easing="Back.easeInOut"
                  data-endspeed="300">Sweeter Blog
                </div>
                <div
                  className="tp-caption medium_bold_white skewfromrightshort customin customout"
                  data-x="440"
                  data-y="160"
                  data-customin={dataTextCustomin}
                  data-customout={dataCustomout}
                  data-speed="3000"
                  data-start="1500"
                  data-easing="Back.easeOut"
                  data-endspeed="3000"
                  data-endeasing="Power4.easeIn"
                  data-captionhidden="on">Developer: Kenny
                </div>
              </li>
              <li data-transition="zoomout" data-slotamount="7" data-masterspeed="1500" className="main-sliders-li">
                <img src="/assets/revolution/images/darkblurbg.jpg" alt="" />
                <div
                  className="tp-caption customin"
                  data-x="495"
                  data-y="140"
                  data-customin={dataImgCuromin}
                  data-speed="500"
                  data-start="500"
                  data-easing="Power3.easeInOut"
                  data-endspeed="300">
                  <img src="/assets/revolution/images/nodejs_logo.png" alt="" data-ww="150px" data-hh="150px" />
                </div>
                <div
                  className="tp-caption customin"
                  data-x="745"
                  data-y="140"
                  data-customin={dataImgCuromin}
                  data-speed="500"
                  data-start="1300"
                  data-easing="Power3.easeInOut"
                  data-endspeed="300">
                  <img src="/assets/revolution/images/mongodb.png" alt="" data-ww="150px" data-hh="150px" />
                </div>
                <div
                  className="tp-caption customin"
                  data-x="185"
                  data-y="130"
                  data-customin={dataImgCuromin}
                  data-speed="500" data-start="1400" data-easing="Power3.easeInOut" data-endspeed="300">
                  <img src="/assets/revolution/images/react.png" alt="" data-ww="250px" data-hh="180px" />
                </div>
                <div
                  className="tp-caption large_bold_white customin customout"
                  data-x="428"
                  data-y="34"
                  data-customin={dataTextCustomin}
                  data-customout={dataCustomout}
                  data-speed="600"
                  data-start="1100"
                  data-easing="Back.easeOut"
                  data-endspeed="300"
                  data-endeasing="Power1.easeIn">Web
                </div>
                <div
                  className="tp-caption medium_bold_white customin customout"
                  data-x="580"
                  data-y="51"
                  data-customin={dataTextCustomin}
                  data-customout={dataCustomout}
                  data-speed="600"
                  data-start="1200"
                  data-easing="Back.easeOut"
                  data-endspeed="300"
                  data-endeasing="Power1.easeIn">Technologies
                </div>
                <div
                  className="tp-caption medium_light_white customin customout"
                  data-x="250"
                  data-y="300"
                  data-customin={dataTextCustomin}
                  data-customout={dataCustomout}
                  data-speed="600"
                  data-start="1200"
                  data-easing="Back.easeOut"
                  data-endspeed="300"
                  data-endeasing="Power1.easeIn">Reactjs
                </div>
                <div
                  className="tp-caption medium_light_white customin customout"
                  data-x="520"
                  data-y="300"
                  data-customin={dataTextCustomin}
                  data-customout={dataCustomout}
                  data-speed="600"
                  data-start="1200"
                  data-easing="Back.easeOut"
                  data-endspeed="300"
                  data-endeasing="Power1.easeIn">Node.js
                </div>
                <div
                  className="tp-caption medium_light_white customin customout"
                  data-x="760"
                  data-y="300"
                  data-customin={dataTextCustomin}
                  data-customout={dataCustomout}
                  data-speed="600"
                  data-start="1200"
                  data-easing="Back.easeOut"
                  data-endspeed="300"
                  data-endeasing="Power1.easeIn">MongoDB
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
