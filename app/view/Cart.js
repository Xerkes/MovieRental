Ext.define('MovieRental.view.Cart', {
    extend: 'Ext.window.Window',

    requires: [
        'MovieRental.store.CartStore',
        'MovieRental.view.main.CartViewController' 
    ],
    viewModel: 'movieviewmodel',
    controller: 'cartviewcontroller',
 
    title: {
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'center'
        },
        items: [
            {
                xtype: 'component',
                html: 'CART',
                flex: 1,
                style: {
                    color: 'white',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    padding: '10px',
                    textAlign: 'center'
                }
            }]
        },
    layout: 'fit',
    modal: true,
    width: 600,
    height: 400,

    items: [{
        xtype: 'grid',
        bind: {
            store: '{cartStore}'
        },
        columns: [{
            xtype: 'checkcolumn', 
            dataIndex: 'selected',
            width: 50,
        },{
            text: 'Movie Title',
            dataIndex: 'Title',
            flex: 1
        }, {
            text: 'Rent Days',
            dataIndex: 'RentDays'
        }, {
            text: 'Rent Price',
            dataIndex: 'RentPrice'
        }],
        bbar: [{
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text: 'DELETE',
            handler: 'DeleteCart'
        }, {
            xtype: 'button',
            text: 'BUY',
            handler: 'BuyNow'
        }],
        listeners: {
            viewready: function(grid) {
                grid.getStore().load();
            }
        }
    }],
    listeners: {
        afterrender: 'CartRender'
    }    
});
