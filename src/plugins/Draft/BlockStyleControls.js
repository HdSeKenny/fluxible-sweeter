import React from 'react';
import PropTypes from 'prop-types';
import DraftStyleButton from './DraftStyleButton';

export default class BlockStyleControls extends React.Component {

  static propTypes = {
    editorState: PropTypes.object,
    onToggle: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      BLOCK_TYPES: [
        { label: 'H1', style: 'header-one' },
        { label: 'H2', style: 'header-two' },
        { label: 'H3', style: 'header-three' },
        { label: 'H4', style: 'header-four' },
        { label: 'H5', style: 'header-five' },
        { label: 'H6', style: 'header-six' },
        { label: 'Blockquote', style: 'blockquote' },
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
        { label: 'Code Block', style: 'code-block' }
      ]
    };
  }

  render() {
    const { BLOCK_TYPES } = this.state;
    const { editorState, onToggle } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <DraftStyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  }
}
