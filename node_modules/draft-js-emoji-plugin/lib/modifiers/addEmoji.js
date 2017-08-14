'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mode = undefined;

var _draftJs = require('draft-js');

var _getSearchText2 = require('../utils/getSearchText');

var _getSearchText3 = _interopRequireDefault(_getSearchText2);

var _emojiList = require('../utils/emojiList');

var _emojiList2 = _interopRequireDefault(_emojiList);

var _convertShortNameToUnicode = require('../utils/convertShortNameToUnicode');

var _convertShortNameToUnicode2 = _interopRequireDefault(_convertShortNameToUnicode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This modifier can inserted emoji to current cursor position (with replace selected fragment),
// or replaced emoji shortname like ":thumbsup:". Behavior determined by `Mode` parameter.
var Mode = {
  INSERT: 'INSERT', // insert emoji to current cursor position
  REPLACE: 'REPLACE' };

var addEmoji = function addEmoji(editorState, emojiShortName) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Mode.INSERT;

  var unicode = _emojiList2.default.list[emojiShortName][0];
  var emoji = (0, _convertShortNameToUnicode2.default)(unicode);

  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity('emoji', 'IMMUTABLE', { emojiUnicode: emoji });
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  var currentSelectionState = editorState.getSelection();

  var emojiAddedContent = void 0;
  var emojiEndPos = 0;
  var blockSize = 0;

  switch (mode) {
    case Mode.INSERT:
      {
        // in case text is selected it is removed and then the emoji is added
        var afterRemovalContentState = _draftJs.Modifier.removeRange(contentState, currentSelectionState, 'backward');

        // deciding on the position to insert emoji
        var targetSelection = afterRemovalContentState.getSelectionAfter();

        emojiAddedContent = _draftJs.Modifier.insertText(afterRemovalContentState, targetSelection, emoji, null, entityKey);

        emojiEndPos = targetSelection.getAnchorOffset();
        var blockKey = targetSelection.getAnchorKey();
        blockSize = contentState.getBlockForKey(blockKey).getLength();

        break;
      }

    case Mode.REPLACE:
      {
        var _getSearchText = (0, _getSearchText3.default)(editorState, currentSelectionState),
            begin = _getSearchText.begin,
            end = _getSearchText.end;

        // Get the selection of the :emoji: search text


        var emojiTextSelection = currentSelectionState.merge({
          anchorOffset: begin,
          focusOffset: end
        });

        emojiAddedContent = _draftJs.Modifier.replaceText(contentState, emojiTextSelection, emoji, null, entityKey);

        emojiEndPos = end;
        var _blockKey = emojiTextSelection.getAnchorKey();
        blockSize = contentState.getBlockForKey(_blockKey).getLength();

        break;
      }

    default:
      throw new Error('Unidentified value of "mode"');
  }

  // If the emoji is inserted at the end, a space is appended right after for
  // a smooth writing experience.
  if (emojiEndPos === blockSize) {
    emojiAddedContent = _draftJs.Modifier.insertText(emojiAddedContent, emojiAddedContent.getSelectionAfter(), ' ');
  }

  var newEditorState = _draftJs.EditorState.push(editorState, emojiAddedContent, 'insert-emoji');
  return _draftJs.EditorState.forceSelection(newEditorState, emojiAddedContent.getSelectionAfter());
};

exports.default = addEmoji;
exports.Mode = Mode;