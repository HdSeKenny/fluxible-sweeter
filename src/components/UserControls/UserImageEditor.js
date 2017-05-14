/* eslint-disable all */
import React, { PropTypes, Component } from 'react';
import { Row, Col } from '../UI/Layout';
import { SlimEditor } from '../UI';

export default class UserImageEditor extends Component {

  static displayName = 'UserImageEditor';

  static propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    };
  }

  componentDidMount() {

  }

  onCancelEdit() {
    this.props.onCancel();
  }

  didLoad(data) {
    console.log('didLoad.....', data);
    return true;
  }

  onSubmitEdit() {
    this.props.onSave(this.state.image);
  }

  didSave(data) {
    console.log('didSave...', data);
  }

  didUpload(err, data, res) {
    console.log('didUpload...', data, res);
  }

  didReceiveServerError(err, defaultError) {
    console.log('tesdidReceiveServerError...', defaultError);
    return defaultError;
  }

  didRemove(data) {
    console.log('didRemove...', data);
  }

  didTransform(data) {

    console.log('didTransform...', data);
  }

  didConfirm(data) {
    console.log('didConfirm...', data);
  }

  didCancel() {
    console.log('didCancel...');
  }

  willTransform(data, cb) {
    console.log('willTransform...', data);

    cb(data);
  }
  willSave(data, cb) {
    console.log('willSave...', data);
    cb(data);
  }

  willRemove(data, cb) {
    console.log('willRemove...', data);

    cb();
  }

  willRequest(xhr) {
    console.log('xhr...', xhr);

  }

  onUpload() {
    console.log(this);
  }


  render() {
    const { currentUser } = this.state;
    const uploadImageApi = `/api/upload/${currentUser.id_str}`;
    return (

      <div className="image-editor">
        <SlimEditor
          ratio="1:1"
          download={true}
          didLoad={this.didLoad}
          service={uploadImageApi}
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
          <button type="reset" className="btn  btn-default" onClick={this.onCancelEdit}>Cancel</button>
          <button type="submit" className="btn btn-info" onClick={this.onUpload}>Upload</button>
        </div>
      </div>
    );
  }
}


        // <Row className="upload-image">
        //   <Col size="7 p-0 dashed">
        //     <input type="file" className="input-file" name="userImg" onChange={this.handleFile} />
        //     <img alt="user" className="user-image-modal" src={currentUser.image_url} />
        //   </Col>
        //   <Col size="5 p-0">
        //   </Col>
        // </Row>
        // action={uploadImageApi} method="post" encType="multipart/form-data"
        //   handleFile(e) {
        // eslint-disable-next-line
        //   const reader = new FileReader();
        //   const { currentUser } = this.state;
        //   const newImage = {
        //     userId: currentUser.id_str,
        //     file: e.target.files[0]
        //   };

        //   reader.readAsDataURL(e.target.files[0]);

        //   reader.onload = (event) => {
        //     this.setState({ loadedUrl: event.target.result });
        //     $('.user-image-modal').attr('src', event.target.result);
        //   };

        //   this.setState({ image: newImage });
        // }

