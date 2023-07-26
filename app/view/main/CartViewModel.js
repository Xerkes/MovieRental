Ext.define('MovieRental.view.main.CartViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cartviewmodel',

    stores: {
        cartStore: {
            type: 'cartstore'
        },
        currentUserStore: {
          type: 'currentUserstore'
        },
        movieStore: {
          type: 'movieStore'
        },
        rentedMoviesStore: {
          type: 'rentedmoviesstore'
        }
    },
  }    
);
