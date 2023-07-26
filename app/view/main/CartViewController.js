Ext.define('MovieRental.view.main.CartViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cartviewcontroller',

    CartRender: function (view) {
        var cartStore = this.getViewModel().getStore('cartStore');
        var currentUserStore = this.getViewModel().getStore('currentUserStore');
        cartStore.load();
        currentUserStore.load();
    },
      
    BuyNow: function() {
        var view = this.getView();
        var grid = view.down('grid');
        var cartStore = this.getViewModel().getStore('cartStore');
        var selectedMovies = [];
      
        cartStore.each(function(record) {
          if (record.get('selected')) {
            selectedMovies.push(record);
          }
        });
      
        if (selectedMovies.length === 0) {
          Ext.Msg.alert('Error', 'No movies selected.');
          return;
        }
      
        var rentedMoviesStore = Ext.getStore('rentedmoviesStore');
        var currentUserStore = Ext.getStore('currentUserStore');
        var currentUserRecord = currentUserStore.getAt(0);
        
        selectedMovies.forEach(function(movie) {
          var rentedMovie = {
            CustomerId: currentUserRecord.data.CustomerId,
            MovieId: movie.data.MovieId,
            FirstName: currentUserRecord.data.FirstName,
            Title: movie.data.Title,
            RentDays: movie.data.RentDays,
            RentPrice: movie.data.RentPrice,
            RentDate: new Date().toISOString()
          };
      
          fetch(rentedMoviesStore.getProxy().api.create, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(rentedMovie)
          })
          .then(function(response) {
            if (response.status === 200) {
              console.log('Movie successfully purchased:', rentedMovie.Title);
              grid.getStore().remove(movie);
              fetch(cartStore.getProxy().api.delete + '/' + movie.data.MovieId, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(function(response) {
                if (response.status === 200) {
                  console.log('Movie successfully removed from cart:', rentedMovie.Title);
                } else {
                  throw new Error('Failed to remove movie from cart:', rentedMovie.Title);
                }
              })
              .catch(function(error) {
               
              });
            } else {
              throw new Error('Failed to purchase movie:', rentedMovie.Title);
            }
          })
          .catch(function(error) {
            console.error('Failed to purchase movie:', rentedMovie.Title, error);
          });
        });
      
        Ext.Msg.alert('Success', 'Movies successfully purchased.');
      },

    DeleteCart: function() {
        var view = this.getView();
        var grid = view.down('grid');
        var cartStore = grid.getStore();
        var selectedMovies = [];
      
        cartStore.each(function(record) {
          if (record.get('selected')) {
            selectedMovies.push(record);
          }
        });
      
        if (selectedMovies.length === 0) {
          Ext.Msg.alert('Error', 'No movies selected.');
          return;
        }
      
        selectedMovies.forEach(function(movie) {
          cartStore.remove(movie);
      
          fetch(cartStore.getProxy().api.delete + '/' + movie.get('MovieId'), {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(function(response) {
            if (response.status === 200) {
              console.log('Movie successfully removed from cart:', movie.get('Title'));
            } else {
              throw new Error('Failed to remove movie from cart:', movie.get('Title'));
            }
          })
          .catch(function(error) {
            console.error('Error removing movie from cart:', error);
          });
        });
      },
});