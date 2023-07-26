Ext.define('MovieRental.store.MovieStore', {
    extend: 'Ext.data.Store',
    alias: 'store.movieStore',

    requires: ['MovieRental.model.MovieModel'],

    model: 'MovieRental.model.MovieModel',


    proxy: {
        type: 'rest',
        url: 'https://localhost:44386/api/movie',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        },
        actionMethods: {
            read: 'GET'
        }
    }
});
