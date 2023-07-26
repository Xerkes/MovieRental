Ext.define('MovieRental.view.RentalDetail', {
    extend: 'Ext.window.Window',
    xtype: 'rentaldetail',
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
                html: 'RENTAL DETAIL',
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

    width: 800,
    height: 500,
    layout: 'fit',

    items: [{
        xtype: 'grid',
        bind: {
            store: '{rentedMoviesStore}'
        },
        columns: [
            {
                xtype: 'checkcolumn', 
                dataIndex: 'selectedrented',
                width: 50,
            },
            { text: 'Customer ID', dataIndex: 'CustomerId' },
            { text: 'First Name', dataIndex: 'FirstName' },
            { text: 'Title', dataIndex: 'Title', flex: 1 },
            { text: 'Rent Days', dataIndex: 'RentDays' },
            { text: 'Rent Price', dataIndex: 'RentPrice' },
            { 
                text: 'Date Rented', 
                dataIndex: 'FormattedRentDate', 
                flex: 1, 
                xtype: 'datecolumn',
                format: 'Y-m-d H:i:s'
            },
        ],
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                        xtype: 'button',
                        text: 'REFRESH',
                        iconCls: 'x-fa fa-sync',
                        margin: '0 10px 0 0',
                        handler: 'onRefreshClick'
                    },
                    '->',
                    {
                        xtype: 'button',
                        text: 'RETURN ITEMS',
                        handler: 'onReturnItems',
                    }
                ]
            }
        ]
    }],
});
