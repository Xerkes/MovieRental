Ext.define('MovieRental.view.MovieDetails', {
    extend: 'Ext.window.Window',
    reference: 'moviedetails',
    title: 'Movie Details',
    modal: true,
    width: 800,
    height: 500,
    layout: 'fit',
    deferredRender: false,

    viewModel: {
        type: 'movieviewmodel'
    },

    stores: [
        'MovieRental.store.CurrentUserStore',
        'MovieRental.store.CartStore'
    ],

    controller: 'movieviewcontroller',

    items: [{
        xtype: 'container',
        padding: '20 20 20 20',
        width: 500,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        style: {
            backgroundColor: '#FBEEE6', 
        },
        items: [{
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'image',
                height: 400,
                width: 250,
                margin: '0 20 0 0',
                bind: {
                    src: '{movie.Image}'
                }
            },{
                xtype: 'container',
                flex: 1,
                margin: '10 0 0 0',
                padding: '0 0px 5px 5px',
                items: [{
                    xtype: 'displayfield',
                    bind: {
                        value: '<h1 style="margin: 0;"> {movie.Title} ({movie.Year}) </h1>   <br>'
                    },
                    style: {
                        height: '40px',
                        lineHeight: '40px',
                    },
                    padding: '0 10px 90px 0'
                },{
                    xtype: 'displayfield',
                    bind: {
                        value: '<b>Genre:</b> {movie.Genre} <br>'
                    },
                },{
                    xtype: 'displayfield',
                    bind: {
                        value: '<b>Director:</b> {movie.Director} <br>'
                    },
                },{
                    xtype: 'displayfield',
                    bind: {
                        value: '<b>Rent Days:</b> {movie.RentDays} days <br>'
                    },
                },
                {
                    xtype: 'displayfield',
                    bind: {
                        value: '<b>Rent Price: </b> ${movie.RentPrice} <br>'
                    },
                },
                {
                    xtype: 'button',
                    text: 'ADD TO CART',
                    viewModel: {
                        type: 'currentUserviewmodel',
                    },
                    dock: 'bottom',
                    width: 180,
                    alignSelf: 'left',
                    iconCls: 'x-fa fa-shopping-cart',
                    style: {
                        borderRadius: '20px',
                        backgroundColor: '#1CA73C',
                        color: 'white',
                        fontSize: '50px'
                    },
                    handler: 'AddToCart'
                }]
            }]
        }]
    }]
});
