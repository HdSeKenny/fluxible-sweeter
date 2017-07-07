import React from 'react';
import PropTypes from 'prop-types';
import { SlimEditor, ModalsFactory } from '../UI';
import { jsUtils } from '../../utils';
import { swal } from '../../plugins';
import { UserActions, BlogActions } from '../../actions';

export default class UserImageEditor extends React.Component {

  static displayName = 'UserImageEditor';

  static contextTypes = {
    executeAction: PropTypes.func
  };

  static propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.willSave = this.willSave.bind(null, this);
    this.state = {
      currentUser: props.currentUser,
      imageData: null,
      isUploadDisable: true
    };
  }

  onCancelEdit() {
    ModalsFactory.hide('uploadModal');
  }

  onSubmitEdit() {
    this.props.onSave(this.state.image);
  }

  willSave(self, data, cb) {
    self.setState({ imageData: data, isUploadDisable: false });
    cb(data);
  }

  onUploadImage() {
    const { imageData, currentUser } = this.state;
    if (!imageData) {
      return swal.warning('Browser an image first !');
    }

    const { image, name } = imageData.output;
    const output = jsUtils.base64ToBlob(image, name);

    const formData = new FormData(); // eslint-disable-line
    formData.append('slim', output, name);

    const _this = this;

    $.ajax({
      url: `/api/upload/${currentUser.id_str}`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: (newUser) => {
        Promise.all([
          _this.context.executeAction(UserActions.UploadImageSuccess, newUser),
          _this.context.executeAction(BlogActions.UploadImageSuccess, newUser)
        ])
        .then(() => {
          // do nothing
        });
      }
    });
  }


  render() {
    const { isUploadDisable } = this.state;

    return (
      <div className="image-editor">
        <SlimEditor ratio="1:1" download={true} willSave={this.willSave} uploadBase64={false}>
          <input type="file" name="slim" />
        </SlimEditor>
        <div className="editor-btns">
          <button type="reset" className="btn btn-default" onClick={this.onCancelEdit}>Cancel</button>
          <button type="submit" className="btn btn-info" disabled={isUploadDisable} onClick={() => this.onUploadImage()}>Upload</button>
        </div>
      </div>
    );
  }
}

