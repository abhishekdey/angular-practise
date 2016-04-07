(function(angular) {
  'use strict';
function HeroDetailController() {
  var ctrl = this;

  ctrl.update = function(prop, value) {
    ctrl.onUpdate({hero: ctrl.hero, prop: prop, value: value});
  };
}

angular.module('heroApp').component('heroDetail', {
  templateUrl: 'heroDetail.html',
  controller: HeroDetailController,
  bindings: {
    hero: '<',//< symbol denotes one-way bindings
    onDelete: '&', //Outputs are realized with & bindings, which function as callbacks to component events.
    onUpdate: '&'
  }
});
})(window.angular);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/