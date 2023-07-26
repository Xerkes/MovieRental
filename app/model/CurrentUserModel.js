Ext.define('MovieRental.model.CurrentUserModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { id: 'UserId' , type: 'number'},
        { id: 'CustomerId' , type: 'number'},
        { name: 'FirstName', type: 'string' },
        { name: 'LastName', type: 'string' },
        { name: 'Email', type: 'string' },
        { name: 'Phone', type: 'number' },
        { name: 'Birthdate', type: 'date' }
    ]
});