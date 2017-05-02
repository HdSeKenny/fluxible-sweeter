'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as Fields from '../components/UserControls/CollectionFields';

/**
 * fieldsUtil that supports:
 * 1) fieldsMapping: general mapping of one field
 * 2) specialFieldsMapping: custom mapping of special field
 * 3) isUniqueValue: unique validation of common cases
 *
 * unique validation example:
 * isUniqueValue(['firstname', 'lastname'], ['god', 'me'], 'xiaoming', metadata, 'birthday') means:
 * 1) using birthday as identifier
 * 2) record.birthday === xiaoming is the expected logic
 */
var fieldsMapping = {
    'string': Fields.StringField,
    'integer': Fields.IntegerField,
    'array': Fields.ArrayField,
    'boolean': Fields.BooleanField,
    'object': Fields.ObjectField,
    'record': Fields.ObjectField,
    'order': Fields.IntegerField,
    'checkBoxField': Fields.CheckBoxField,
    'dropdownField': Fields.DropdownField,
    'radioButtonField': Fields.RadioButtonField
};

var specialFieldsMapping = {
    'Domains.reports': Fields.ReportField,
    'Reports.selectable_orgtypes': Fields.OrgtypeField,
    'Reports.basic_selections': Fields.BasicSelectionField,
    'Reports.report_type': Fields.RadioButtonField,
    'Reports.scl': Fields.ScopeCombinationListField,
    'Reports.csc': Fields.CSCListField,
    'Reports.linked_reports': Fields.LinkedReportField,
    'Scopes.dbvalues': Fields.DbvaluesField, // Scopes and DomainFields share same field
    'DomainFields.dbvalues': Fields.DbvaluesFieldForDomainField,
    'DomainFields.domain_value': Fields.DomainValueField, // DomainFields, DomainMeasures and DomainTabs share same field
    'DomainFields.ru': Fields.RuField, // DomainFields, DomainMeasures and DomainTabs share same field
    'DomainFields.uv': Fields.UvField,
    'DomainFields.bv': Fields.UvField,
    'DomainTabs.domain_value': Fields.DomainValueField,
    'DomainTabs.tabType': Fields.RadioButtonField,
    'DomainFields.scl': Fields.ScopeCombinationListField,
    'DomainFields.csc': Fields.CSCListField, // chronological scope combination
    'DomainTabs.groups': Fields.DomainTabGroupsField,
    'DomainTabs.report_selectors': Fields.ReportSelectorsField,
    'DomainMeasures.domain_value': Fields.DomainValueField, // DomainFields, DomainMeasures and DomainTabs share same field
    'DomainMeasures.mask_criteria': Fields.MaskCriteria,
    'DomainMeasures.recode_criteria': Fields.RecodeCriteria,
    'DomainMeasures.valid_criteria': Fields.ValidCriteria,
    'DomainMeasures.measures': Fields.Measures,
    'DomainMeasures.summary': Fields.SummaryField,
    'DomainHeaders.domain_value': Fields.DomainValueField,
    'DomainHeaders.header': Fields.HeaderField,
    'AnalyzeDomainHeaders.domain_value': Fields.DomainValueField,
    'AnalyzeDomainHeaders.header': Fields.AnalyzeDomainHeaderField,
    'TableReferences.domain': Fields.DomainValueField,
    'Footnotes.domain_value': Fields.DomainValueField,
    'Footnotes.csc': Fields.CSCListField,
    'Footnotes.scl': Fields.ScopeCombinationListField,
    'RosterDomainHeaders.domain_value': Fields.DomainValueField,
    'RosterDomainHeaders.header': Fields.RosterDomainHeaderField,
    'ISRDomainHeaders.domain_value': Fields.DomainValueField,
    'ISRDomainHeaders.header': Fields.ISRDomainHeaderField,
    'LiteralFields.domain_value': Fields.DomainValueField,
    'LiteralFields.scl': Fields.ScopeCombinationListField,
    'LiteralFields.csc': Fields.CSCListField,
    'ReportTemplates.domain_value': Fields.ReportTemplateDomainValueField,
    'ReportTemplates.report_value': Fields.ReportValueField,
    'ReportTemplates.table': Fields.TableField,
    'ReportTemplates.report_types': Fields.ReportTypeField,
    'UserRoles.permissions': Fields.PermissionField
};

var fieldsUtil = {
    getFieldType: function (schemaProps, fieldname) {
        let fieldType;
        for (var key in schemaProps) {
            if (key === fieldname) {
                if (schemaProps[key].type === 'object') {
                    let isCheckBox = true;
                    _lodash2.default.forOwn(schemaProps[key].properties, (val, k) => {
                        if (val.type !== 'boolean') {
                            isCheckBox = false;
                        }
                    }); // use checkBoxField only when all properties are boolean values
                    fieldType = isCheckBox ? 'checkBoxField' : 'object';
                } else if (schemaProps[key].type === 'string') {
                    fieldType = schemaProps[key].enum ? 'dropdownField' : schemaProps[key].type;
                } else {
                    fieldType = schemaProps[key].type;
                }
                break;
            }
        }
        return fieldType;
    },
    getFieldComponent: function (schema, fieldname) {
        var fieldID = schema.title + '.' + fieldname;
        if (this.isSpecialField(fieldID)) {
            return specialFieldsMapping[fieldID];
        } else {
            var filedType = this.getFieldType(schema.properties, fieldname);
            return fieldsMapping[filedType];
        }
    },
    isSpecialField: function (fieldname) {
        return !!specialFieldsMapping[fieldname];
    },
    setFieldsValue4NewRecord: function (record, schema, metadata, version) {
        let schemaFields = schema.properties;
        for (var key in schemaFields) {
            if (!record.hasOwnProperty(key)) {
                if (key === '_id') {
                    let data = _lodash2.default.cloneDeep(metadata);
                    data = data.sort((item1, item2) => {
                        return item1._id.value - item2._id.value;
                    });
                    let idValue = 1;
                    if (data.length > 0) {
                        idValue = data[data.length - 1]._id.value + 1;
                    }
                    record[key] = { version: version, value: idValue };
                } else if (key === 'display_order' || key === 'hierarchy_order') {
                    let data = _lodash2.default.cloneDeep(metadata);
                    data = _lodash2.default.sortBy(data, key);
                    if (data.length > 0) {
                        record[key] = data[data.length - 1][key] + 1;
                    } else record[key] = 1;
                } else {
                    record[key] = schemaFields[key].default;
                }
            }
        } // for
    },
    isOrderNotChange: function (data) {
        return data.every((item, index) => {
            if (index >= 1) {
                if (item < data[index - 1]) {
                    return false;
                } else {
                    return true;
                }
            }
            return true;
        });
    },
    isArrayUpdated: function (currentMetadata, initMetadata, loop) {
        var a = _immutable2.default.fromJS(currentMetadata);
        var b = _immutable2.default.fromJS(initMetadata);
        return !_immutable2.default.is(a, b);
    },


    /* ================================== begin of fields validation ================================== */
    /**
    * supports unique validation for multiple fields as a whole, since fields is an array.
    * single field unique validation when fields has one item only; and multiple fields unique validation when fields has more than 1 one item
    * the first object of fields is the field that needs to be validated, same case for the first object of values
    *
    * {fields} array - the fields array, such as ['firstname', 'lastname']
    * {values} string - the values needs to be validated
    * {recordId} string - the id(firstname) of the value or current editing fieldId
    * {metadata} array - the array that contains all data to compare with
    * {identifier} string - default is _id; INDEX means using array index
    *
    * example1: default identifier _id
    * isUniqueValue(['firstname', 'lastname'], ['god', 'me'], '102', metadata) means:
    * 1) the user wish to validate firstname, and it's current value is god me
    * 2) firstname + lastname should be unique as a whole
    * 3) 102 is the recordId: record._id
    * 4) metadata is the collection of all records
    *
    * example2: array index as identifier
    * isUniqueValue(['firstname', 'lastname'], ['god', 'me'], 3, metadata, 'INDEX') means:
    * 1) using array INDEX as identifier
    * 2) 3 is the array index: array[i] === 3
    *
    * example3: custom identifier 'birthday'
    * isUniqueValue(['firstname', 'lastname'], ['god', 'me'], 'xiaoming', metadata, 'birthday') means:
    * 1) using birthday as identifier
    * 2) record.birthday === xiaoming is the expected logic
    *
    */
    isUniqueValue: function (fields, values, recordId, metadata, identifier) {
        if (!fields || !values || fields.length !== values.length) {
            return true; // default is true
        }

        let isValid = true;
        let concatedValue = '-' + values.join('-');
        for (let i = 0; i < metadata.length; i++) {
            let record = metadata[i];
            let currentValue = this.getConcatedFieldValue(fields, record);
            // recordId could be -3, -1, 0, and they are valid, so we need isNumber like logic
            if (recordId || _lodash2.default.isNumber(recordId)) {
                // for existing record, skip the record with same _id
                let id = record[identifier || '_id'];
                if (identifier && identifier === 'INDEX' && i !== recordId || // index
                (id || _lodash2.default.isNumber(id)) && id !== recordId) {
                    // common identifier, or by default using _id
                    if (currentValue === concatedValue) {
                        isValid = false;
                    }
                }
            } else if (currentValue === concatedValue) {
                // for new record
                isValid = false;
            }

            if (!isValid) {
                break;
            }
        }
        return isValid;
    },


    /**
    * used for top level component that has metadata and schemaEditor
    */
    isUniqueValueInRefs: function (that, fields, value, recordId) {
        // use value for the first field when it is valid
        let refs = that.refs;
        let childRefs = refs && refs.schemaEditor ? refs.schemaEditor.refs : {};
        return this.isUniqueValue(fields, this.getValuesFromRef(childRefs, fields, value), recordId, that.state.metadata);
    },


    /**
    * used for common component that has values and refs
    */
    isUniqueValueInRefsComponent: function (that, fields, value, recordId, identifier) {
        // use value for the first field when it is valid
        let childRefs = that.refs || {};
        return this.isUniqueValue(fields, this.getValuesFromRef(childRefs, fields, value), recordId, that.state.value, identifier);
    },
    getValuesFromRef: function (refs, fields, value) {
        // use value for the first field when it is valid
        let values = fields.map(item => {
            return refs[item] ? refs[item].getValue() : '';
        });
        if (value) {
            values[0] = value; // state.value has not been changed when onChange event fires, so we have to use the value passed back
        }
        return values;
    },


    /**
    * used for top level component that has metadata and schemaEditor
    */
    clearAllUnique: function (that, prop, recordId) {
        // calling all unique functions again in getUniqueValidations to make sure all related props are cleared
        let obj = that.getUniqueValidations();
        for (let p in obj) {
            if (p !== prop) {
                let item = that.refs.schemaEditor.refs[p];
                item && item.setState(obj[p](item.getValue(), recordId));
            }
        }
    },


    /**
    * used for common component that has values and refs
    */
    clearAllUniqueComponent: function (that, prop, recordId) {
        // calling all unique functions again in getUniqueValidations to make sure all related props are cleared
        let obj = that.getUniqueValidations();
        for (let p in obj) {
            if (p !== prop) {
                let item = that.refs[p];
                item && item.setState(obj[p](item.getValue(), recordId));
            }
        }
    },
    getConcatedFieldValue: function (fields, record) {
        let result = '';
        fields.forEach(field => {
            let value = record[field];
            result += '-' + (value === undefined || value === null ? '' : value);
        });
        return result;
    }
    /* ================================== end of fields validation ================================== */

};

exports.default = fieldsUtil;
module.exports = exports['default'];
