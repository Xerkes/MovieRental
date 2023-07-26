Ext.define('MovieRental.view.main.CurrentUserViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.currentUserviewmodel',

    stores: {
        currentUserStore: {
            type: 'currentUserstore'
        },
        cartStore: {
            type: 'cartstore'
        }
    },
});
