Ext.define('MovieRental.store.CartStore', {
    extend: 'Ext.data.Store',
    alias: 'store.cartstore',
    storeId: 'cartStore',

    model: 'MovieRental.model.CartModel',

    proxy: {
        type: 'rest',
        api: {
            create: 'https://localhost:44386/api/cart/create',
            read: 'https://localhost:44386/api/cart',
            update: 'https://localhost:44386/api/cart/edit',
            delete: 'https://localhost:44386/api/cart/delete',
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