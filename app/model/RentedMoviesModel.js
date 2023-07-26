Ext.define('MovieRental.model.RentedMoviesModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { id: 'RentId' , type: 'number'},
        { id: 'CustomerId' , type: 'number'},
        { id: 'MovieId', type: 'number' },
        { name: 'FirstName', type: 'string'},
        { name: 'Title', type: 'string' },
        { name: 'RentDays', type: 'int' },
        { name: 'RentPrice', type: 'float' },
        { name: 'RentDate', type: 'date', dateFormat: 'Y-m-d H:i:s' },
    ]
});