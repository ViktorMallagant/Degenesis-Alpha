(function () {
  "use strict";

  var COL_WIDTH = 155;
  var ROW_HEIGHT = 34;
  var BADGE_H = 26;
  var LINE_COLOR = "#555";
  var LINE_WIDTH = 2;

  // Rank name translations (French)
  var RANK_NAMES_FR = {
    // Chroniqueurs
    bit: "Bit",
    agent: "Agent",
    mediator: "Médiateur",
    streamer: "Diffuseur",
    fragment: "Fragment",
    paradigma: "Paradigme",
    shutter: "Occulteur",
    fuse: "Fusible",
    scalar: "Skalar",
    zero: "Zéro",
    needle: "Aiguilles"
  };

  var waitAttempts = 0;
  function waitForStore(cb) {
    waitAttempts++;
    if (waitAttempts > 100) { console.error("rank-tree: timeout waiting for store"); return; }
    if (window.__charStore && window.__getRanks) return cb();
    setTimeout(function () { waitForStore(cb); }, 200);
  }

  waitForStore(function () {
    var store = window.__charStore;
    var i18n = window.__i18n;
    var getRanks = window.__getRanks;

    function t(key) {
      try {
        // Try component's $t
        if (typeof window.__t === "function") return window.__t(key);
        // Try i18n.global.t
        if (window.__i18n && window.__i18n.global && typeof window.__i18n.global.t === "function") {
          return window.__i18n.global.t(key);
        }
        // Fallback: use hardcoded French translations
        var match = key.match(/ranks\.(\w+)/);
        if (match && match[1]) {
          var rankName = match[1];
          if (RANK_NAMES_FR[rankName]) return RANK_NAMES_FR[rankName];
          return rankName;
        }
        return key;
      } catch (e) { return key; }
    }

    // ─── Observe DOM for mount point ───
    var lastCult = null, lastClan = null, lastRank = null, lastEligible = "", lastMode = "";

    new MutationObserver(function () { checkMount(); })
      .observe(document.body, { childList: true, subtree: true });

    store.$subscribe(function () { checkMount(); });

    function checkMount(forceUpdate) {
      var mount = document.querySelector(".rank-tree-mount");
      if (!mount) { lastCult = null; return; }
      var cn = store.cult ? store.cult.name : "";
      var cl = store.clan ? store.clan.name : "";
      var rn = store.rank ? store.rank.name : "";
      var md = store.editorMode || "";
      var el = "";
      try { el = Array.from(store.eligibleRanks).map(function(r){return r.name;}).sort().join(","); } catch(e){}
      if (forceUpdate || cn !== lastCult || cl !== lastClan || rn !== lastRank || el !== lastEligible || md !== lastMode) {
        lastCult = cn; lastClan = cl; lastRank = rn; lastEligible = el; lastMode = md;
        renderTree(mount);
      }
    }

    // ─── Layout algorithm ───
    function computeLayout(ranks) {
      var normal = ranks.filter(function (r) { return !r.isOutsideHierarchy && r.hierarchyLevel > 0; });
      var outside = ranks.filter(function (r) { return r.isOutsideHierarchy || r.hierarchyLevel <= 0; });

      // children map (only among normal ranks)
      var normalNames = {};
      normal.forEach(function (r) { normalNames[r.name] = true; });

      var childrenOf = {};
      normal.forEach(function (r) {
        r.parentRanks.forEach(function (p) {
          if (!normalNames[p.name]) return;
          childrenOf[p.name] = childrenOf[p.name] || [];
          if (!childrenOf[p.name].some(function (c) { return c.name === r.name; }))
            childrenOf[p.name].push(r);
        });
      });

      // Static descendant count (used for initial ordering)
      function descendantCount(r, seen) {
        seen = seen || {};
        if (seen[r.name]) return 0;
        seen[r.name] = true;
        var ch = childrenOf[r.name] || [];
        return ch.reduce(function (n, c) { return n + 1 + descendantCount(c, seen); }, 0);
      }
      // Effective descendant count: ignores already-visited nodes so that a node
      // whose children are all placed (e.g. Arbiter when HighJudge is already visited)
      // sorts as 0 and gets placed first (closer to its sibling in the tree).
      function effectiveDescendantCount(r, seen) {
        seen = seen || {};
        if (seen[r.name] || visited[r.name]) return 0;
        seen[r.name] = true;
        var ch = childrenOf[r.name] || [];
        return ch.reduce(function (n, c) {
          if (visited[c.name]) return n;
          return n + 1 + effectiveDescendantCount(c, seen);
        }, 0);
      }

      // roots
      var roots = normal.filter(function (r) {
        return r.parentRanks.length === 0 ||
          !r.parentRanks.some(function (p) { return normalNames[p.name]; });
      });

      // Detect convergence: siblings that share a common child
      // Picks the shared child with the MOST co-parents (not just the first match)
      function findConvergenceGroups(siblings) {
        var groups = [], used = {};
        for (var i = 0; i < siblings.length; i++) {
          if (used[siblings[i].name]) continue;
          var myKids = (childrenOf[siblings[i].name] || []).map(function (c) { return c.name; });

          var bestKid = null, bestMembers = null;
          for (var ki = 0; ki < myKids.length; ki++) {
            var kid = myKids[ki];
            var members = [siblings[i]];
            for (var j = 0; j < siblings.length; j++) {
              if (j === i || used[siblings[j].name]) continue;
              var theirKids = (childrenOf[siblings[j].name] || []).map(function (c) { return c.name; });
              if (theirKids.indexOf(kid) >= 0) members.push(siblings[j]);
            }
            if (!bestMembers || members.length > bestMembers.length) {
              bestMembers = members;
              bestKid = kid;
            }
          }

          if (bestMembers && bestMembers.length > 1 && bestKid) {
            var convRank = (childrenOf[siblings[i].name] || []).find(function (c) { return c.name === bestKid; });
            bestMembers.forEach(function (m) { used[m.name] = true; });
            groups.push({ type: "group", items: bestMembers, convergence: convRank });
          } else {
            used[siblings[i].name] = true;
            groups.push({ type: "single", rank: siblings[i] });
          }
        }
        return groups;
      }

      // DFS row assignment
      var posOf = {};
      var nextRow = 0;
      var visited = {};

      function assign(rank) {
        if (visited[rank.name]) return posOf[rank.name] ? posOf[rank.name].row : 0;
        visited[rank.name] = true;

        var col = rank.hierarchyLevel - 1;
        var children = (childrenOf[rank.name] || []).filter(function (c) { return !visited[c.name] && !c.isOutsideHierarchy && c.hierarchyLevel > 0; });
        // Sort by effective descendants at this moment: nodes whose subtree is already
        // placed (0 effective desc) float to the top, keeping the tree compact.
        children.sort(function (a, b) { return effectiveDescendantCount(a) - effectiveDescendantCount(b); });

        if (children.length === 0) {
          posOf[rank.name] = { col: col, row: nextRow };
          nextRow++;
          return posOf[rank.name].row;
        }

        var groups = findConvergenceGroups(children);
        var allChildRows = [];

        // Convergence groups before singles so isolated branches end up at the bottom
        groups.sort(function (a, b) {
          return (a.type === "group" ? 0 : 1) - (b.type === "group" ? 0 : 1);
        });

        groups.forEach(function (g) {
          if (g.type === "single") {
            allChildRows.push(assign(g.rank));
          } else {
            var convName = g.convergence ? g.convergence.name : null;

            // Sort items: those with extra children first so they appear at the top
            g.items.sort(function (a, b) {
              var aExtra = (childrenOf[a.name] || []).filter(function (c) {
                return c.name !== convName && !visited[c.name];
              }).length;
              var bExtra = (childrenOf[b.name] || []).filter(function (c) {
                return c.name !== convName && !visited[c.name];
              }).length;
              return bExtra - aExtra;
            });

            var groupRows = [], extraPlaced = {};
            g.items.forEach(function (item) {
              if (!visited[item.name]) {
                visited[item.name] = true;
                posOf[item.name] = { col: item.hierarchyLevel - 1, row: nextRow };
                groupRows.push(nextRow);
                nextRow++;

                // Inline leaf extra children right after their parent
                (childrenOf[item.name] || []).forEach(function (child) {
                  if (child.name === convName) return;
                  if (visited[child.name] || extraPlaced[child.name]) return;
                  if (childrenOf[child.name] && childrenOf[child.name].length > 0) return;
                  extraPlaced[child.name] = true;
                  visited[child.name] = true;
                  posOf[child.name] = { col: child.hierarchyLevel - 1, row: nextRow };
                  nextRow++;
                });
              }
            });

            if (groupRows.length === 0) { allChildRows.push.apply(allChildRows, groupRows); return; }
            var groupCenter = (groupRows[0] + groupRows[groupRows.length - 1]) / 2;

            // Collect ALL non-leaf children shared by ≥2 group items (primary convergence + siblings like Shaman)
            var allShared = [];
            if (g.convergence && !visited[g.convergence.name]) allShared.push(g.convergence);
            g.items.forEach(function (item) {
              (childrenOf[item.name] || []).forEach(function (child) {
                if (child.name === convName) return;
                if (visited[child.name] || extraPlaced[child.name]) return;
                if (allShared.some(function (s) { return s.name === child.name; })) return;
                if (!(childrenOf[child.name] && childrenOf[child.name].length > 0)) return;
                var n = g.items.filter(function (it) {
                  return (childrenOf[it.name] || []).some(function (c) { return c.name === child.name; });
                }).length;
                if (n >= 2) allShared.push(child);
              });
            });

            // Place all shared children symmetrically around groupCenter (without advancing nextRow)
            var M = allShared.length;
            allShared.forEach(function (sc, idx) {
              if (!visited[sc.name]) {
                visited[sc.name] = true;
                posOf[sc.name] = { col: sc.hierarchyLevel - 1, row: groupCenter - (M - 1) / 2 + idx };
              }
            });

            // Assign subtrees of each shared child (only unvisited children)
            allShared.forEach(function (sc) {
              (childrenOf[sc.name] || []).filter(function (c) { return !visited[c.name]; })
                .forEach(function (c) { assign(c); });
            });

            // Re-center the direct children of allShared over the shared children's row span
            if (allShared.length > 0) {
              var sharedCenter = (posOf[allShared[0].name].row + posOf[allShared[allShared.length - 1].name].row) / 2;
              var jointKids = {};
              allShared.forEach(function (sc) {
                (childrenOf[sc.name] || []).forEach(function (c) {
                  if (posOf[c.name]) jointKids[c.name] = c;
                });
              });
              Object.keys(jointKids).forEach(function (name) {
                var shift = sharedCenter - posOf[name].row;
                if (Math.abs(shift) > 0.01) shiftSubtree(jointKids[name], shift);
              });
            }

            allChildRows.push.apply(allChildRows, groupRows);
          }
        });

        if (allChildRows.length > 0) {
          var minR = Math.min.apply(null, allChildRows);
          var maxR = Math.max.apply(null, allChildRows);
          posOf[rank.name] = { col: col, row: (minR + maxR) / 2 };
        } else {
          posOf[rank.name] = { col: col, row: nextRow++ };
        }
        return posOf[rank.name].row;
      }

      function shiftSubtree(rank, dy) {
        if (!posOf[rank.name]) return;
        posOf[rank.name].row += dy;
        (childrenOf[rank.name] || []).forEach(function (c) {
          if (c.parentRanks.length <= 1) shiftSubtree(c, dy);
        });
      }

      roots.forEach(function (r) { assign(r); });
      normal.forEach(function (r) { if (!visited[r.name]) assign(r); });

      // Center multi-parent leaf nodes between their parents' rows.
      // Only applies to leaves (no children in normal hierarchy) to avoid
      // cascading collisions with already-placed subtrees.
      normal.forEach(function (r) {
        if ((childrenOf[r.name] || []).length > 0) return;
        var parentPositions = r.parentRanks
          .filter(function (p) { return posOf[p.name]; })
          .map(function (p) { return posOf[p.name].row; });
        if (parentPositions.length >= 2 && posOf[r.name]) {
          var avgRow = parentPositions.reduce(function (a, b) { return a + b; }, 0) / parentPositions.length;
          var shift = avgRow - posOf[r.name].row;
          if (Math.abs(shift) > 0.01) shiftSubtree(r, shift);
        }
      });

      // Calculate maxCol of normal ranks
      var normalMaxCol = Math.max.apply(null, normal.filter(function (r) { return posOf[r.name]; }).map(function (r) { return posOf[r.name].col; }).concat([0]));

      // Outside hierarchy & special ranks — place them after the normal tree,
      // in topological order so chained outside ranks (e.g. Moyo → Kifo) get sequential columns
      var outsideNames = {};
      outside.forEach(function (r) { outsideNames[r.name] = true; });
      var outsideRow = nextRow;
      var outsideVisited = {};
      function assignOutside(r) {
        if (outsideVisited[r.name]) return;
        // Ensure outside parents are placed first
        r.parentRanks.forEach(function (p) {
          if (outsideNames[p.name]) assignOutside(p);
        });
        outsideVisited[r.name] = true;
        var hasNormalParent = r.parentRanks.some(function (p) { return !outsideNames[p.name] && posOf[p.name]; });
        var col;
        if (hasNormalParent) {
          // Place one step LEFT of the normal parent: visually "below" the parent's predecessors
          col = 0;
          r.parentRanks.forEach(function (p) {
            if (!outsideNames[p.name] && posOf[p.name])
              col = Math.max(col, Math.max(0, posOf[p.name].col - 2));
          });
          r.parentRanks.forEach(function (p) {
            if (outsideNames[p.name] && posOf[p.name])
              col = Math.max(col, posOf[p.name].col + 1);
          });
        } else {
          // No normal parent: chain to right of outside parent, or place at far right if no parents
          var hasOutsideParent = r.parentRanks.some(function (p) { return outsideNames[p.name] && posOf[p.name]; });
          col = hasOutsideParent ? 0 : normalMaxCol + 1;
          r.parentRanks.forEach(function (p) {
            if (outsideNames[p.name] && posOf[p.name])
              col = Math.max(col, posOf[p.name].col + 1);
          });
          if (!hasOutsideParent && col === 0) col = normalMaxCol + 1;
        }
        // If this rank has ONLY outside parents (chained: e.g. Kifo after Moyo),
        // place it on the same row as its parent — they sit side by side
        var onlyOutsideParents = r.parentRanks.length > 0 && !hasNormalParent;
        if (onlyOutsideParents) {
          var parentRow = outsideRow;
          r.parentRanks.forEach(function (p) {
            if (outsideNames[p.name] && posOf[p.name]) parentRow = posOf[p.name].row;
          });
          posOf[r.name] = { col: col, row: parentRow };
          // Don't increment outsideRow — they share the same row
        } else {
          posOf[r.name] = { col: col, row: outsideRow };
          outsideRow++;
        }
      }
      outside.forEach(function (r) { assignOutside(r); });

      // Build output
      var nodes = [], connections = [];
      ranks.forEach(function (r) {
        if (posOf[r.name]) nodes.push({ rank: r, col: posOf[r.name].col, row: posOf[r.name].row });
      });
      ranks.forEach(function (r) {
        if (r.isOutsideHierarchy || r.hierarchyLevel <= 0) return;
        r.parentRanks.forEach(function (p) {
          if (p.isOutsideHierarchy || p.hierarchyLevel <= 0) return;
          if (posOf[r.name] && posOf[p.name])
            connections.push({ from: posOf[p.name], to: posOf[r.name], fromName: p.name, toName: r.name });
        });
      });
      ranks.forEach(function (r) {
        if (!r.isOutsideHierarchy && r.hierarchyLevel > 0) return;
        r.parentRanks.forEach(function (p) {
          if (posOf[r.name] && posOf[p.name])
            connections.push({ from: posOf[p.name], to: posOf[r.name], fromName: p.name, toName: r.name });
        });
      });

      return {
        nodes: nodes,
        connections: connections,
        maxCol: Math.max.apply(null, nodes.map(function (n) { return n.col; }).concat([0])),
        maxRow: outsideRow
      };
    }

    // ─── Rendering ───
    function renderTree(mount) {
      mount.innerHTML = "";
      if (!store.cult) return;

      var ranks;
      try { ranks = getRanks(store.cult, store.clan); } catch (e) { return; }
      if (!ranks || ranks.length === 0) return;

      ranks = ranks.slice().sort(function (a, b) {
        return a.hierarchyLevel - b.hierarchyLevel || a.name.localeCompare(b.name);
      });

      var layout = computeLayout(ranks);

      var container = document.createElement("div");
      container.className = "rank-tree";

      // Render badges first to measure widths
      var badgeEls = {};
      var eligibleNames = {};
      try {
        Array.from(store.eligibleRanks).forEach(function (r) { eligibleNames[r.name] = true; });
      } catch (e) {}

      layout.nodes.forEach(function (node) {
        var el = makeBadge(node.rank, node.col, node.row, eligibleNames);
        badgeEls[node.rank.name] = el;
        container.appendChild(el);
      });

      mount.appendChild(container);

      // Draw SVG lines after layout
      requestAnimationFrame(function () {
        // Compute per-column widths based on actual rendered badge widths
        var colWidths = {};
        layout.nodes.forEach(function (node) {
          var el = badgeEls[node.rank.name];
          if (!el) return;
          var w = el.getBoundingClientRect().width + 16; // 16px gap between columns
          if (!colWidths[node.col] || w > colWidths[node.col]) colWidths[node.col] = w;
        });

        // Compute cumulative X offsets per column
        var maxCol = Math.max.apply(null, Object.keys(colWidths).map(Number).concat([0]));
        var colX = {};
        var x = 0;
        for (var c = 0; c <= maxCol; c++) {
          colX[c] = x;
          x += colWidths[c] || COL_WIDTH;
        }

        // Reposition badges to computed X
        layout.nodes.forEach(function (node) {
          var el = badgeEls[node.rank.name];
          if (el) el.style.left = colX[node.col] + "px";
        });

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "rank-tree-svg");
        svg.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible";

        var cr = container.getBoundingClientRect();

        function seg(x1, y1, x2, y2) {
          var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", x1); line.setAttribute("y1", y1);
          line.setAttribute("x2", x2); line.setAttribute("y2", y2);
          line.setAttribute("stroke", LINE_COLOR);
          line.setAttribute("stroke-width", LINE_WIDTH);
          line.setAttribute("stroke-linecap", "square");
          svg.appendChild(line);
        }

        // Resolve pixel coordinates for each connection
        var connData = [];
        layout.connections.forEach(function (conn) {
          var fromEl = badgeEls[conn.fromName];
          var toEl   = badgeEls[conn.toName];
          if (!fromEl || !toEl) return;
          var fr = fromEl.getBoundingClientRect();
          var tr = toEl.getBoundingClientRect();
          connData.push({
            fromName: conn.fromName, toName: conn.toName,
            fromCol: conn.from.col,  toCol: conn.to.col,
            x1: fr.right  - cr.left, y1: fr.top + fr.height / 2 - cr.top,
            x2: tr.left   - cr.left, y2: tr.top + tr.height / 2 - cr.top
          });
        });

        // Group by column-transition key, then find connected components
        // (components share a source or target name → drawn with a shared spine)
        var transitions = {};
        connData.forEach(function (c) {
          var k = c.fromCol + "-" + c.toCol;
          (transitions[k] = transitions[k] || []).push(c);
        });

        Object.keys(transitions).forEach(function (k) {
          var conns = transitions[k];
          var used  = new Array(conns.length).fill(false);

          for (var i = 0; i < conns.length; i++) {
            if (used[i]) continue;
            var comp = [i]; used[i] = true;
            var changed = true;
            while (changed) {
              changed = false;
              for (var j = 0; j < conns.length; j++) {
                if (used[j]) continue;
                var linked = comp.some(function (ki) {
                  return conns[ki].fromName === conns[j].fromName ||
                         conns[ki].toName   === conns[j].toName;
                });
                if (linked) { comp.push(j); used[j] = true; changed = true; }
              }
            }

            // Unique sources and targets in this component
            var srcMap = {}, tgtMap = {};
            comp.forEach(function (ci) {
              srcMap[conns[ci].fromName] = { x: conns[ci].x1, y: conns[ci].y1 };
              tgtMap[conns[ci].toName]   = { x: conns[ci].x2, y: conns[ci].y2 };
            });
            var srcs = Object.keys(srcMap).map(function (n) { return srcMap[n]; });
            var tgts = Object.keys(tgtMap).map(function (n) { return tgtMap[n]; });

            if (srcs.length === 1 && tgts.length === 1) {
              // Simple connection: H then optional V then H
              var s = srcs[0], t = tgts[0];
              if (Math.abs(s.y - t.y) < 1) {
                seg(s.x, s.y, t.x, t.y);          // pure horizontal
              } else {
                var mid = s.x + (t.x - s.x) * 0.4;
                seg(s.x, s.y, mid, s.y);           // H out
                seg(mid, s.y, mid, t.y);            // V
                seg(mid, t.y, t.x, t.y);            // H in
              }
              continue;
            }

            // Spine: vertical bar between all sources and targets
            var maxSrcX = Math.max.apply(null, srcs.map(function (s) { return s.x; }));
            var minTgtX = Math.min.apply(null, tgts.map(function (t) { return t.x; }));
            var spineX  = maxSrcX + (minTgtX - maxSrcX) * 0.35;

            var allY = srcs.map(function (s) { return s.y; }).concat(tgts.map(function (t) { return t.y; }));
            seg(spineX, Math.min.apply(null, allY), spineX, Math.max.apply(null, allY));

            srcs.forEach(function (s) { seg(s.x, s.y, spineX, s.y); });
            tgts.forEach(function (t) { seg(spineX, t.y, t.x, t.y); });
          }
        });

        container.insertBefore(svg, container.firstChild);
        container.style.width = container.scrollWidth + "px";
        container.style.height = container.scrollHeight + "px";
      });
    }

    function makeBadge(rank, col, row, eligibleNames) {
      var isEligible = !!eligibleNames[rank.name];
      var isFreeMode = store.editorMode === "free";
      var isClickable = isEligible || isFreeMode;
      var isSelected = store.rank && rank.name === store.rank.name;

      var div = document.createElement("div");
      div.className = "rank-badge" +
        (isSelected ? " selected" : isEligible ? " eligible" : isFreeMode ? " eligible" : " disabled");
      div.dataset.rank = rank.name;
      div.style.position = "absolute";
      div.style.left = col * COL_WIDTH + "px";
      div.style.top = Math.round(row * ROW_HEIGHT) + "px";

      var lvl = document.createElement("span");
      lvl.className = "rank-lvl";
      lvl.textContent = rank.hierarchyLevelString;
      div.appendChild(lvl);

      var nm = document.createElement("span");
      nm.className = "rank-nm";
      nm.textContent = t("ranks." + rank.name).toUpperCase();
      div.appendChild(nm);

      // Click
      div.addEventListener("click", function () {
        if (isClickable) store.setRank(rank);
      });

      // Hover: highlight requirements
      div.addEventListener("mouseenter", function (ev) {
        tipOverBadge = true;
        var items = [];
        rank.requiredSkills.forEach(function (s) { s.items.forEach(function (c) { items.push(c.skill); }); });
        rank.requiredOrigins.forEach(function (s) { s.items.forEach(function (o) { items.push(o); }); });
        items = items.concat(rank.parentRanks);
        store.setHighlighted.apply(store, items);
        showTooltip(rank, div);
      });

      div.addEventListener("mouseleave", function () {
        tipOverBadge = false;
        var items = [];
        rank.requiredSkills.forEach(function (s) { s.items.forEach(function (c) { items.push(c.skill); }); });
        rank.requiredOrigins.forEach(function (s) { s.items.forEach(function (o) { items.push(o); }); });
        items = items.concat(rank.parentRanks);
        store.unsetHighlighted.apply(store, items);
        scheduleHide();
      });

      return div;
    }

    // ─── Tooltip ───
    var tip = null;
    var tooltipTimer = null;
    var hideTimer = null;
    var tipOverBadge = false;
    var tipOverTip = false;

    function scheduleHide() {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        if (!tipOverBadge && !tipOverTip) hideTooltip();
      }, 80);
    }

    function showTooltip(rank, anchor) {
      clearTimeout(tooltipTimer);
      clearTimeout(hideTimer);
      if (!tip) {
        tip = document.createElement("div");
        tip.className = "rank-tip";
        tip.addEventListener("mouseenter", function () { tipOverTip = true; clearTimeout(hideTimer); });
        tip.addEventListener("mouseleave", function () { tipOverTip = false; scheduleHide(); });
        document.body.appendChild(tip);
      }
      var desc = t("ranks." + rank.name + "Description");
      var descEmpty = !desc || desc === "ranks." + rank.name + "Description";

      var isEligible = store.editorMode === "free" || (store.eligibleRanks && Array.from(store.eligibleRanks).some(function(r){ return r.name === rank.name; }));
      var missingHtml = "";
      if (!isEligible) {
        var missing = [];
        rank.requiredSkills.forEach(function(req) {
          try { if (!req.check(store.skillValues)) missing.push(req.format(t)); } catch(e){}
        });
        rank.requiredOrigins.forEach(function(req) {
          try { if (!req.check(store.originValues)) missing.push(req.format(t)); } catch(e){}
        });
        if (rank.parentRanks.length > 0) {
          var anyParentEligible = rank.parentRanks.some(function(p) {
            return p.isEligible(store.cult, store.skillValues, store.originValues, store.clan);
          });
          if (!anyParentEligible) {
            var parentNames = rank.parentRanks.map(function(p) { return t("ranks." + p.name); }).join(" / ");
            missing.push(parentNames);
          }
        }
        if (rank.requiredRanks && rank.requiredRanks.length > 0) {
          var anyRequiredEligible = rank.requiredRanks.some(function(r) {
            return r.isEligible(store.cult, store.skillValues, store.originValues, store.clan);
          });
          if (!anyRequiredEligible) {
            var reqNames = rank.requiredRanks.map(function(r) { return t("ranks." + r.name); }).join(" / ");
            missing.push(reqNames);
          }
        }
        if (missing.length > 0) {
          var label = t("messages.missingConditions") || "Conditions manquantes";
          missingHtml = '<hr style="border-color:#555;margin:10px 0"><span style="color:#ef9a9a;font-weight:bold">' + label + '</span><br>' +
            missing.map(function(m){ return "• " + m; }).join("<br>");
        }
      }

      if (descEmpty && !missingHtml) {
        tip.classList.remove("show");
        return;
      }

      tip.classList.remove("show");
      tip.innerHTML = (descEmpty ? "" : desc) + missingHtml;

      var rect = anchor.getBoundingClientRect();
      var tipW = Math.min(420, window.innerWidth - 20);
      tip.style.maxWidth = tipW + "px";

      var th = tip.offsetHeight;
      var left = rect.left + rect.width / 2 - tipW / 2;
      left = Math.max(5, Math.min(left, window.innerWidth - tipW - 5));
      var top = rect.top - th - 8;
      if (top < 5) top = rect.bottom + 8;
      tip.style.left = left + "px";
      tip.style.top = top + "px";

      tip.offsetHeight;
      tooltipTimer = setTimeout(function () {
        tip.classList.add("show");
      }, 500);
    }

    function hideTooltip() {
      clearTimeout(tooltipTimer);
      clearTimeout(hideTimer);
      tipOverBadge = false;
      tipOverTip = false;
      if (tip) tip.classList.remove("show");
    }
  });
})();
