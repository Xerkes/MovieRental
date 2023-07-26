Ext.define('MovieRental.Application', {
    extend: 'Ext.app.Application',

    name: 'MovieRental',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
        'MovieRental.store.MovieStore',
        'MovieRental.store.RentedMoviesStore',
        'MovieRental.store.ReturnMoviesStore',
        'MovieRental.store.CustomerStore',
        'MovieRental.store.CurrentUserStore',
        'MovieRental.store.CartStore'
    ],


    launch: function() {

        Ext.ariaWarn = Ext.emptyFn;
        var currentUserStore = Ext.getStore('currentUserStore');

        currentUserStore.load({
        callback: function(records, operation, success) {
        if (success) {
          console.log('Current user loaded successfully:', records[0].data);
        } else {
          console.error('Failed to load current user:', operation.getError());
        }
      }
    });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
