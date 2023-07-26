Ext.define('MovieRental.store.RentedMoviesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.rentedmoviesstore',
    storeId: 'rentedmoviesStore',

    model: 'MovieRental.model.RentedMoviesModel',

    proxy: {
        type: 'rest',
        api: {
            create: 'https://localhost:44386/api/rent/create',
            read: 'https://localhost:44386/api/rent',
            update: 'https://localhost:44386/api/rent/edit',
            delete: 'https://localhost:44386/api/rent/delete',
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