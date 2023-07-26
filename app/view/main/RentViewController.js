Ext.define('MovieRental.view.main.RentViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rentviewcontroller',

    onRentedMoviesRender: function (view) {
        var rentedMoviesStore = view.getViewModel().getStore('rentedMoviesStore');
        var returnedMoviesStore = view.getViewModel().getStore('returnedMoviesStore');
        var currentUserStore = this.getViewModel().getStore('currentUserStore');
        rentedMoviesStore.load();
        returnedMoviesStore.load();
        currentUserStore.load();
    },

    onReturnItems: function() {
        var view = this.getView();
        var grid = view.down('grid');
        var rentedMoviesStore = this.getViewModel().getStore('rentedMoviesStore');
        var selectedMovies = [];
  
        rentedMoviesStore.each(function(record) {
            if (record.get('selectedrented')) {
              selectedMovies.push(record);
            }
          });
        
          if (selectedMovies.length === 0) {
            Ext.Msg.alert('Error', 'No movies selected.');
            return;
          }
  
        var returnedMoviesStore = this.getViewModel().getStore('returnedMoviesStore');
  
        var currentUserStore = this.getViewModel().getStore('currentUserStore');
        var currentUserRecord = currentUserStore.getAt(0);
        
        var rentRecord = rentedMoviesStore.getAt(0);
  
        selectedMovies.forEach(function(movie) {
            var returnMovie = {
              CustomerId: currentUserRecord.data.CustomerId,
              MovieId: movie.data.MovieId,
              FirstName: currentUserRecord.data.FirstName,
              LastName: currentUserRecord.data.LastName,
              Title: movie.data.Title,
              RentDays: movie.data.RentDays,
              RentPrice: movie.data.RentPrice,
              RentDate: rentRecord.data.FormattedRentDate,
              ReturnDate: new Date().toISOString()
            };
            
            fetch(returnedMoviesStore.getProxy().api.create, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(returnMovie)
              })
              .then(function(response) {
                if (response.status === 200) {
                  console.log('Movie returned:', returnMovie.Title);
                  grid.getStore().remove(movie);
                  fetch(rentedMoviesStore.getProxy().api.delete + '/' + movie.data.MovieId, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                  .then(function(response) {
                    if (response.status === 200) {
                      console.log('Movie successfully removed from cart:', returnMovie.Title);
                    } else {
                      throw new Error('Failed to remove movie from cart:', returnMovie.Title);
                    }
                  })
                  .catch(function(error) {
                   
                  });
                } else {
                  throw new Error('Failed to return the movie:', returnMovie.Title);
                }
              })
              .catch(function(error) {
                console.error('Failed to return the movie:', returnMovie.Title, error);
              });
      });
      Ext.Msg.alert('Success', 'Movies returned.');
    },
  
    
    onRefreshClick: function() {
        var rentedMoviesStore = this.getViewModel().getStore('rentedMoviesStore');
        var returnedMoviesStore = this.getViewModel().getStore('returnedMoviesStore');
        var currentUserStore = this.getViewModel().getStore('currentUserStore');

        currentUserStore.reload();
        rentedMoviesStore.reload();
        returnedMoviesStore.reload();

        Ext.toast('Stores refreshed successfully.', 'Success');
    },

    onProfileClick: function() {
      var customerStore = this.getViewModel().getStore('customerStore');
      var currentUserStore = this.getViewModel().getStore('currentUserStore');
      customerStore.load({
        callback: function(records, operation, success) {
          if (success) {
            currentUserStore.load({
              callback: function(records, operation, success) {
                if (success) {
                  Ext.create('MovieRental.view.CustomerDetails', {
                    customerStore: customerStore,
                    currentUserStore: currentUserStore
                  }).show();
                } else {
                  Ext.Msg.alert('Error', 'Failed to load current user data.');
                }
              }
            });
          } else {
            Ext.Msg.alert('Error', 'Failed to load customer data.');
          }
        }
      });
    },  

    SelectRentalDetail: function(dataview, record) {
      var rentalHeaderViewModel = this.getViewModel('movieviewmodel');
      var rentedMoviesStore = rentalHeaderViewModel.getStore('rentedMoviesStore');
      var selectedCustomerId = record.get('CustomerId');
      
      rentedMoviesStore.filterBy(function(record) {
        return record.get('CustomerId') === selectedCustomerId;
      });
    
      var rentalDetailWindow = Ext.create('MovieRental.view.RentalDetail', {
        viewModel: {
          type: 'movieviewmodel',
          data: {
            rentedMoviesStore: rentedMoviesStore
          }
        }
      });
      rentalDetailWindow.show();
      rentalDetailWindow.toFront();
    }
});