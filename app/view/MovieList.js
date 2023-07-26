Ext.define('MovieRental.view.MovieList', {
    extend: 'Ext.panel.Panel',
    xtype: 'movielist',

    requires: [
        'MovieRental.store.MovieStore',
        'MovieRental.view.MovieDetails',
        'MovieRental.store.CustomerStore',
        'MovieRental.view.CustomerDetails',
        'MovieRental.store.CurrentUserStore'
    ],

    viewModel:{
        type: 'movieviewmodel'
    },

    store: 'movieStore',

    controller: 'movieviewcontroller',   

    title: {
        xtype: 'container',
        layout: 'hbox',
        items: [
            {
                xtype: 'component',
                html: 'Movies',
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
                text: 'RENT HEADER',
                iconCls: 'x-fa fa-film',
                margin: '0 15px 0 0',
                height: 40,
                style: {
                    backgroundColor: '#333'
                },   
                handler: 'RentalHeaderShow'
            },
            {
                xtype: 'button',
                text: 'RENT DETAIL',
                iconCls: 'x-fa fa-film',
                margin: '0 15px 0 0',
                height: 40,
                style: {
                    backgroundColor: '#333'
                },   
                handler: 'RentDetailShow'
            },
            {
                xtype: 'button',
                text: 'RETURNED MOVIES',
                iconCls: 'x-fa fa-list',
                margin: '0 100px 0 0',
                height: 40,
                style: {
                    backgroundColor: '#333'
                },   
                handler: 'ReturnedMoviesShow'
            },
            {
                xtype: 'button',
                text: 'CART',
                iconCls: 'x-fa fa-shopping-cart',
                margin: '0 15px 0 0',
                height: 40,
                style: {
                    backgroundColor: '#333'
                },   
                handler: 'CartShow'
            },
            {
                xtype: 'button',
                text: 'PROFILE',
                iconCls: 'x-fa fa-user', 
                height: 40,
                style: {
                    backgroundColor: '#333'
                },  
                handler: 'ProfileShow' 
            }
        ]
    },

    items: [{
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype:'container',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            style: {
                backgroundColor: '#2A363B', 
                color: '#fff' 
            },
            items: [{
                xtype: 'dataview',
                bind: {
                    store: '{movieStore}'
                },
                itemSelector: 'div.movie',
                tpl: [
                    '<table>',
                    '<tpl for=".">',
                        '<tpl if="xindex % 6 == 1"><tr></tpl>',
                        '<td><div class="movie">',
                        '   <img src="{Image}" width="200" height="300">',
                        '   <div class="movieTitle">{Title}</div>',
                        '</div></td>',
                        '<tpl if="xindex % 6 == 0 || xindex == values.length"></tr></tpl>',
                    '</tpl>',
                    '</table>',
                    '<style>',
                    '   .movie {',
                    '       margin: 10px 0 0 100px;',
                    '       display: flex;',
                    '       flex-direction: column;',
                    '       justify-content: space-between;',
                    '   }',
                    '   .movie img {',
                    '       margin-bottom: 10px;',
                    '   }',
                    '   .movie div {',
                    '       font-weight: bold;',
                    '   }',
                    '   .movieTitle {',
                    '       font-size: 18px; ',
                    '       width: 200px;',
                    '   }',
                    '</style>'
                ],
                    listeners: {
                        itemclick: 'SelectMovie',
                    },
                    autoScroll: true,
                    layout: {
                        type: 'table',
                        columns: 6,
                        tdAttrs: {
                            style: 'padding: 10px;'
                        }
                    }              
                }]
        }]
    }],
    listeners: {
        afterrender: 'MovieListRender'
    }
});
