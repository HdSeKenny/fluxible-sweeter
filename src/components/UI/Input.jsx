/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Input
 */

import React, {Component} from 'react';

/**
 * Input component that supports format validation, icons and error messages
 */

export default class Input extends Component {

  static propTypes = {
    icon: React.PropTypes.string,
    format: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    onFieldChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    classes: React.PropTypes.string,
    rounded: React.PropTypes.bool,
    valid: React.PropTypes.bool
  };

  static defaultProps = {
    rounded: false
  };

  constructor(props) {
    super(props);
    this.state = {
      valid: true
    };
  }

  handleChange(e) {
    // validate based on format
    this.validate(e);
    this.props.onFieldChange(e);
  }

  isValid() {
    return this.state.valid;
  }


  validate(e) {
    const val = e.currentTarget.value;
    if (this.props.required) {
      if (isEmpty(val)) {
        this.setState({ valid: false });
        return;
      }
      this.setState({ valid: this.validateFormat(this.props.format, val) });
    } else {
      this.setState({ valid: this.validateFormat(this.props.format, val) });
    }
  }

  validateLength(val, minLength, maxLength) {
    return true;
  }

  validateFormat(format, val) {
    switch (format) {
      case 'email' : return validations.isEmail('', val);
      default : return true;
    }
  }

  render() {
    const { icon, format, errorMessage, valid, rounded, classes } = this.props;
    const iconComponent = icon ? <i className={icon}></i> : null;
    const errorMsg = errorMessage || 'required';
    const error = valid ? null : <p className="help-block text-left">{errorMsg}</p>;

    return (
      <div className={`${classes}`}>
        <div className={`${icon ? 'iconic-input' : ''}`}>
          {iconComponent}
          <input
            type={format}
            autoComplete="off"
            className={`form-control ${rounded ? 'rounded' : ''}`}
            onChange={(e) => this.handleChange(e)} {...this.props}
          />
          {error}
        </div>
      </div>
    );
  }
}

// validations

var isExisty = function (value) {
  return value !== null && value !== undefined;
};

var isEmpty = function (value) {
  return value === '';
};

var validations = {
  isDefaultRequiredValue: function (values, value) {
    return value === undefined || value === '';
  },
  isExisty: function (values, value) {
    return isExisty(value);
  },
  matchRegexp: function (values, value, regexp) {
    return !isExisty(value) || isEmpty(value) || regexp.test(value);
  },
  isUndefined: function (values, value) {
    return value === undefined;
  },
  isEmptyString: function (values, value) {
    return isEmpty(value);
  },
  isEmail: function (values, value) {
    return validations.matchRegexp(values, value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
  },
  isUrl: function (values, value) {
    return validations.matchRegexp(values, value, /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
  },
  isTrue: function (values, value) {
    return value === true;
  },
  isFalse: function (values, value) {
    return value === false;
  },
  isNumeric: function (values, value) {
    if (typeof value === 'number') {
      return true;
    }
    return validations.matchRegexp(values, value, /^[-+]?(?:\d*[.])?\d+$/);
  },
  isAlpha: function (values, value) {
    return validations.matchRegexp(values, value, /^[A-Z]+$/i);
  },
  isAlphanumeric: function (values, value) {
    return validations.matchRegexp(values, value, /^[0-9A-Z]+$/i);
  },
  isInt: function (values, value) {
    return validations.matchRegexp(values, value, /^(?:[-+]?(?:0|[1-9]\d*))$/);
  },
  isFloat: function (values, value) {
    return validations.matchRegexp(values, value, /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][\+\-]?(?:\d+))?$/);
  },
  isWords: function (values, value) {
    return validations.matchRegexp(values, value, /^[A-Z\s]+$/i);
  },
  isSpecialWords: function (values, value) {
    return validations.matchRegexp(values, value, /^[A-Z\s\u00C0-\u017F]+$/i);
  },
  isLength: function (values, value, length) {
    return !isExisty(value) || isEmpty(value) || value.length === length;
  },
  equals: function (values, value, eql) {
    return !isExisty(value) || isEmpty(value) || value == eql;
  },
  equalsField: function (values, value, field) {
    return value == values[field];
  },
  maxLength: function (values, value, length) {
    return !isExisty(value) || value.length <= length;
  },
  minLength: function (values, value, length) {
    return !isExisty(value) || isEmpty(value) || value.length >= length;
  }
};
