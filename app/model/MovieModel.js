Ext.define('MovieRental.model.MovieModel', {
    extend: 'Ext.data.Model',

    fields: [
        { id: 'MovieId', type: 'int' },
        { name: 'Title', type: 'string' },
        { name: 'Image', type: 'string' },
        { name: 'Genre', type: 'string' },
        { name: 'Director', type: 'string' },
        { name: 'Year', type: 'int'},
        { name: 'RentDays', type: 'int' },
        { name: 'RentPrice', type: 'float' }
    ]
});
