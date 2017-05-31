import React from 'react';
import PropTypes from 'prop-types';
// import jQuery from 'jquery';

export default class MainSliders extends React.Component {

  static propTypes = {
    show: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      sliders: [
        '/styles/images/sliders/font-end.png',
        '/styles/images/sliders/reactjs.png',
        '/styles/images/sliders/great-frontend.png',
        '/styles/images/sliders/life.png',
      ]
    };
  }

  componentDidMount() {
    jQuery(document).ready(() => {
      jQuery('.tp-banner').show().revolution({
        dottedOverlay: 'none',
        delay: 3000,
        startwidth: 1270,
        startheight: 650,
        hideThumbs: 200,
        thumbWidth: 100,
        thumbHeight: 50,
        thumbAmount: 5,

        navigationType: 'off',
        navigationArrows: 'solo',
        navigationStyle: 'preview4',

        touchenabled: 'on',
        onHoverStop: 'on',

        swipe_velocity: 0.7,
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        drag_block_vertical: false,

        parallax: 'mouse',
        parallaxBgFreeze: 'on',
        parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

        keyboardNavigation: 'off',

        navigationHAlign: 'center',
        navigationVAlign: 'bottom',
        navigationHOffset: 0,
        navigationVOffset: 20,

        soloArrowLeftHalign: 'left',
        soloArrowLeftValign: 'center',
        soloArrowLeftHOffset: 20,
        soloArrowLeftVOffset: 0,

        soloArrowRightHalign: 'right',
        soloArrowRightValign: 'center',
        soloArrowRightHOffset: 20,
        soloArrowRightVOffset: 0,

        shadow: 0,
        fullWidth: 'off',
        fullScreen: 'on',

        spinner: 'spinner4',

        stopLoop: 'off',
        stopAfterLoops: -1,
        stopAtSlide: -1,

        shuffle: 'off',

        autoHeight: 'off',
        forceFullWidth: 'off',
        hideThumbsOnMobile: 'off',
        hideNavDelayOnMobile: 1500,
        hideBulletsOnMobile: 'off',
        hideArrowsOnMobile: 'off',
        hideThumbsUnderResolution: 0,

        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        startWithSlide: 0,
        fullScreenOffsetContainer: '.header'
      });
    });
  }

  render() {
    const { show } = this.props;
    const { sliders } = this.state;

    if (!show) { return null; }

    return (

          <div className="tp-banner-container">
            <div className="tp-banner">
              <ul>
                {sliders.map((slider, index) => {
                  return (
                    <li
                      data-transition="random-static"
                      data-slotamount="2"
                      data-masterspeed="2000"
                      data-thumb={slider}
                      data-saveperformance="on"
                      data-title="..."
                      className="rav-1" key={index}>
                      <img
                        src={slider}
                        alt={`slider-${index}`}
                        data-bgposition="center top"
                        data-bgfit="normal"
                        data-bgrepeat="no-repeat" />
                    </li>
                  );
                })}
              </ul>
              <div className="tp-bannertimer tp-bottom"></div>
            </div>
          </div>

    );
  }
}
