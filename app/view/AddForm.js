Ext.define('MovieRental.view.AddForm',{
    extend: 'Ext.window.Window',
    title: 'Sign Up',
    modal: true,
    width: 400,
    height: 400,
    resizable: false,
    draggable: false,
    layout: 'fit',

    requires: ['MovieRental.store.CustomerStore'],

    controller: 'customerviewcontroller',  

    viewModel: {
        stores: {
            customerStore: {
                type: 'customerstore'
            }
        }
    },

    items: [{
        xtype: 'form',
        layout: 'form',
        bodyPadding: 10,
        defaultType: 'textfield',
        reference: 'form',
       
        items: [{
            fieldLabel: 'First Name',
            name: 'FirstName',
            inputType: 'string',   
        }, {
            fieldLabel: 'Last Name',
            name: 'LastName',
            inputType: 'string',

        }, {
            fieldLabel: 'Address',
            name: 'Address',
            inputType: 'string',
        },{
            xtype: 'datefield',
            fieldLabel: 'Birth Date',
            name: 'BirthDate',
            format: 'Y-m-d'
        },{
            fieldLabel: 'Email',
            name: 'Email',
            inputType: 'Email',
        }, {
            fieldLabel: 'Phone',
            name: 'Phone',
            inputType: 'number',            
        }]
    }],

    buttons: [{
        text: 'Sign Up',
        iconCls: 'x-fa fa-plus',
        handler: 'AddCustomer',
        style: {
            backgroundColor: 'blue'
        }        
    }] 
    
});