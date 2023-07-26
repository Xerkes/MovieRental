Ext.define('MovieRental.model.CartModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { id: 'UserId' , type: 'number'},
        { id: 'CustomerId' , type: 'number'},
        { id: 'MovieId', type: 'number' },
        { name: 'Title', type: 'string' },
        { name: 'RentDays', type: 'int' },
        { name: 'RentPrice', type: 'float' },
    ]
});