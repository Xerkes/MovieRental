Ext.define('MovieRental.view.EditForm', {
    extend: 'Ext.window.Window', 
    title: 'Edit Customer',

    controller: 'customerviewcontroller', 
    viewModel: {
        type: 'movieviewmodel'
    },

    layout: 'form',
    width: 500,
    height: 370,
    items: [{
        xtype: 'form',
        defaultType: 'textfield',
        store: 'customerstore',
        items: [{
            fieldLabel: 'First Name',
            name: 'FirstName',
         
        }, {
            fieldLabel: 'Last Name',
            name: 'LastName',
         
        }, {
            fieldLabel: 'Address',
            name: 'Address',
     
        }, {
            fieldLabel: 'Birthdate',
            name: 'Birthdate',
            xtype: 'datefield',
            format: 'Y-m-d',
       
        }, {
            fieldLabel: 'Email',
            name: 'Email',
            vtype: 'email',
   
        }, {
            fieldLabel: 'Phone',
            name: 'Phone',
    
        }]
    }],
    buttons: [{
        text: 'Save',
        handler: 'Save'
    }, {
        text: 'Cancel',
        handler: 'Cancel'
    }],

    listeners: {
        afterrender: 'CustomerRender'
    }
});
