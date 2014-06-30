# Dynamic Trees

A [demo of creating dynamic tree hierarchies](sethbonnie.github.io/dynamic-tree) using AngularJS and React.

The theory behind it is that a node will have the following structure

```
.tree
  .ancestry-link
  .node
  .offspring-link
  .children
    .tree*
```

Each `.tree` node will be further be classified as one of `.root`, `.only-child`, `.first-child`, `.middle-child`, or `.last-child`. These will determine how the ancestry link (if any) is shaped. The basic idea is that the root has no ancestry link, because duh. An only child would have a direct link to its parent; i.e., a straight connection line. Then if there is more than one child, then we shape each ancestry link according to its position: first-child has a right pointing link, a middle-child has a t-shaped link, and a last-child has a left pointing link. So for example, 

```
              root
                |
    ---------------------------
    |        |        |       |
  first    middle   middle   last
             |                |
             |           -----------
             |           |         |
            only       first      last
```

Once we have some representation of a tree, we can use it to determine relationships between the nodes and dynamically classify them accordingly.