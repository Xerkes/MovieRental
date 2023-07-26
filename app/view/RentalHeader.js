Ext.define('MovieRental.view.RentalHeader', {
    extend: 'Ext.window.Window',
    xtype: 'rentalheader',
    modal: true,

    title: {
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'center'
        },
        items: [
            {
                xtype: 'component',
                html: 'RENTAL HEADER',
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

    viewModel: {
        type: 'movieviewmodel'
    },
    controller: 'rentviewcontroller',

    width: 400,
    height: 400,
    layout: 'fit',

    items: [{
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        style: {
            backgroundColor: '#2A363B', 
            color: '#fff' 
        },
        items: [{
            xtype:'container',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'fit'
            },
            height: 200,
            items: [{
                xtype: 'dataview',
                bind: {
                    store: '{rentedMoviesStore}'
                },
                itemSelector: 'div.Header',
                tpl: [
                    '<tpl for=".">',
                        '<div class="Header">',
                        '   <div>CustomerId: {CustomerId}</div>',
                        '   <div>First Name: {FirstName}</div>',
                        '   <div>Rent Date: {FormattedRentDate}</div>',
                        '</div>',
                    '</tpl>',
                    '<style>',
                    '   .Header {',
                    '       margin: 10px 10px 10px 10px;',
                    '       padding: 10px;',
                    '       color: white;',
                    '       font-size: 18px;',
                    '       border: 1px solid #ccc;',
                    '   }',
                    '</style>'
                ],
                listeners: {
                    itemclick: 'SelectRentalDetail',
                },
                autoScroll: true,
                layout: 'fit'
            }]            
        }]
    }],
    listeners: {
        afterrender: 'onRentedMoviesRender'
    }
});
