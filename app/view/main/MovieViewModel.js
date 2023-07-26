Ext.define('MovieRental.view.main.MovieViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.movieviewmodel',

    stores: {
        movieStore: {
            type: 'movieStore'
        },
        cartStore: {
            type: 'cartstore'
        },
        customerStore: {
            type: 'customerstore'
        },
        currentUserStore: {
            type: 'currentUserstore'
        },
        rentedMoviesStore: {
            type: 'rentedmoviesstore'
        },
        returnedMoviesStore: {
            type: 'returnmoviesstore'
        },
        cartStore: {
          type: 'cartstore'
      },
    },
});
