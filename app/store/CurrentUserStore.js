Ext.define('MovieRental.store.CurrentUserStore', {
    extend: 'Ext.data.Store',
    alias: 'store.currentUserstore',
    storeId: 'currentUserStore',

    model: 'MovieRental.model.CurrentUserModel',

    proxy: {
        type: 'rest',
        api: {
            create: 'https://localhost:44386/api/customer/signin/create',
            read: 'https://localhost:44386/api/customer/signin/',
            update: 'https://localhost:44386/api/customer/signin/edit',
            delete: 'https://localhost:44386/api/customer/signin/delete',
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