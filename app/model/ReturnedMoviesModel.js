Ext.define('MovieRental.model.ReturnedMoviesModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { id: 'ReturnId', type: 'number'},
        { id: 'CustomerId' , type: 'number'},
        { id: 'MovieId', type: 'number' },
        { name: 'Title', type: 'string' },
        { name: 'RentDays', type: 'int' },
        { name: 'RentPrice', type: 'float' },
        { name: 'RentDate', type: 'date'},
        { name: 'ReturnDate', type: 'date'},
    ]
});