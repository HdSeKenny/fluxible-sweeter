import React, {PropTypes}from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import _ from 'lodash';
import {Button} from 'react-bootstrap';
import {Dialog} from '../UI';

const BlogEditor = React.createClass({

  displayName: 'BlogEditor',

  propTypes: {
    blog: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    isUpdated: PropTypes.bool,
    uniqueValidations: PropTypes.object,
    dialogWindowClassName: PropTypes.string
  },

  mixins: [FluxibleMixin],

  getInitialState(){
    const {title} = this.props.blog;
    const blogTitle = title.substring(3, title.length-3);
    return {
      blog: this.props.blog,
      blogTitle: blogTitle,
      blogContent: this.props.blog.content,
      isUpdated: this.props.isUpdated
    };
  },

  componentWillReceiveProps(newProps){
    this.setState({
      blog: newProps.blog,
      isUpdated: newProps.isUpdated
    });
  },

  onCancelEdit(){
      this.props.onCancel();
  },

  onSubmitEdit(){
      this.props.onSave({
          _id: this.state.blog._id,
          title: this.state.blogTitle,
          content: this.state.blogContent,
          created_at: new Date()
      });
  },

  handleUpdateTitle(e){
      this.setState({ blogTitle: e.target.value });
  },

  handleUpdateContent(e){
      this.setState({ blogContent: e.target.value });
  },

  _renderModalBody(blogTitle, blogContent) {
    return (
      <div className='modal-body'>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="row">
              <div className="col-xs-3">
                <select className="form-control">
                  <option>IT</option>
                  <option>Sport</option>
                  <option>Life</option>
                  <option>Story</option>
                </select>  
              </div>
              <div className="col-xs-9">
                <input type="text" ref="blogTitle" onChange={this.handleUpdateTitle} 
                  className="form-control" placeholder="Write title here.." 
                  value={blogTitle} autoFocus />
              </div>
            </div>
          </div>
          <div className="form-group">
            <textarea type="text" ref="blogContent" onChange={this.handleUpdateContent} 
              className="form-control" rows="20" placeholder="Write content here.." 
              value={blogContent} autoFocus />
          </div>
        </form>
      </div>
    )
  },

  render(){
    const {blogTitle, blogContent} = this.state;
    return (
      <Dialog 
        showImmediately={this.props.show}
        onClose={this.onCancelEdit}
        close={true}
        modal={true}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        dialogWindowClassName={this.props.dialogWindowClassName}
       >
      <Dialog.Header>
        <div className='modal-header'>
          <h3>Update this blog</h3>
        </div>
      </Dialog.Header>
      <Dialog.Content>
        {this._renderModalBody(blogTitle, blogContent)}
      </Dialog.Content>
      <Dialog.Footer>
        <div className='modal-footer'>
          <Button onClick={this.onCancelEdit}>Cancel</Button>
          <Button bsStyle="primary" onClick={this.onSubmitEdit}>Save</Button>
        </div>
      </Dialog.Footer>
      </Dialog>
    );
  }
});

export default BlogEditor;
