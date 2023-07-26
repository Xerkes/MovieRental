Ext.define('MovieRental.view.RentedMovies', {
    extend: 'Ext.panel.Panel',
    xtype: 'rentedmovies',
    viewModel: {
        type: 'movieviewmodel'
    },
    controller: 'rentviewcontroller',


    title: {
        xtype: 'container',
        layout: 'hbox',
        items: [
            {
                xtype: 'component',
                html: 'Rental Transactions',
                flex: 1,
                style: {
                    color: 'white',
                    fontSize: '30px',
                    fontWeight: 'bold',
                    padding: '10px'
                }
            },
            {
                xtype: 'button',
                text: 'REFRESH',
                iconCls: 'x-fa fa-sync',
                margin: '0 10px 0 0',
                handler: 'onRefreshClick'
            },
            {
                xtype: 'button',
                text: 'PROFILE',
                iconCls: 'x-fa fa-user',
                handler: 'onProfileClick'
            }
        ]
    },

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '15 0 0 0',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            bind: {
                                store: '{rentedMoviesStore}'
                            },
                            flex: 1,
                            height: 700,
                            title: 'MOVIES RENTED',
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
                                    items: [
                                        '->',
                                        {
                                            xtype: 'button',
                                            text: 'RETURN ITEMS',
                                            handler: 'onReturnItems',
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'container',
                    height: 100,
                    width: 20
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            height: 670,
                            bind: {
                                store: '{returnedMoviesStore}'
                            },
                            flex: 1,
                            title: 'MOVIES RETURNED',
                            columns: [
                                { text: 'Customer ID', dataIndex: 'CustomerId' },
                                { text: 'First Name', dataIndex: 'FirstName' },
                                { text: 'Title', dataIndex: 'Title', flex: 1 },
                                { text: 'Rent Days', dataIndex: 'RentDays' },
                                { text: 'Rent Price', dataIndex: 'RentPrice' },
                                { 
                                    text: 'Date Rented', 
                                    dataIndex: 'RentDate', 
                                    flex: 1, 
                                    xtype: 'datecolumn',
                                    format: 'Y-m-d H:i:s'
                                },
                                { 
                                    text: 'Date Returned', 
                                    dataIndex: 'FormattedReturnDate', 
                                    flex: 1, 
                                    xtype: 'datecolumn',
                                    format: 'Y-m-d H:i:s'
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                   
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onRentedMoviesRender',       
    }
});
