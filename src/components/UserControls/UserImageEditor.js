/* eslint-disable all */
import React, { PropTypes, Component } from 'react';
// import { Row, Col } from '../UI/Layout';
import { SlimEditor, ModalsFactory } from '../UI';
import { sweetAlert, jsUtils } from '../../utils';
import { UserActions, BlogActions } from '../../actions';

export default class UserImageEditor extends Component {

  static displayName = 'UserImageEditor';

  static contextTypes = {
    executeAction: React.PropTypes.func
  };

  static propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.didLoad = this.didLoad.bind(null, this);
    this.didSave = this.didSave.bind(null, this);
    this.didUpload = this.didUpload.bind(null, this);
    this.didReceiveServerError = this.didReceiveServerError.bind(null, this);
    this.didRemove = this.didRemove.bind(null, this);
    this.didTransform = this.didTransform.bind(null, this);
    this.didConfirm = this.didConfirm.bind(null, this);
    this.didCancel = this.didCancel.bind(null, this);
    this.willTransform = this.willTransform.bind(null, this);
    this.willSave = this.willSave.bind(null, this);
    this.willRemove = this.willRemove.bind(null, this);
    this.willRequest = this.willRequest.bind(null, this);

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

  didLoad(self, data) {
    console.log('didLoad.....', data);
    return true;
  }

  didSave(self, data) {
    console.log('didSave...', data);
  }

  didUpload(self, err, data, res) {
    console.log('didUpload...', data, res);
  }

  didReceiveServerError(self, err, defaultError) {
    console.log('tesdidReceiveServerError...', defaultError);
    return defaultError;
  }

  didRemove(self, data) {
    console.log('didRemove...', data);
  }

  didTransform(self, data) {
  }

  didConfirm(self, data) {
    console.log('didConfirm...', data);
  }

  didCancel() {
    console.log('didCancel...');
  }

  willTransform(self, data, cb) {
    cb(data);
  }

  willSave(self, data, cb) {
    self.setState({ imageData: data, isUploadDisable: false });
    cb(data);
  }

  willRemove(self, data, cb) {
    console.log('willRemove...', data);

    cb();
  }

  willRequest(self, xhr) {
    console.log('xhr...', xhr);
  }

  onUploadImage() {
    const { imageData, currentUser } = this.state;
    if (!imageData) {
      sweetAlert.alertWarningMessage('Browser an image first !');
      return;
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
        _this.context.executeAction(UserActions.UploadImageSuccess, newUser);
        _this.context.executeAction(BlogActions.UploadImageSuccess, newUser);
      }
    });
  }


  render() {
    const { isUploadDisable } = this.state;

    return (
      <div className="image-editor">
        <SlimEditor
          ratio="1:1"
          download={true}
          didLoad={this.didLoad}
          // service={uploadImageApi}
          didUpload={this.didUpload}
          didReceiveServerError={this.didReceiveServerError}
          didRemove={this.didRemove}
          didTransform={this.didTransform}
          didCancel={this.didCancel}
          willTransform={this.willTransform}
          willSave={this.willSave}
          willRequest={this.willRequest}
          uploadBase64={false} >
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

