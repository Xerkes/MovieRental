Ext.application({
    extend: 'MovieRental.Application',

    name: 'MovieRental',

    stores: [
        'MovieRental.store.MovieStore',
        'MovieRental.store.RentedMoviesStore',
        'MovieRental.store.ReturnMoviesStore',
        'MovieRental.store.CustomerStore',
        'MovieRental.store.CurrentUserStore',
        'MovieRental.store.CartStore'
    ],

    requires: [
        'MovieRental.*'
    ],

    mainView: 'MovieRental.view.main.Main',
});
