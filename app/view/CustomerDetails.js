Ext.define('MovieRental.view.CustomerDetails', {
    extend: 'Ext.window.Window',
  
    title: {
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'center'
        },
        items: [
            {
                xtype: 'component',
                html: 'CUSTOMER DETAILS',
                flex: 1,
                style: {
                    color: 'white',
                    fontSize: '30px',
                    fontWeight: 'bold',
                    padding: '10px',
                    textAlign: 'center'
                }
            }]
        },

    modal: true,
    width: 900,
    height: 400,
    draggable: false,
    resizable: false,
    layout: 'fit',
    controller: 'customerviewcontroller',
    viewModel: {
        type: 'movieviewmodel'
    },
    
    items: [{
        xtype: 'grid',
        bind: {
            store: '{customerStore}'
        },
        
        columns: [{
            text: 'First Name',
            dataIndex: 'FirstName',
            width: 100,
        }, {
            text: 'Last Name',
            dataIndex: 'LastName',
            width: 100,
        }, {
            text: 'Address',
            dataIndex: 'Address',
            flex: 1
        }, {
            text: 'Birth Date',
            dataIndex: 'Birthdate',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        }, {
            text: 'Email',
            dataIndex: 'Email',
            flex: 1
        }, {
            text: 'Phone',
            dataIndex: 'Phone',
            width: 100,
        }, {
            xtype: 'actioncolumn',
            width: 50,
            items: [{
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit',
                handler: 'Edit'
            }, {
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete',
                handler: 'DeleteClick'
            }]
        }],
    }],

    bbar: [{
        xtype: 'button',
        text: 'ADD USER',
        iconCls: 'x-fa fa-plus',
        width: 110,
        height: 50,
        handler: 'AddForm'
    }, {
        xtype: 'button',
        text: 'SIGN IN',
        iconCls: 'x-fa fa-user',
        width: 100,
        height: 50,
        handler: 'SignIn'
    }, '->', {
        xtype: 'button',
        text: 'REFRESH',
        iconCls: 'x-fa fa-sync',
        width: 100,
        height: 50,
        handler: 'Refresh'
    }],

    listeners: {
        afterrender: 'CustomerRender'
    }
});
