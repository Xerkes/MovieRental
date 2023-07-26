Ext.define('MovieRental.store.CustomerStore', {
    extend: 'Ext.data.Store',
    alias: 'store.customerstore',
    storeId: 'customerStore',

    model: 'MovieRental.model.CustomerModel',

    proxy: {
        type: 'rest',
        api: {
            create: 'https://localhost:44386/api/customer/create',
            read: 'https://localhost:44386/api/customer',
            update: 'https://localhost:44386/api/customer/edit',
            delete: 'https://localhost:44386/api/customer/delete',
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'PUT',
            delete: 'DELETE'
        }
    }
    
});