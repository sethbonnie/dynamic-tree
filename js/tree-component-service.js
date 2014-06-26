app.factory('TreeComponent',
  ['TreeService',
function(TreeService) {
  var div = React.DOM.div;

  var Tree = React.createClass({
    getInitialState: function() {
      return {
        node: TreeService.getNode(this.props.id)
      }
    },

    handleMouseDown: function(e) {
      if (e.button === 0) {
        TreeService.addNode(this.props.id)
        this.setState({node: this.state.node})
      }
      else if (e.button === 1) {
        console.log(this.state.node.children)
      }
      else if (e.button === 2) {
        /** When we delete the root, immediately replace it with
            a new root. Essentially resetting the tree.
          **/
        if (this.state.node.id == 0) {
          this.setState({node: TreeService.new()})
        }
        else {
          /** Delete the node, but once we do, we want its parent
              to rerender. So we have to explicitly access the parent.
            **/
          var parent = TreeService.getNode(this.state.node.parent_id)
          TreeService.deleteNode(this.props.id)
          this._owner.setState({node: parent});
        }
      }
      e.preventDefault();
      /** Especially important to not bubble up **/
      e.stopPropagation();
    },

    ignoreContextMenu: function(e) {
      e.preventDefault()
      e.stopPropagation()
    },

    render: function() {
      var tree_type;

      if (TreeService.isRoot(this.props.id)) {
        console.log('rendering');
      }

      if (TreeService.isRoot(this.props.id)) {
        tree_type = 'root';
      }
      else if (TreeService.isOnlyChild(this.props.id)) {
        tree_type = 'only-child'
      }
      else if (TreeService.isFirstChild(this.props.id)) {
        tree_type = 'first-child'
      }
      else if (TreeService.isLastChild(this.props.id)) {
        tree_type = 'last-child'
      }
      else if (TreeService.isMiddleChild(this.props.id)){
        tree_type = 'middle-child'
      }

      var children = TreeService.getNode(this.props.id).children
        , child_nodes = []
        , id;

      for (var i = 0; i < children.length; i++) {
        id = children[i];
        child_nodes.push(Tree({id: id}));
      }

      return (
        div({ className: 'tree ' + tree_type,
              onMouseDown: this.handleMouseDown,
              onContextMenu: this.ignoreContextMenu
            },
          AncestryLink({}),
          div({className: 'node'}, this.props.id),
          OffspringLink({show: (children.length > 0)}),
          div({className: 'children'},
            child_nodes
          )
        )
      )
    }
  })

  var AncestryLink = React.createClass({
    render: function() {
      return (
        div({className: 'ancestry-link'},
          div({className: 'left-horizontal'}),
          div({className: 'right-horizontal'}),
          div({className: 'mid-vertical'}))
      )
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

  return Tree;
}]);