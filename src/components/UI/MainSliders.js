import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { env } from '../../utils';

export default class MainSliders extends React.Component {

  static propTypes = {
    show: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      sliderSettings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // autoplaySpeed: 1000,
        fade: true,
        lazyLoad: true,
        arrows: false,
        adaptiveHeight: true
      },
      images: [
        '/images/sliders/reactjs.png',
        '/images/sliders/great-frontend.png',
        '/images/sliders/life.png'
      ]
    };
  }

  componentDidMount() {
    this.setState({ showSlider: true });
  }

  render() {
    const { show } = this.props;
    const { sliderSettings, images } = this.state;

    if (!show || env.is_server) return <div />;
    return (
      <div className="main-sliders mb-10">
        {this.state.showSlider &&
          <Slider {...sliderSettings}>
            {images.map((image, index) => <div key={index}><img alt={`slider-${index}`} src={image} /></div>)}
          </Slider>
        }
      </div>
    );
  }
}
