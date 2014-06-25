app.directive('tree', 
  ['TreeComponent', 
function(TreeComponent) {
  var linker = function(scope, elem, attrs) {
    var root = attrs.root;

    React.renderComponent(TreeComponent({id: root}), elem[0])
  };

  return {
    restrict: 'EA',
    scope: true,
    link: linker
  }
}])