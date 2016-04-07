/**
 * Created by Abhishek Dey on 24/8/15.
 */

    /*https://docs.angularjs.org/api/ng/type/$rootScope.Scope*/

foodMeApp.factory('customer', function($rootScope) {
    var parent = $rootScope;
    var child = parent.$new();

    parent.salutation = "Hello";
    expect(child.salutation).toEqual('Hello');

    child.salutation = "Welcome";
    expect(child.salutation).toEqual('Welcome');
    expect(parent.salutation).toEqual('Hello');
});