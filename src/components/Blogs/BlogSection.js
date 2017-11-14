/* eslint-disable all, camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { routerShape } from "react-router";
import { Page } from '../UI/Layout';
import { PinItem, ModalsFactory } from '../UI';
import { PinItemModal } from '../UserControls';

export default class BlogSection extends React.Component {

  static displayName = 'BlogSection';

  static propTypes = {
    blogs: PropTypes.array,
    currentUser: PropTypes.object
  };

  static contextTypes = {
    router: routerShape.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPin: {},
      showPinModal: false
    };
  }

  onViewPinItem(blogs, id) {
    const selectedPin = blogs.find(p => p.id_str === id);
    this.setState({ selectedPin, showPinModal: true }, () => {
      ModalsFactory.show('pinModal');
    });

    $('#pinModal').on('hidden.bs.modal', () => {
      if (this.hidePinModal) {
        this.hidePinModal();
      }
    });
  }

  hidePinModal() {
    const homePage = $('.home-page');
    if (homePage && homePage.length) {
      this.setState({ selectedPin: {}, showPinModal: false });
    }
  }

  sortBlogs(blogs, type) {
    switch (type) {
      case 'date':
        return blogs.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      default:
        return blogs.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        );
        break;
    }
  }

  render() {
    const { selectedPin, showPinModal } = this.state;
    const { blogs, currentUser } = this.props;

    if (!blogs) return <section className="blog-section" />;

    const sortedBlogs = this.sortBlogs(blogs);
    const specialClass = '';
    return (
      <section className="blog-section">
        {sortedBlogs.map((pin, index) => {
          return (
            <PinItem
              key={index}
              onSelect={(id) => this.onViewPinItem(blogs, id)}
              pin={pin}
              type={pin.type}
              currentUser={currentUser}
              specialClass={specialClass}
              showImage={true}
              readMore={true}
            />
          );
        })}

        <Page>
          <ModalsFactory
            modalref="pinModal"
            pin={selectedPin}
            showModal={showPinModal}
            currentUser={currentUser}
            ModalComponent={PinItemModal}
            showHeaderAndFooter={false}
          />
        </Page>
      </section>
    );
  }
}
