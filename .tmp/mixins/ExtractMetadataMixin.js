'use strict';

/**
 * ExtractMetadataMixin for extract all button
 */

module.exports = {
    onExtractMetadata: function () {
        let collections = [];
        var storeNames = ['DomainStore', 'OrgtypeStore', 'ScopeStore', 'ReportStore', 'DomainFieldStore', 'DomainTabStore', 'DomainMeasureStore', 'DomainHeaderStore', 'TableReferenceStore', 'FootnoteStore', 'RosterDomainHeaderStore', 'LiteralFieldStore', 'ISRDomainHeaderStore', 'ReportTemplateStore', 'UserRoleStore', 'AnalyzeDomainHeaderStore'];
        storeNames.forEach(item => {
            let storeObj = require('../stores/' + item);
            let store = this.getStore(storeObj);
            if (store.getIsUpdated()) {
                // only dump those updated store metadata
                collections.push({
                    name: store.getName(),
                    metadata: store.getMetadata(),
                    version: store.getVersion() + 1
                });
            }
        });
        this.refs.collections.value = JSON.stringify(collections);
    }
};
