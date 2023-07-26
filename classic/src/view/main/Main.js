Ext.define('MovieRental.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'MovieRental.view.MovieList',
        'MovieRental.view.MovieDetails',
        'MovieRental.view.main.MovieViewModel',
        'MovieRental.store.MovieStore',
        'MovieRental.store.RentedMoviesStore',
        'MovieRental.store.ReturnMoviesStore',
        'MovieRental.view.CustomerDetails',
        'MovieRental.store.CurrentUserStore'
    ],

    viewModel: {
        type: 'movieviewmodel'
    },

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            text:'FLICKPIX',
            flex: 0,
        },
        style: {
            backgroundColor: '#E8175D',  
        },
        iconCls: 'fa-sharp fa-light fa-play'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        },
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'top'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        },
    },

    items: [{
        title: 'Movies',
        iconCls: 'fa-sharp fa-light fa-film',
        items: [{
            xtype: 'movielist',
            store: 'MovieRental.store.MovieStore'
        }]
    }, /*{
        title: 'Rented Movies',
        iconCls: 'fa-video',
        items: [{
          xtype: 'rentedmovies',
          store: 'MovieRental.store.RentedMoviesStore'
        }]
    }*/]
});
