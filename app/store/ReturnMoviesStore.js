Ext.define('MovieRental.store.ReturnMoviesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.returnmoviesstore',
    storeId: 'returnmoviesStore',

    model: 'MovieRental.model.ReturnedMoviesModel',

    proxy: {
        type: 'rest',
        api: {
            create: 'https://localhost:44386/api/return/create',
            read: 'https://localhost:44386/api/return',
            update: 'https://localhost:44386/api/return/edit',
            delete: 'https://localhost:44386/api/return/delete',
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