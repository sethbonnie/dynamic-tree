app.factory('Tree', function() {
  var tree = {}
    , next_id = 0;

  /** Keep the internal shape of the tree flat for faster access
      to the nodes, just keep references to parents and children
      inside each node.
    **/


  return {
    'new': function() {
      // reset the tree
      tree = {};
      next_id = 0;

      var root = tree[next_id] = {
        id: next_id,
        parent_id: null,
        children: []
      }
      return root;
    },

    addNode: function(parent_id) {
      var parent = tree[parent_id]
        , new_node;

      if (!parent) {
        return null;
      } 
      else {
        next_id++;
        new_node = tree[next_id] = {
          id: next_id,
          parent_id: parent.id,
          children: []
        }
        parent.children.push(next_id);

        return new_node;
      }
    },

    getNode: function(id) {
      var node = tree[id];

      if (!node) {
        return null;
      }
      else {
        return node;
      }
    },

    deleteNode: function(id) {
      var node = tree[id];

      if (!node) {
        return null;
      }
      else {
        /** Recursively delete the children. Which is tricky, since
            we effectively shorten the array so instead of incrementing
            or decrementing the index, we want the index to stay the same
            but adjust the array's length. This is one of those cases where
            you don't want to cache the array's length, but let it update.
          **/
        for (var i = 0; i < node.children.length;) {
          var child = node.children[i];
          this.deleteNode(child);
        }

        // remove the lad from the tree
        delete tree[id];

        // adjust parent references
        var index = tree[ node.parent_id ].children.indexOf(node.id);
        if (index > -1 && tree[ node.parent_id ])
          tree[ node.parent_id ].children.splice(index, 1);

        return node;
      }
    },

    isRoot: function(id) {
      var node = tree[id];

      if (node.parent_id === null) {
        return true;
      }
      else {
        return false;
      }
    },

    isOnlyChild: function(id) {
      var node = tree[id];
      if (!node) return null;

      var parent = tree[ node.parent_id ]
      if (!parent) return null;

      if (parent.children.length === 1) {
        return true;
      }
      else {
        return false;
      }
    },

    isFirstChild: function(id) {
      var node = tree[id];
      if (!node) return null;
      var parent = tree[ node.parent_id ]
      if (!parent) return null;

      if (parent.children.indexOf(id) === 0)
        return true;
      else
        return false;
    },

    isMiddleChild: function(id) {
      var node = tree[id];
      if (!node) return null;
      
      var parent = tree[ node.parent_id ]
      if (!parent) return null;

      if (parent.children.indexOf(id) === 0 ||
          parent.children.lastIndexOf(id) === parent.children.length-1)
        return false;
      else
        return true;
    },

    isLastChild: function(id) {
      var node = tree[id];
      if (!node) return null;
      
      var parent = tree[ node.parent_id ]
      if (!parent) return null;

      if (parent.children.lastIndexOf(id) === parent.children.length-1)
        return true;
      else
        return false;
    },

  }
});