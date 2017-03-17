import React, {PropTypes}from 'react';
import {Button} from 'react-bootstrap';
import {Dialog} from '../UI';

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

    getInitialState(){
        return {
            image: this.props.image,
            isUploaded: this.props.isUploaded
        };
    },

    componentWillReceiveProps(newProps){
        this.setState({
            image: newProps.image,
            isUploaded: newProps.isUploaded
        });
    },

    onCancelEdit(){
        this.props.onCancel();
    },

    onSubmitEdit(){
        this.props.onSave(this.state.image);
    },

    handleFile(e) {
        const reader = new FileReader();
        const file = e.target.files[0];
        const {image} = this.state;
        const newImage = {
            userId: image.userId,
            file: file
        }
        reader.onload = (e) => {
          $('.user-image-modal').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        
        this.setState({image: newImage})
    },
    _renderModalBody(image) {
        return (
            <div className='modal-body'>
                <div className="upload-image">
                    <input type="file" className="input-file" name="userImg" onChange={this.handleFile} />
                    <img alert="user-image" className="user-image-modal" src={image.imageUrl} />
                </div>
            </div>
        )
    },

    render(){
        const {image} = this.state;
        return (
            <Dialog showImmediately={this.props.show}
                onClose={this.onCancelEdit}
                close={true}
                modal={true}
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true}
                dialogWindowClassName={this.props.dialogWindowClassName}
                >
                <Dialog.Header>
                    <div className='modal-header'>
                        <h4>Change your image</h4>
                    </div>
                </Dialog.Header>
                <Dialog.Content>
                    {this._renderModalBody(image)}
                </Dialog.Content>
                <Dialog.Footer>
                    <div className='modal-footer'>
                        <Button onClick={this.onCancelEdit}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.onSubmitEdit}>Upload</Button>
                    </div>
                </Dialog.Footer>
            </Dialog>
        );
    }

});

export default UserImageEditor;
