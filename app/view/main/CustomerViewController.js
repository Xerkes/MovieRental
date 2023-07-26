Ext.define('MovieRental.view.main.CustomerViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customerviewcontroller',

    CustomerRender: function (view) {
        var customerStore = this.getViewModel().getStore('customerStore');
        var currentUserStore = this.getViewModel().getStore('currentUserStore');
        customerStore.load();
        currentUserStore.load();
    },
      
    
    Refresh: function() {
        var customerStore = this.getViewModel().getStore('customerStore');
        var currentUserStore = this.getViewModel().getStore('currentUserStore');
  
        customerStore.reload();
        currentUserStore.reload();
    },
    
    
    AddForm: function(){
        Ext.create('MovieRental.view.AddForm').show();
    },

    AddCustomer: function(button) {
        var view = this.getView();
        var form = view.down('form');
        var fields = form.getForm().getFields().items;
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (field.getFieldLabel && Ext.isEmpty(field.getValue())) {
                Ext.Msg.alert('Error', 'Please fill in all fields.');
                return;
            }
        }
        var customerData = form.getValues();
        var customerStore = this.getViewModel().getStore('customerStore');
        fetch(customerStore.getProxy().api.create, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        }).then(function(response) {
            console.log(response.status);
            if (response.status === 200) {
                Ext.Msg.alert('Success', 'Successfully Added Customer Details.');
                customerStore.reload();
                win.close();
            } else {
                Ext.Msg.alert('Failed', 'Failed to Add Customer Details.');
            }
        }).catch(function(error) {
            
        });
    },

    Edit: function(grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex);
        var editForm = Ext.create('MovieRental.view.EditForm', {
            viewModel: {
                data: {
                    customer: record.getData()
                }
            }
        });

        var form = editForm.down('form');
        form.loadRecord(record);
        editForm.show();
    },

    
    DeleteClick: function(grid, rowIndex, colIndex) {
        var customerStore = grid.getStore();
        var selectedCustomer = customerStore.getAt(rowIndex);
        var api = customerStore.getProxy().getApi();
      
        Ext.Msg.confirm('Confirm', 'Are you sure you want to delete this customer?', function(btn) {
          if (btn === 'yes') {
            fetch(api.delete + '/' + selectedCustomer.get('CustomerId'), {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(function(response) {
                if (response.status === 200) {
                  Ext.Msg.alert('Success', 'Customer details deleted successfully.');
                  customerStore.reload();
                } else {
                  throw new Error('Failed to delete customer details.');
                }
              })
              .catch(function(error) {
                Ext.Msg.alert('Error', error.message);
              });
          }
        });
    },

    
    Save: function(button) {
        var editForm = this.getView();
        var form = editForm.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        record.set(values);
        
        var customerStore = Ext.data.StoreManager.lookup('customerStore');
        fetch(customerStore.getProxy().api.update + '/' + record.get('CustomerId'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => {
            if (response.ok) {
                Ext.Msg.alert('Success', 'Customer details updated.');
                customerStore.reload();
                editForm.close();
            } else {
                Ext.Msg.alert('Error', 'Failed to update customer details.');
            }
        }).catch(error => {
            console.error('Error:', error);
            Ext.Msg.alert('Error', 'An error occurred while updating customer details.');
        });
    },

    Cancel: function() {
        var editForm = this.getView();
        editForm.close();
    },

    
    SignIn: function() {
        var view = this.getView();
        var selectedRecord = view.down('grid').getSelection()[0];
        var currentUserStore = Ext.data.StoreManager.lookup('currentUserStore');
      
        if (!selectedRecord) {
          Ext.Msg.alert('Error', 'Please select a customer to sign in.');
          return;
        }
      
        var customerData = selectedRecord.getData();
      
        var currentUserRecord = currentUserStore.getAt(0);
        if (currentUserRecord) {
          if (currentUserRecord.get('CustomerId') == customerData.CustomerId) {
            Ext.Msg.alert('Error', 'This customer is already signed in.');
            return;
          } else {
            fetch(currentUserStore.getProxy().api.delete + '/' + currentUserRecord.get('UserId'), {
              method: 'DELETE'
            })
              .then(function(response) {
                if (response.status === 200) {
                  addCurrentUser();
                } else {
                  throw new Error('Failed to delete current user');
                }
              })
              .catch(function(error) {
                Ext.Msg.alert('Error', error.message);
              });
          }
        } else {

          addCurrentUser();
        }
      
        function addCurrentUser() {
          fetch(currentUserStore.getProxy().api.create, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
          })
            .then(function(response) {
              if (response.status === 200) {
                var successMessage = 'Successfully signed in as ' + customerData.FirstName;
                Ext.Msg.alert('Success', successMessage);
                currentUserStore.reload();
                view.close();
              } else {
                throw new Error('Failed to sign in');
              }
            })
            .catch(function(error) {
              Ext.Msg.alert('Error', error.message);
            });
        }
      },
          
})