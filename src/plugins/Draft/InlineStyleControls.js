import React from 'react';
import PropTypes from 'prop-types';
import DraftStyleButton from './DraftStyleButton';

export default class InlineStyleControls extends React.Component {
  static propTypes = {
    editorState: PropTypes.object,
    onToggle: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      INLINE_STYLES: [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' },
        { label: 'Monospace', style: 'CODE' }
      ]
    };
  }

  render() {
    const { INLINE_STYLES } = this.state;
    const { editorState, onToggle } = this.props;
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map(type =>
          <DraftStyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  }
}