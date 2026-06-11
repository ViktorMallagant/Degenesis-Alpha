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
    var lastCult = null, lastClan = null, lastRank = null, lastEligible = "";

    new MutationObserver(function () { checkMount(); })
      .observe(document.body, { childList: true, subtree: true });

    store.$subscribe(function () { checkMount(); });

    function checkMount(forceUpdate) {
      var mount = document.querySelector(".rank-tree-mount");
      if (!mount) { lastCult = null; return; }
      var cn = store.cult ? store.cult.name : "";
      var cl = store.clan ? store.clan.name : "";
      var rn = store.rank ? store.rank.name : "";
      var el = "";
      try { el = Array.from(store.eligibleRanks).map(function(r){return r.name;}).sort().join(","); } catch(e){}
      if (forceUpdate || cn !== lastCult || cl !== lastClan || rn !== lastRank || el !== lastEligible) {
        lastCult = cn; lastClan = cl; lastRank = rn; lastEligible = el;
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

      // Sort children: fewer descendants first (smaller branches on top)
      function descendantCount(r, seen) {
        seen = seen || {};
        if (seen[r.name]) return 0;
        seen[r.name] = true;
        var ch = childrenOf[r.name] || [];
        return ch.reduce(function (n, c) { return n + 1 + descendantCount(c, seen); }, 0);
      }
      for (var k in childrenOf) {
        childrenOf[k].sort(function (a, b) {
          return descendantCount(a) - descendantCount(b);
        });
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
            // Sort items: those with extra children (beyond the convergence target) come first
            // so they appear at the top and their extra connections are short
            var convName = g.convergence ? g.convergence.name : null;
            g.items.sort(function (a, b) {
              var aExtra = (childrenOf[a.name] || []).filter(function (c) {
                return c.name !== convName && !visited[c.name];
              }).length;
              var bExtra = (childrenOf[b.name] || []).filter(function (c) {
                return c.name !== convName && !visited[c.name];
              }).length;
              return bExtra - aExtra;
            });

            var groupRows = [];
            var extraPlaced = {};
            g.items.forEach(function (item) {
              if (!visited[item.name]) {
                visited[item.name] = true;
                posOf[item.name] = { col: item.hierarchyLevel - 1, row: nextRow };
                groupRows.push(nextRow);
                nextRow++;

                // Place leaf extra children inline right after their parent
                (childrenOf[item.name] || []).forEach(function (child) {
                  if (child.name === convName) return;
                  if (visited[child.name] || extraPlaced[child.name]) return;
                  // Only leaves (no own children): non-leaves handled by normal assign
                  if (childrenOf[child.name] && childrenOf[child.name].length > 0) return;
                  extraPlaced[child.name] = true;
                  visited[child.name] = true;
                  posOf[child.name] = { col: child.hierarchyLevel - 1, row: nextRow };
                  nextRow++;
                });
              }
            });

            // Process convergence target
            if (g.convergence && !visited[g.convergence.name]) {
              assign(g.convergence);
              // Shift convergence + descendants to center of group items
              if (groupRows.length > 0) {
                var center = (groupRows[0] + groupRows[groupRows.length - 1]) / 2;
                var convRow = posOf[g.convergence.name] ? posOf[g.convergence.name].row : center;
                var shift = center - convRow;
                if (Math.abs(shift) > 0.01) shiftSubtree(g.convergence, shift);
              }
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
        var col = normalMaxCol + 1;
        r.parentRanks.forEach(function (p) {
          if (outsideNames[p.name] && posOf[p.name]) {
            col = Math.max(col, posOf[p.name].col + 1);
          }
        });
        posOf[r.name] = { col: col, row: outsideRow };
        outsideRow++;
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
          // Skip outside/level-0 parents to avoid backwards right-to-left connections
          if (p.isOutsideHierarchy || p.hierarchyLevel <= 0) return;
          if (posOf[r.name] && posOf[p.name])
            connections.push({ from: posOf[p.name], to: posOf[r.name] });
        });
      });
      // Connections for outside/level-0 ranks (only left-to-right)
      ranks.forEach(function (r) {
        if (!r.isOutsideHierarchy && r.hierarchyLevel > 0) return;
        r.parentRanks.forEach(function (p) {
          if (posOf[r.name] && posOf[p.name] && posOf[p.name].col <= posOf[r.name].col)
            connections.push({ from: posOf[p.name], to: posOf[r.name] });
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

        layout.connections.forEach(function (conn) {
          var fromEl = badgeEls[conn.from.name || ""];
          var toEl = badgeEls[conn.to.name || ""];
          // Use node data from layout for position computation
          var fromNode = layout.nodes.find(function (n) { return n.col === conn.from.col && n.row === conn.from.row; });
          var toNode = layout.nodes.find(function (n) { return n.col === conn.to.col && n.row === conn.to.row; });

          if (fromNode) fromEl = badgeEls[fromNode.rank.name];
          if (toNode) toEl = badgeEls[toNode.rank.name];

          if (!fromEl || !toEl) return;

          var fr = fromEl.getBoundingClientRect();
          var tr = toEl.getBoundingClientRect();
          var cr = container.getBoundingClientRect();

          var x1 = fr.right - cr.left;
          var y1 = fr.top + fr.height / 2 - cr.top;
          var x2 = tr.left - cr.left;
          var y2 = tr.top + tr.height / 2 - cr.top;

          var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          var mid = x1 + (x2 - x1) * 0.45;
          path.setAttribute("d", "M" + x1 + "," + y1 + " H" + mid + " V" + y2 + " H" + x2);
          path.setAttribute("fill", "none");
          path.setAttribute("stroke", LINE_COLOR);
          path.setAttribute("stroke-width", LINE_WIDTH);
          path.setAttribute("stroke-linejoin", "round");
          svg.appendChild(path);
        });

        container.insertBefore(svg, container.firstChild);
        container.style.width = container.scrollWidth + "px";
        container.style.height = container.scrollHeight + "px";
      });
    }

    function makeBadge(rank, col, row, eligibleNames) {
      var isEligible = !!eligibleNames[rank.name];
      var isSelected = store.rank && rank.name === store.rank.name;

      var div = document.createElement("div");
      div.className = "rank-badge" +
        (isSelected ? " selected" : isEligible ? " eligible" : " disabled");
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
        if (isEligible) store.setRank(rank);
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
      if (!desc || desc === "ranks." + rank.name + "Description") {
        tip.classList.remove("show");
        return;
      }

      tip.classList.remove("show");
      tip.innerHTML = desc;

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
