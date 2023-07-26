Ext.define('MovieRental.view.main.MovieViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.movieviewcontroller',

  MovieListRender: function (view) {
      var movieStore = view.getViewModel().getStore('movieStore');
      var customerStore = this.getViewModel().getStore('customerStore');
      var currentUserStore = this.getViewModel().getStore('currentUserStore');
      movieStore.load();
      customerStore.load();
      currentUserStore.load();
  },
  SelectMovie: function(dataview, record) {
      var movieViewModel = this.getViewModel('movieviewmodel');
      var movieStore = movieViewModel.getStore('movieStore');
      var selectedMovie = movieStore.getById(record.getId());
      
      Ext.create('MovieRental.view.MovieDetails', {
          viewModel: {
              type: 'movieviewmodel',
              data: {
                  movie: selectedMovie.getData()
              }
          }
      }).show();
  },

  CartShow: function() {
    var viewModel = this.getViewModel();
    var cartStore = viewModel.get('cartStore');
    cartStore.load({
      callback: function(records, operation, success) {
        if (success) {
          cartStore.load({
            callback: function(records, operation, success) {
              if (success) {
                Ext.create('MovieRental.view.Cart', {
                  cartStore : cartStore
                }).show();
              } else {
                Ext.Msg.alert('Error', 'Failed to load cart.');
              }
            }
          });
        } else {
          Ext.Msg.alert('Error', 'Failed to load cart.');
        }
      }
    });
  },

  RentalHeaderShow: function(view) {
    var rentedMoviesStore = this.getViewModel().getStore('rentedMoviesStore');
    var currentUserStore = this.getViewModel().getStore('currentUserStore');

    Ext.Promise.all([
        currentUserStore.load(),
        rentedMoviesStore.load()
    ]).then(function() {
        Ext.create('MovieRental.view.RentalHeader', {
            viewModel: {
                data: {
                    rentedMoviesStore: rentedMoviesStore,
                    currentUserStore: currentUserStore
                }
            }
        }).show();
    }).catch(function() {
        Ext.Msg.alert('Error', 'Failed to load rental detail.');
    });
  },

  

  RentDetailShow: function(view) {
  var rentedMoviesStore = this.getViewModel().getStore('rentedMoviesStore');
  var currentUserStore = this.getViewModel().getStore('currentUserStore');
  currentUserStore.load();
  rentedMoviesStore.load({
    callback: function(records, operation, success) {
      if (success) {
        currentUserStore.load({
          callback: function(records, operation, success) {
            if (success) {
              Ext.create('MovieRental.view.RentalDetail', {
                rentedMoviesStore: rentedMoviesStore,
                currentUserStore: currentUserStore
              }).show();
            } else {
              Ext.Msg.alert('Error', 'Failed to load rental detail.');
            }
          }
        });
      } else {
        Ext.Msg.alert('Error', 'Failed to load rental detail.');
      }
    }
  });
  },

  ReturnedMoviesShow: function(view) {
    var returnedMoviesStore = this.getViewModel().getStore('returnedMoviesStore');
    var currentUserStore = this.getViewModel().getStore('currentUserStore');
    currentUserStore.load();
    returnedMoviesStore.load({
      callback: function(records, operation, success) {
        if (success) {
          currentUserStore.load({
            callback: function(records, operation, success) {
              if (success) {
                Ext.create('MovieRental.view.ReturnedMovies', {
                  returnedMoviesStore: returnedMoviesStore,
                  currentUserStore: currentUserStore
                }).show();
              } else {
                Ext.Msg.alert('Error', 'Failed to load rental detail.');
              }
            }
          });
        } else {
          Ext.Msg.alert('Error', 'Failed to load rental detail.');
        }
      }
    });
    },

  
  ProfileShow: function() {
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

  AddToCart: function() {
      var movieDetails = this.getView();
      var viewModel = movieDetails.getViewModel();
      var movie = viewModel.get('movie');
    
      var currentUserStore = Ext.data.StoreManager.lookup('currentUserStore');
      currentUserStore.on('load', function() {
        var currentUserRecord = currentUserStore.getAt(0);
    
        if (!currentUserRecord) {
          Ext.Msg.alert('Error', 'Please sign in before adding to cart.');
          return;
        }
    
        var cartStore = Ext.data.StoreManager.lookup('cartStore');
    
        cartStore.load({
          callback: function(records, operation, success) {
            cartStore.load();
            var existingCartItem = cartStore.findRecord('MovieId', movie.MovieId);
    
            if (existingCartItem) {
              Ext.Msg.alert('Error', 'This movie is already in the cart.');
              return;
            } else {
              var newCartItem = {
                CustomerId: currentUserRecord.get('CustomerId'),
                MovieId: movie.MovieId,
                Title: movie.Title,
                RentPrice: movie.RentPrice,
                RentDays: movie.RentDays,
              };
    
              fetch(cartStore.getProxy().api.create, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCartItem)
              })
                .then(function(response) {
                  if (response.status === 200) {
                    var successMessage = 'Successfully added ' + movie.Title + ' to the cart.';
                    Ext.Msg.alert('Success', successMessage);
                    cartStore.reload();
                  } else {
                    throw new Error('Failed to add the movie to the cart.');
                  }
                })
                .catch(function(error) {
                  Ext.Msg.alert('Failed', error.message);
                });
            }
          }
        });
      });
      currentUserStore.load();
    },

});
