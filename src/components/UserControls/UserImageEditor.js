/* eslint-disable all */
import React, { PropTypes } from 'react';

const UserImageEditor = React.createClass({

  displayName: 'UserImageEditor',

  propTypes: {
    image: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    isUploaded: PropTypes.bool,
    uniqueValidations: PropTypes.object,
    dialogWindowClassName: PropTypes.string
  },

  getInitialState() {
    return {
      image: this.props.image,
      isUploaded: this.props.isUploaded
    };
  },

  componentWillReceiveProps(newProps) {
    this.setState({
      image: newProps.image,
      isUploaded: newProps.isUploaded
    });
  },

  onCancelEdit() {
    this.props.onCancel();
  },

  onSubmitEdit() {
    this.props.onSave(this.state.image);
  },

  handleFile(e) {
    // eslint-disable-next-line
    const reader = new FileReader();
    const file = e.target.files[0];
    const { image } = this.state;
    const newImage = {
      userId: image.userId,
      file
    };

    reader.onload = () => {
      $('.user-image-modal').attr('src', e.target.result);
    };
    reader.readAsDataURL(file);

    this.setState({ image: newImage });
  },

  render() {
    const { image } = this.state;
    return (
      <div className="image-editor">
        <div className="upload-image">
          <input type="file" className="input-file" name="userImg" onChange={this.handleFile} />
          <img alt="user" className="user-image-modal" src={image.imageUrl} />
        </div>
        <div className="image-editor-btn">
          <button onClick={this.onCancelEdit}>Cancel</button>
          <button bsStyle="primary" onClick={this.onSubmitEdit}>Upload</button>
        </div>
      </div>
    );
  }
});

export default UserImageEditor;


      // <Dialog showImmediately={this.props.show}
      //     onClose={this.onCancelEdit}
      //     close={true}
      //     modal={true}
      //     autoDetectWindowHeight={true}
      //     autoScrollBodyContent={true}
      //     dialogWindowClassName={this.props.dialogWindowClassName}
      //     >
      //     <Dialog.Header>
      //         <div className='modal-header'>
      //             <h4>Change your image</h4>
      //         </div>
      //     </Dialog.Header>
      //     <Dialog.Content>
      //         {this._renderModalBody(image)}
      //     </Dialog.Content>
      //     <Dialog.Footer>
      //         <div className='modal-footer'>
      //             <Button onClick={this.onCancelEdit}>Cancel</Button>
      //             <Button bsStyle="primary" onClick={this.onSubmitEdit}>Upload</Button>
      //         </div>
      //     </Dialog.Footer>
      // </Dialog>
