<template>
  <v-stage ref="konva" :config="configKonva" class="map__konva" style="width: 99%; height: 99%">
    <v-layer ref="l_links"/>
    <v-layer ref="l_nodes"/>
    <v-layer ref="l_info"/>
  </v-stage>
</template>

<!--

  A tree in which each node contains an array of interactions.
  Interaction nodes can be promoted to new root nodes.

-->

<script>
  export default {
    props: {
      data: Object,
      words: Array,
    },
    data: () => ({
      configKonva: {},
      config: {
        tension: 0.03,
        node: {
          radius: 3,
          color: '#3366cc',
          color_over: '#4d78cd',
          stroke: {
            color: {
              green: '#53d457',
              yellow: '#d8cc46',
              red: '#c83737',
            },
            width: 0.5
          }
        },
        link: {
          stroke: {
            color: '#0e3575',
            width: 0.1
          },
        }
      },
      nodes: [],
      links: [],
      anim: {
        instance: null,
        speed: 0.15,
      },
      last: {
        center: null,
        dist: 0
      },
    }),
    methods: {
      /*
          Graph Elements
      */
      // Node
      add_node(root, angle, data) {
        const layer = this.$refs.l_nodes.getStage();
        //const layer_info = this.$refs.l_info.getStage();
        const layer_links = this.$refs.l_links.getStage();

        var node = new Konva.Circle({
          x: root.x(),
          y: root.y(),
          fill: this.config.node.color,
          radius: this.config.node.radius,
          stroke:
            (data.time > 900) ? this.config.node.stroke.color.red : (
              (data.time > 600) ? this.config.node.stroke.color.yellow :
                this.config.node.stroke.color.green
            ),
          strokeWidth: this.config.node.stroke.width
        });
        node.root_node = root;
        node.mult = 1;
        node._mult = 1;
        node.data = data;
        node.angle = angle;
        layer.add(node);

        node.text = new Konva.Text({
          x: node.x()-2.5,
          y: node.y()-1,
          text: node.data.name,
          fontSize: 1,
          fontFamily: 'Barlow',
          fill: '#fff',
          width: 5,
          align: 'center',
          listening: false,
        });
        layer.add(node.text);

        node.link = new Konva.Line({
          points: [node.x(), node.y(), node.root_node.x(), node.root_node.y()],
          stroke: this.config.link.stroke.color,
          strokeWidth: this.config.link.stroke.width,
        });
        layer_links.add(node.link);

        return node;
      },

      /*
          Lifecycle Methods
      */

      // Rebuild graph
      build() {
        // No root selected, do nothing
        if (this.root == null) return;

        // Clear tree
        if (this.tree != null) {
          this.clear();
          this.tree.text.destroy();
          this.tree.destroy();
          this.tree = null;
        }

        // Add root node
        let root_node = this.data[this.root.toString()];
        if (root_node != null) {
          this.tree = this.add_root_node(root_node);
        }

        // Draw All Layers
        const layer_guides = this.$refs.l_guides.getStage();
        layer_guides.draw();
        const layer_links = this.$refs.l_links.getStage();
        layer_links.draw();
        const layer_nodes = this.$refs.l_nodes.getStage();
        layer_nodes.draw();
        const layer_info = this.$refs.l_info.getStage();
        this.name_hint = this.add_name_hint(layer_info);
        layer_info.draw();

        // Mouse events
        const vue = this;
        layer_nodes.off('mousemove');
        layer_nodes.on('mousemove', function (evt) {
          var node = evt.target;
          if (node.branches != null) node.fill(vue.config.root.color_over);
          else node.fill(vue.config.node.color_over);
          vue.show_hint(node);
          layer_info.draw();
          node.draw();
        });
        layer_nodes.off('mouseout');
        layer_nodes.on('mouseout', function (evt) {
          var node = evt.target;
          if (node.branches != null) node.fill(vue.config.root.color);
          else node.fill(vue.config.node.color);
          vue.hide_hint();
          layer_info.draw();
          node.draw();
        });

        // Animation
        if (this.anim.instance != null) {
          this.anim.instance.stop();
          delete this.anim.instance;
        }
        this.anim.instance = new Konva.Animation(function(frame) {
          vue.update();
        }, [layer_guides, layer_nodes, layer_links, layer_info]);
        this.anim.instance.start();
      },

      // Clear nodes
      clear() {
        // Default node (on first call)
        // So you can call it with "this.clear()"
        if (node == null) {
          if (this.tree == null) return;
          node = this.tree;
        }
        // Destroy each interaction
        for (let c in node.interactions) {
          node.interactions[c].link.destroy();
          node.interactions[c].text.destroy();
          node.interactions[c].destroy();
        }
        node.interactions = null;

        // Destroy guide (big ring)
        if (node.guide != null) node.guide.destroy();

        // Recursion time!
        for (let b in node.branches) {
          this.clear(node.branches[b]);
        }

        // Wipe it for me pls
        delete node.branches;
      },

      // Update root node
      update_node(root) {


      },

      update() {
        for (let r in this.root_nodes)
          this.update_node(this.root_nodes[r]);

        // Links
        for (let l in this.links) {
          let link = this.links[l];
          link.points([link.a.x(), link.a.y(), link.b.x(), link.b.y()]);
        }
      },
      getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      },
      getCenter(p1, p2) {
        return {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2,
        };
      }
    },

    mounted() {
      // Responsiveness
      const container = document.querySelector('.map__konva');
      const stage = this.$refs.konva.getStage();
      stage.width(container.offsetWidth);
      stage.height(container.offsetHeight);
      stage.scale({ x: container.offsetWidth/100, y: container.offsetWidth/100 });

      const observer = new ResizeObserver(() => {
        stage.width(container.offsetWidth);
        stage.height(container.offsetHeight);
        stage.scale({ x: container.offsetWidth/100, y: container.offsetWidth/100 });
      });

      // Wheel Zoom
      let scaleBy = 1.05;
      stage.on('wheel', (e) => {
        e.evt.preventDefault();
        let oldScale = stage.scaleX();

        let pointer = stage.getPointerPosition();

        let mousePointTo = {
          x: (pointer.x - stage.x()) / oldScale,
          y: (pointer.y - stage.y()) / oldScale,
        };

        let newScale =
          e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

        stage.scale({ x: newScale, y: newScale });

        let newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        };
        stage.position(newPos);
      });

      // Gestures
      stage.draggable(true);
      stage.on('touchmove', function (e) {
        e.evt.preventDefault();
        var touch1 = e.evt.touches[0];
        var touch2 = e.evt.touches[1];

        if (touch1 && touch2) {
          // if the stage was under Konva's drag&drop
          // we need to stop it, and implement our own pan logic with two pointers
          if (stage.isDragging()) {
            stage.stopDrag();
          }

          var p1 = {
            x: touch1.clientX,
            y: touch1.clientY,
          };
          var p2 = {
            x: touch2.clientX,
            y: touch2.clientY,
          };

          if (!this.last.center) {
            this.last.center = this.getCenter(p1, p2);
            return;
          }
          var newCenter = this.getCenter(p1, p2);

          var dist = this.getDistance(p1, p2);

          if (!this.last.dist) {
            this.last.dist = dist;
          }

          // local coordinates of center point
          var pointTo = {
            x: (newCenter.x - stage.x()) / stage.scaleX(),
            y: (newCenter.y - stage.y()) / stage.scaleX(),
          };

          var scale = stage.scaleX() * (dist / this.last.dist);

          stage.scaleX(scale);
          stage.scaleY(scale);

          // calculate new position of the stage
          var dx = newCenter.x - this.last.center.x;
          var dy = newCenter.y - this.last.center.y;

          var newPos = {
            x: newCenter.x - pointTo.x * scale + dx,
            y: newCenter.y - pointTo.y * scale + dy,
          };

          stage.position(newPos);

          this.last.dist = dist;
          this.last.center = newCenter;
        }
      });

      stage.on('touchend', function () {
        this.last.dist = 0;
        this.last.center = null;
      });

      observer.observe(container);
    },

    watch: {
      data: {
         handler(val) {
           this.build();
         },
      },
      root: {
         handler(val) {
           this.build();
         },
      }
    }
  }
</script>

<style>

.map__konva {
  background-color: var(--v-tone_higher-base) !important;
}

</style>
