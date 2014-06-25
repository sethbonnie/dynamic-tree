describe('Test Service', function() {
  var Tree;

  beforeEach(module('dynamic-tree'))

  beforeEach(inject(function($injector) {
    Tree = $injector.get('TreeService');
  }))

  describe('.new()', function() {
    it('returns a reference to a new root node', function() {
      var root = Tree.new()

      expect(root.id).toBeDefined();
      expect(root.parent_id).toBeNull();
      expect(root.children).toBeDefined();
    })

    it('removes all other existing nodes from the tree')
  })

  describe('.addNode(parent_id)', function() {

    it('returns a reference to the newly added node', function() {
      var root = Tree.new()
        , new_node = Tree.addNode(root.id);

      expect(root.children).toEqual([1]);
      expect(new_node.id).toBe(1);
    })

    it('returned node should have a reference to parent id', function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id)     // gen 1
        , node2 = Tree.addNode(root.id)     // gen 1
        , node3 = Tree.addNode(node1.id);   // gen 2

      expect(node1.parent_id).toBe(root.id);
      expect(node2.parent_id).toBe(root.id);
      expect(node3.parent_id).toBe(node1.id);
    })

    it('returns null when parent node does not exist', function() {
      var new_node = Tree.addNode(6);

      expect(new_node).toBeNull();
    })
  })

  describe('.getNode(id)', function() {
    it('returns a reference to the node if <id> exists', function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id);

      expect(Tree.getNode(node1.id)).toBe(node1);
    })

    it('returns null when node does not exist', function() {
      var root = Tree.new();

      expect(Tree.getNode(33)).toBeNull();
    })
  })

  describe('.deleteNode(id)', function() {
    it("returns null if <id> doesn't exist", function() {
      expect(Tree.deleteNode(8)).toBeNull();
    })

    it('returns and removes the specified node from the tree', function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id)

        , return_value = Tree.deleteNode(node1.id);

      expect(return_value).toEqual(node1);
      expect(Tree.getNode(node1.id)).toBeNull();
    })

    it("removes the specified node's children from the tree", function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id)     // gen 1
        , node2 = Tree.addNode(root.id)     // gen 1
        , node3 = Tree.addNode(node1.id)    // gen 2
        , node4 = Tree.addNode(node3.id)    // gen 3
        , node5 = Tree.addNode(node3.id);   // gen 3

      expect(Tree.getNode(node1.id)).not.toBeNull();
      expect(Tree.getNode(node2.id)).not.toBeNull();
      expect(Tree.getNode(node3.id)).not.toBeNull();
      expect(Tree.getNode(node4.id)).not.toBeNull();
      expect(Tree.getNode(node5.id)).not.toBeNull();

      Tree.deleteNode(node1.id)

      expect(Tree.getNode(node1.id)).toBeNull();
      expect(Tree.getNode(node2.id)).not.toBeNull();
      expect(Tree.getNode(node3.id)).toBeNull();
      expect(Tree.getNode(node4.id)).toBeNull();
      expect(Tree.getNode(node5.id)).toBeNull();
    })

    it("parent's children count is adjusted accordingly", function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id)
        , node2 = Tree.addNode(root.id);

      expect(root.children.length).toBe(2);
      Tree.deleteNode(node2.id);
      expect(root.children.length).toBe(1);
    })
  })

  describe('.isRoot(id)', function() {
    it('returns true for the root node', function() {
      var root = Tree.new()

      expect(Tree.isRoot(root.id)).toBe(true);
    })

    it('returns false for nodes other than the root', function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id)     // gen 1
        , node2 = Tree.addNode(root.id)     // gen 1
        , node3 = Tree.addNode(node1.id);    // gen 2

      expect(Tree.isRoot(node1.id)).toBe(false);
      expect(Tree.isRoot(node2.id)).toBe(false);
      expect(Tree.isRoot(node3.id)).toBe(false);
    })
  })

  describe('.isOnlyChild(id)', function() {
    it('returns null if node or parent does not exist', function() {
      var root = Tree.new();

      expect(Tree.isOnlyChild(1)).toBeNull();
      expect(Tree.isOnlyChild(root.id)).toBeNull();
    })

    it('returns true if node has a parent and no siblings', function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id);

      expect(Tree.isOnlyChild(node1.id)).toBe(true);
    })

    it('returns false for any nodes with siblings', function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id)
        , node2 = Tree.addNode(root.id);

      expect(Tree.isOnlyChild(node1.id)).toBe(false);
      expect(Tree.isOnlyChild(node2.id)).toBe(false);
    })

    it('works dynamically after deleting and adding nodes', function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id)
        , node2 = Tree.addNode(root.id);

      expect(Tree.isOnlyChild(node1.id)).toBe(false);
      expect(Tree.isOnlyChild(node2.id)).toBe(false);

      Tree.deleteNode(node2.id);

      expect(Tree.isOnlyChild(node1.id)).toBe(true);
    })
  })

  describe('.isFirstChild(id)', function() {
    it('returns null if node or parent does not exist', function() {
      var root = Tree.new();

      expect(Tree.isFirstChild(1)).toBeNull();
      expect(Tree.isFirstChild(root.id)).toBeNull();
    })

    it('returns false for all but the first of many children', function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id)
        , node2 = Tree.addNode(root.id)
        , node3 = Tree.addNode(root.id);

      expect(Tree.isFirstChild(node1.id)).toBe(true);
      expect(Tree.isFirstChild(node2.id)).toBe(false);
      expect(Tree.isFirstChild(node3.id)).toBe(false);
    })
  })

  describe('.isLastChild(id)', function() {
    it('returns null if node or parent does not exist', function() {
      var root = Tree.new();

      expect(Tree.isLastChild(1)).toBeNull();
      expect(Tree.isLastChild(root.id)).toBeNull();
    })

    it('returns false for all but the last of many children', function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id)
        , node2 = Tree.addNode(root.id)
        , node3 = Tree.addNode(root.id);

      expect(Tree.isLastChild(node1.id)).toBe(false);
      expect(Tree.isLastChild(node2.id)).toBe(false);
      expect(Tree.isLastChild(node3.id)).toBe(true);
    })
  })

  describe('.isMiddleChild(id)', function() {
    it('returns null if node or parent does not exist', function() {
      var root = Tree.new();

      expect(Tree.isMiddleChild(1)).toBeNull();
      expect(Tree.isMiddleChild(root.id)).toBeNull();
    })

    it('returns true for all but the first and last children', function() {
      var root = Tree.new()
        , node1 = Tree.addNode(root.id)
        , node2 = Tree.addNode(root.id)
        , node3 = Tree.addNode(root.id)
        , node4 = Tree.addNode(root.id);

      expect(Tree.isMiddleChild(node1.id)).toBe(false);
      expect(Tree.isMiddleChild(node2.id)).toBe(true);
      expect(Tree.isMiddleChild(node3.id)).toBe(true);
      expect(Tree.isMiddleChild(node4.id)).toBe(false);
    });
  })
})