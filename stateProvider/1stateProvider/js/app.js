angular.module("modalApp", ['ui.router']).config(function($stateProvider){
  $stateProvider.state("Base", {});

  $stateProvider.state("Modal", {
    views:{
      "modal": {
        templateUrl: "modal.html"
      }
    },
    onEnter: function($state){
      // Hitting the ESC key closes the modal
      $(document).on('keyup', function(e){
        if(e.keyCode == 27){
          $(document).off('keyup')
          $state.go('Base')
        }
      });

      // Clicking outside of the modal closes it
      $(document).on('click', '.Modal-backdrop, .Modal-holder', function() {
        $state.go('Base');
      });

      // Clicking on the modal or it's contents doesn't cause it to close
      $(document).on('click', '.Modal-box, .Modal-box *', function(e) {
        e.stopPropagation();
      });
    },
    abstract: true
  });

  $stateProvider.state("Modal.confirmAddToCart", {
    views:{
      "modal": {
        templateUrl: "modals/confirm.html"
      }
    }
  });

  $stateProvider.state("Modal.success", {
    views:{
      "modal": {
        templateUrl: "modals/success.html"
      }
    }
  });
})
