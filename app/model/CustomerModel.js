Ext.define('MovieRental.model.CustomerModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { id: 'CustomerId' , type: 'number'},
        { name: 'FirstName', type: 'string' },
        { name: 'LastName', type: 'string' },
        { name: 'Email', type: 'string' },
        { name: 'Phone', type: 'number' },
        { name: 'Birthdate', type: 'date' }
    ]
});