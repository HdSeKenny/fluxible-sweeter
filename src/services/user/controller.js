import md5 from 'md5';

export default {
  setDefaultUserParams(body) {
    body.password = md5(body.password);
    body.image_url = '/images/users/default-user.svg';
    body.background_image_url = '/images/users/user-center-bg.jpg';
    body.lq_background_url = '/images/lqip/users/user-center-bg.jpg';
    body.fans = [];
    body.focuses = [];
    body.blogs = [];
    body.gender = "unknow";
    body.signature = "This guy has no signature...";
    body.role = "user";
    body.focuses_list = {
      no_groups: [],
      friends: [],
      special_focuses: []
    };
    body.fans_list = {
      no_groups: []
    };

    body.recent_chat_connections = [];

    return body;
  },

  filterUserParams() {

  }
};
