app.factory('TreeComponent',
  ['TreeService',
function(TreeService) {
  var div = React.DOM.div;

  var Tree = React.createClass({
    render: function() {
      var node = TreeService.getNode(this.props.id)
        , type;

      // figure out
      if (TreeService.isRoot(node.id)) {
        type = '';
      }
      else if (TreeService.isOnlyChild(node.id)) {
        type = 'only-child'
      }
      else if (TreeService.isFirstChild(node.id)) {
        type = 'first-child'
      }
      else if (TreeService.isLastChild(node.id)) {
        type = 'last-child'
      }
      else {
        type = 'middle-child'
      }

      return (
        div({className: 'tree'},
          AncestryLink({show: TreeService.isRoot(node.id)}),
          div({className: 'body'}, node.id.toString()),
          OffspringLink({show: (node.children.length > 0)}),
          Children({children: node.children})
        )
      )
    }
  })

  var AncestryLink = React.createClass({
    render: function() {
      if (this.props.show == true) {
        return (
          div({className: 'ancestry-link'})
        )
      }
      else {
        return (
          div({className: 'ancestry-link hide'})
        )
      }
    }
  })

  var OffspringLink = React.createClass({
    render: function() {
      if (this.props.show == true) {
        return (
          div({className: 'offspring-link show'})
        )
      }
      else {
        return (
          div({className: 'offspring-link hide'})
        )
      }
    }
  })

  var Children = React.createClass({
    render: function() {
      var children = []
        , id
        , i;

      for (i = 0; i < this.props.children.length; i++) {
        id = this.props.children[i];
        children.push(Tree({id: id}));
      }

      return (
        div({className: 'children'},
          children)
      )
    }
  })

  return Tree;
}]);