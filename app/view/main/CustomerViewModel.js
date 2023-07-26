Ext.define('MovieRental.view.main.CustomerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.customerviewmodel',

    stores: {
        customerStore: {
            type: 'customerstore'
        }
    }
});
