'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

exports.default = function (editorState, url) {
  var urlType = 'image';
  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', { src: url });
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  var newEditorState = _draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
  return _draftJs.EditorState.forceSelection(newEditorState, editorState.getCurrentContent().getSelectionAfter());
};