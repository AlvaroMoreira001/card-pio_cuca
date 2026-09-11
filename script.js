(function () {
  "use strict";

  // ── dados do cardápio ────────────────────────────────────────────────
  // Número do WhatsApp vem de config.js (gerado a partir da variável de
  // ambiente WHATSAPP_NUMBER no build). Veja README.md / .env.example.
  var WHATSAPP_NUMBER = (window.APP_CONFIG && window.APP_CONFIG.whatsappNumber) || "5511999999999";

  var MENU = {
    espetos: { label: "Espetos", title: "Espetos na brasa", addons: [
        { label: "Pão de alho", price: 3 }, { label: "Farofa da casa", price: 2 },
        { label: "Vinagrete", price: 2 }, { label: "Molho de pimenta", price: 2 }],
      items: [
        { id: "esp-pao-alho", name: "Espeto Pão de Alho", price: 9, desc: "Pão artesanal no alho e manteiga, tostado na brasa até dourar.", badge: "Mais pedido" },
        { id: "esp-queijo", name: "Espeto Queijo Coalho", price: 9, desc: "Queijo coalho grelhado, com melado de cana à parte." },
        { id: "esp-frango", name: "Espeto de Frango", price: 9, desc: "Peito de frango temperado na hora, macio e suculento." },
        { id: "esp-frango-bacon", name: "Espeto de Frango com Bacon", price: 11, desc: "Frango enrolado em fatias de bacon crocante." },
        { id: "esp-carne", name: "Espeto de Carne", price: 11, desc: "Cubos de alcatra no sal grosso, ponto ao seu gosto." },
        { id: "esp-carne-bacon", name: "Espeto de Carne com Bacon", price: 13, desc: "Alcatra e bacon alternados no mesmo espeto." },
        { id: "esp-linguica", name: "Espeto de Linguiça", price: 9, desc: "Linguiça toscana artesanal, assada devagar." },
        { id: "esp-coracao", name: "Espeto de Coração", price: 12, desc: "Coração de frango no sal e alho, do jeito tradicional." },
        { id: "esp-panceta", name: "Espeto de Panceta", price: 12, desc: "Panceta suína em cubos, pele crocante." },
        { id: "esp-medalhao", name: "Espeto Medalhão de Frango", price: 13, desc: "Frango envolto em bacon com queijo derretido no meio." },
        { id: "esp-romeu", name: "Espeto Romeu e Julieta", price: 15, desc: "Bacon, goiabada e queijo — o doce e salgado da casa.", badge: "Da casa" },
        { id: "esp-picanha", name: "Espeto de Picanha", price: 18, desc: "Picanha em cubos com a gordura no ponto certo." }
      ] },
    lanches: { label: "Lanches", title: "Lanches na chapa", addons: [
        { label: "Bacon extra", price: 4 }, { label: "Ovo", price: 2 },
        { label: "Cheddar", price: 3 }, { label: "Catupiry", price: 4 }],
      items: [
        { id: "lan-x-burguer", name: "X-Burguer", price: 12.5, desc: "Pão, hambúrguer 120g, queijo e maionese da casa." },
        { id: "lan-x-salada", name: "X-Salada", price: 15.9, desc: "Hambúrguer, queijo, alface, tomate e milho." },
        { id: "lan-x-frango", name: "X-Frango", price: 18.5, desc: "Filé de frango grelhado, queijo e salada." },
        { id: "lan-x-bacon", name: "X-Bacon", price: 18.9, desc: "Hambúrguer, queijo e bacon crocante em fatias." },
        { id: "lan-x-calabresa", name: "X-Calabresa", price: 19.9, desc: "Calabresa acebolada, queijo e maionese verde." },
        { id: "lan-x-tudo", name: "X-Tudo", price: 24.9, desc: "Hambúrguer, frango, bacon, ovo, presunto, queijo e salada.", badge: "Mais pedido" },
        { id: "lan-cuca-duplo", name: "Cuca Duplo", price: 29.9, desc: "Dois hambúrgueres 120g, cheddar duplo e cebola caramelizada." },
        { id: "lan-cuca-especial", name: "Cuca Especial", price: 35.9, desc: "Costela desfiada, queijo coalho, vinagrete e farofa no pão brioche." }
      ] },
    porcoes: { label: "Porções", title: "Porções pra dividir", addons: [
        { label: "Cheddar por cima", price: 5 }, { label: "Bacon em cubos", price: 5 },
        { label: "Molho da casa extra", price: 3 }],
      items: [
        { id: "por-mandioca", name: "Mandioca Frita", price: 20, desc: "Mandioca cozida e frita na hora, crocante por fora." },
        { id: "por-fritas", name: "Batata Frita", price: 22, desc: "Porção generosa com sal e alecrim." },
        { id: "por-torresmo", name: "Torresmo de Rolo", price: 26, desc: "Fatiado grosso, servido com limão." },
        { id: "por-calabresa", name: "Calabresa Acebolada", price: 28, desc: "Calabresa em rodelas com cebola e pão de alho." },
        { id: "por-fritas-cheddar", name: "Fritas com Cheddar e Bacon", price: 32, desc: "Batata, cheddar cremoso e bacon picado.", badge: "Pra dividir" },
        { id: "por-passarinho", name: "Frango a Passarinho", price: 35, desc: "Frango frito com alho torrado e cheiro-verde." }
      ] },
    refrigerantes: { label: "Refrigerantes", title: "Refrigerantes e sucos", addons: [],
      items: [
        { id: "ref-agua", name: "Água Mineral 500ml", price: 3.5, desc: "Com ou sem gás." },
        { id: "ref-guarana-lata", name: "Guaraná Lata 350ml", price: 5.5, desc: "Geladíssimo." },
        { id: "ref-coca-lata", name: "Coca-Cola Lata 350ml", price: 6, desc: "Geladíssima." },
        { id: "ref-suco", name: "Suco de Lata 335ml", price: 6, desc: "Uva, laranja ou maracujá." },
        { id: "ref-guarana-2l", name: "Guaraná 2L", price: 12, desc: "Pra mesa toda." },
        { id: "ref-coca-2l", name: "Coca-Cola 2L", price: 14, desc: "Pra mesa toda." }
      ] },
    cervejas: { label: "Cervejas", title: "Cervejas geladas", addons: [],
      items: [
        { id: "cer-skol", name: "Skol Lata 350ml", price: 5.5, desc: "Servida no gelo." },
        { id: "cer-brahma", name: "Brahma Lata 350ml", price: 6, desc: "Servida no gelo." },
        { id: "cer-bud", name: "Budweiser Long Neck", price: 9, desc: "330ml." },
        { id: "cer-heineken", name: "Heineken Long Neck", price: 10, desc: "330ml." },
        { id: "cer-original", name: "Original 600ml", price: 14, desc: "Garrafa gelada, copo por conta da casa." }
      ] }
  };

  var BAIRROS = [
    { name: "Centro", fee: 3 }, { name: "Vila Nova", fee: 4 },
    { name: "Jardim América", fee: 5 }, { name: "Santa Rita", fee: 6 },
    { name: "Parque Industrial", fee: 8 }
  ];
  var PAYMENTS = ["Pix", "Dinheiro", "Cartão de débito", "Cartão de crédito"];

  var brl = function (n) { return "R$ " + n.toFixed(2).replace(".", ","); };

  // ── estado ───────────────────────────────────────────────────────────
  var state = {
    cat: "espetos",
    query: "",
    modalId: null,
    modalQty: 1,
    modalAddons: {},
    modalNote: "",
    cart: [], // { uid, id, name, unit, qty, addons: [label], note }
    mode: "entrega",
    bairro: "Centro",
    payment: "Pix",
    customer: "",
    address: ""
  };

  var lastFocusedBeforeItemDialog = null;
  var lastFocusedBeforeCartDialog = null;

  function allItems() {
    var out = [];
    Object.keys(MENU).forEach(function (k) {
      MENU[k].items.forEach(function (i) {
        var copy = {};
        for (var key in i) copy[key] = i[key];
        copy.cat = k;
        out.push(copy);
      });
    });
    return out;
  }
  function findItem(id) {
    var found = null;
    allItems().forEach(function (i) { if (i.id === id) found = i; });
    return found;
  }

  function modalUnit() {
    var it = findItem(state.modalId);
    if (!it) return 0;
    var adds = MENU[it.cat].addons.filter(function (a) { return state.modalAddons[a.label]; });
    var total = it.price;
    adds.forEach(function (a) { total += a.price; });
    return total;
  }

  function fee() {
    if (state.mode !== "entrega") return 0;
    var b = null;
    BAIRROS.forEach(function (x) { if (x.name === state.bairro) b = x; });
    return b ? b.fee : 0;
  }
  function subtotal() {
    return state.cart.reduce(function (s, l) { return s + l.unit * l.qty; }, 0);
  }

  function announce(msg) {
    var el = document.getElementById("sr-announcer");
    el.textContent = "";
    // força o leitor de tela a reler mesmo com o mesmo texto anterior
    window.setTimeout(function () { el.textContent = msg; }, 30);
  }

  // ── elementos ────────────────────────────────────────────────────────
  var els = {
    openStatus: document.getElementById("open-status"),
    tabs: document.getElementById("category-tabs"),
    searchInput: document.getElementById("search-input"),
    sectionTitle: document.getElementById("section-title"),
    menuList: document.getElementById("menu-list"),
    noResults: document.getElementById("no-results"),

    cartBtnLabel: document.getElementById("cart-btn-label"),
    openCartHeader: document.getElementById("open-cart-header"),
    openCartBar: document.getElementById("open-cart-bar"),
    cartBar: document.getElementById("cart-bar"),
    cartBarCount: document.getElementById("cart-bar-count"),
    cartBarTotal: document.getElementById("cart-bar-total"),

    itemBackdrop: document.getElementById("item-dialog-backdrop"),
    itemDialog: document.getElementById("item-dialog"),
    itemClose: document.getElementById("item-dialog-close"),
    itemTitle: document.getElementById("item-dialog-title"),
    itemDesc: document.getElementById("item-dialog-desc"),
    itemPrice: document.getElementById("item-dialog-price"),
    addonsFieldset: document.getElementById("item-addons-fieldset"),
    addonsList: document.getElementById("item-addons-list"),
    itemClosedNotice: document.getElementById("item-closed-notice"),
    itemNote: document.getElementById("item-note"),
    itemQtyDec: document.getElementById("item-qty-dec"),
    itemQtyInc: document.getElementById("item-qty-inc"),
    itemQty: document.getElementById("item-qty"),
    itemAddToCart: document.getElementById("item-add-to-cart"),
    itemTotalLabel: document.getElementById("item-total-label"),

    cartBackdrop: document.getElementById("cart-dialog-backdrop"),
    cartDialog: document.getElementById("cart-dialog"),
    cartClose: document.getElementById("cart-dialog-close"),
    cartClosedNotice: document.getElementById("cart-closed-notice"),
    cartEmpty: document.getElementById("cart-empty"),
    cartLines: document.getElementById("cart-lines"),
    cartDetails: document.getElementById("cart-details"),
    modeEntrega: document.getElementById("mode-entrega"),
    modeRetirada: document.getElementById("mode-retirada"),
    deliveryFields: document.getElementById("delivery-fields"),
    bairroSelect: document.getElementById("bairro-select"),
    addressInput: document.getElementById("address-input"),
    customerInput: document.getElementById("customer-input"),
    customerError: document.getElementById("customer-error"),
    paymentOptions: document.getElementById("payment-options"),
    subtotalValue: document.getElementById("subtotal-value"),
    feeLabel: document.getElementById("fee-label"),
    feeValue: document.getElementById("fee-value"),
    cartFooter: document.getElementById("cart-dialog-footer"),
    totalValue: document.getElementById("total-value"),
    whatsappLink: document.getElementById("whatsapp-link")
  };

  // ── status aberto/fechado ────────────────────────────────────────────
  function storeIsOpen() {
    var h = new Date().getHours();
    return h >= 10 || h < 1;
  }

  function renderStatus() {
    var open = storeIsOpen();
    els.openStatus.className = "tag status-tag " + (open ? "tag-accent" : "tag-neutral");
    els.openStatus.innerHTML = open
      ? "<span class=\"dot\" aria-hidden=\"true\"></span>Aberto agora"
      : "Fechado · abre 18h";
  }

  // ── abas de categoria ────────────────────────────────────────────────
  function renderTabs() {
    els.tabs.innerHTML = "";
    Object.keys(MENU).forEach(function (key, index) {
      var cat = MENU[key];
      var selected = key === state.cat && !state.query;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab-btn";
      btn.id = "tab-" + key;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", selected ? "true" : "false");
      btn.setAttribute("aria-controls", "menu-list");
      btn.tabIndex = selected ? 0 : -1;
      btn.textContent = cat.label;
      btn.addEventListener("click", function () {
        state.cat = key;
        state.query = "";
        els.searchInput.value = "";
        renderTabs();
        renderMenu();
        focusTab(key);
      });
      btn.addEventListener("keydown", function (e) {
        var keys = Object.keys(MENU);
        var i = keys.indexOf(key);
        var nextKey = null;
        if (e.key === "ArrowRight") nextKey = keys[(i + 1) % keys.length];
        else if (e.key === "ArrowLeft") nextKey = keys[(i - 1 + keys.length) % keys.length];
        else if (e.key === "Home") nextKey = keys[0];
        else if (e.key === "End") nextKey = keys[keys.length - 1];
        if (nextKey) {
          e.preventDefault();
          state.cat = nextKey;
          state.query = "";
          els.searchInput.value = "";
          renderTabs();
          renderMenu();
          focusTab(nextKey);
        }
      });
      els.tabs.appendChild(btn);
    });
  }
  function focusTab(key) {
    var el = document.getElementById("tab-" + key);
    if (el) el.focus();
  }

  // ── busca ────────────────────────────────────────────────────────────
  els.searchInput.addEventListener("input", function (e) {
    state.query = e.target.value;
    renderTabs();
    renderMenu();
  });

  // ── lista de itens ───────────────────────────────────────────────────
  function renderMenu() {
    var q = state.query.trim().toLowerCase();
    var cat = MENU[state.cat];
    var source;
    if (q) {
      source = allItems().filter(function (i) {
        return (i.name + " " + i.desc).toLowerCase().indexOf(q) !== -1;
      });
    } else {
      source = cat.items.map(function (i) {
        var copy = {};
        for (var key in i) copy[key] = i[key];
        copy.cat = state.cat;
        return copy;
      });
    }

    els.sectionTitle.textContent = q ? "Resultados para “" + state.query + "”" : cat.title;
    els.noResults.hidden = source.length !== 0;
    els.menuList.innerHTML = "";

    source.forEach(function (item) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "menu-item";
      btn.setAttribute("aria-haspopup", "dialog");
      var priceText = brl(item.price);
      btn.setAttribute("aria-label", item.name + (item.badge ? ", " + item.badge : "") + ". " + item.desc + " " + priceText);

      var info = document.createElement("span");
      info.className = "menu-item-info";

      var nameRow = document.createElement("span");
      nameRow.className = "menu-item-name-row";
      var nameEl = document.createElement("span");
      nameEl.className = "menu-item-name";
      nameEl.textContent = item.name;
      nameRow.appendChild(nameEl);
      if (item.badge) {
        var badge = document.createElement("span");
        badge.className = "tag tag-outline";
        badge.textContent = item.badge;
        nameRow.appendChild(badge);
      }
      info.appendChild(nameRow);

      var desc = document.createElement("span");
      desc.className = "menu-item-desc";
      desc.style.display = "block";
      desc.textContent = item.desc;
      info.appendChild(desc);

      var price = document.createElement("span");
      price.className = "menu-item-price";
      price.style.display = "block";
      price.textContent = priceText;
      info.appendChild(price);

      btn.appendChild(info);

      btn.addEventListener("click", function () { openItemDialog(item, btn); });
      li.appendChild(btn);
      els.menuList.appendChild(li);
    });
  }

  // ── modal de item ────────────────────────────────────────────────────
  function getFocusable(container) {
    return Array.prototype.slice.call(
      container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return el.offsetParent !== null; });
  }

  function trapFocus(container, e) {
    if (e.key !== "Tab") return;
    var focusable = getFocusable(container);
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function renderItemDialog() {
    var it = findItem(state.modalId);
    if (!it) return;
    var cat = MENU[it.cat];
    var open = storeIsOpen();

    els.itemTitle.textContent = it.name;
    els.itemDesc.textContent = it.desc;
    els.itemPrice.textContent = brl(it.price);
    els.itemQty.textContent = String(state.modalQty);
    els.itemTotalLabel.textContent = brl(modalUnit() * state.modalQty);

    els.itemClosedNotice.hidden = open;
    els.itemQtyDec.disabled = !open;
    els.itemQtyInc.disabled = !open;
    els.itemAddToCart.disabled = !open;
    els.itemNote.disabled = !open;

    if (cat.addons.length) {
      els.addonsFieldset.hidden = false;
      els.addonsList.innerHTML = "";
      cat.addons.forEach(function (a, idx) {
        var label = document.createElement("label");
        label.className = "addon-label";
        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = "addon-" + idx;
        input.checked = !!state.modalAddons[a.label];
        input.disabled = !open;
        input.addEventListener("change", function () {
          state.modalAddons[a.label] = input.checked;
          renderItemDialog();
        });
        var name = document.createElement("span");
        name.className = "addon-name";
        name.textContent = a.label;
        var price = document.createElement("span");
        price.className = "addon-price";
        price.textContent = "+ " + brl(a.price);
        label.appendChild(input);
        label.appendChild(name);
        label.appendChild(price);
        els.addonsList.appendChild(label);
      });
    } else {
      els.addonsFieldset.hidden = true;
      els.addonsList.innerHTML = "";
    }
  }

  function openItemDialog(item, triggerEl) {
    state.modalId = item.id;
    state.modalQty = 1;
    state.modalAddons = {};
    state.modalNote = "";
    els.itemNote.value = "";
    renderItemDialog();
    lastFocusedBeforeItemDialog = triggerEl || document.activeElement;
    els.itemBackdrop.hidden = false;
    els.itemDialog.scrollTop = 0;
    window.setTimeout(function () { els.itemClose.focus(); }, 0);
    document.addEventListener("keydown", onItemDialogKeydown);
  }
  function closeItemDialog() {
    els.itemBackdrop.hidden = true;
    state.modalId = null;
    document.removeEventListener("keydown", onItemDialogKeydown);
    if (lastFocusedBeforeItemDialog) lastFocusedBeforeItemDialog.focus();
  }
  function onItemDialogKeydown(e) {
    if (e.key === "Escape") { closeItemDialog(); return; }
    trapFocus(els.itemDialog, e);
  }

  els.itemClose.addEventListener("click", closeItemDialog);
  els.itemBackdrop.addEventListener("click", function (e) {
    if (e.target === els.itemBackdrop) closeItemDialog();
  });
  els.itemNote.addEventListener("input", function (e) { state.modalNote = e.target.value; });
  els.itemQtyDec.addEventListener("click", function () {
    state.modalQty = Math.max(1, state.modalQty - 1);
    renderItemDialog();
  });
  els.itemQtyInc.addEventListener("click", function () {
    state.modalQty += 1;
    renderItemDialog();
  });
  els.itemAddToCart.addEventListener("click", function () {
    var it = findItem(state.modalId);
    if (!it) return;
    var cat = MENU[it.cat];
    var adds = cat.addons.filter(function (a) { return state.modalAddons[a.label]; });
    var addonLabels = adds.map(function (a) { return a.label; });
    var line = {
      uid: it.id + "|" + addonLabels.join(",") + "|" + state.modalNote,
      id: it.id,
      name: it.name,
      unit: modalUnit(),
      qty: state.modalQty,
      addons: addonLabels,
      note: state.modalNote
    };
    var existing = null;
    state.cart.forEach(function (l) { if (l.uid === line.uid) existing = l; });
    if (existing) existing.qty += line.qty;
    else state.cart.push(line);

    closeItemDialog();
    announce(it.name + " adicionado ao pedido. Total: " + brl(subtotal() + fee()));
    renderCartTrigger();
    openCartDialog(document.activeElement);
  });

  // ── carrinho ─────────────────────────────────────────────────────────
  function bump(uid, delta) {
    state.cart = state.cart
      .map(function (l) { return l.uid === uid ? Object.assign({}, l, { qty: l.qty + delta }) : l; })
      .filter(function (l) { return l.qty > 0; });
    renderCartDialog();
    renderCartTrigger();
  }

  function renderCartTrigger() {
    var count = state.cart.reduce(function (a, l) { return a + l.qty; }, 0);
    els.cartBtnLabel.textContent = count > 0 ? String(count) + " no pedido" : "Pedido";
    els.openCartHeader.setAttribute("aria-label", count > 0 ? "Ver pedido, " + count + " itens, " + brl(subtotal() + fee()) : "Ver pedido, carrinho vazio");

    if (count > 0) {
      els.cartBar.hidden = false;
      els.cartBarCount.textContent = String(count);
      els.cartBarTotal.textContent = brl(subtotal() + fee());
      els.openCartBar.setAttribute("aria-label", "Ver meu pedido, " + count + " itens, total " + brl(subtotal() + fee()));
    } else {
      els.cartBar.hidden = true;
    }
  }

  function buildWhatsappHref() {
    var lines = state.cart.map(function (l) {
      var t = "• " + l.qty + "x " + l.name + " — " + brl(l.unit * l.qty);
      if (l.addons.length) t += "\n   + " + l.addons.join(", ");
      if (l.note) t += "\n   obs: " + l.note;
      return t;
    });
    var bodyParts = ["*Pedido — Cuca Espetinhos*", "", lines.join("\n"), "",
      "Subtotal: " + brl(subtotal()),
      state.mode === "entrega" ? "Entrega (" + state.bairro + "): " + brl(fee()) : "Retirada no balcão",
      "*Total: " + brl(subtotal() + fee()) + "*", "",
      "Nome: " + (state.customer || "—"),
      state.mode === "entrega" ? "Endereço: " + (state.address || "—") : "",
      "Pagamento: " + state.payment];
    var body = bodyParts.filter(Boolean).join("\n");
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(body);
  }

  function renderCartDialog() {
    var hasCart = state.cart.length > 0;
    var open = storeIsOpen();
    els.cartClosedNotice.hidden = open;
    els.cartEmpty.hidden = hasCart;
    els.cartDetails.hidden = !hasCart;
    els.cartFooter.hidden = !hasCart;

    els.cartLines.innerHTML = "";
    state.cart.forEach(function (line) {
      var li = document.createElement("li");
      li.className = "cart-line";

      var left = document.createElement("div");
      var name = document.createElement("div");
      name.className = "cart-line-name";
      name.textContent = line.qty + "x " + line.name;
      left.appendChild(name);

      var extrasText = [line.addons.join(", "), line.note].filter(Boolean).join(" · ");
      if (extrasText) {
        var extras = document.createElement("div");
        extras.className = "cart-line-extras";
        extras.textContent = extrasText;
        left.appendChild(extras);
      }

      var stepper = document.createElement("div");
      stepper.className = "cart-line-stepper";
      var dec = document.createElement("button");
      dec.type = "button";
      dec.className = "btn";
      dec.textContent = "−";
      dec.setAttribute("aria-label", "Diminuir quantidade de " + line.name);
      dec.addEventListener("click", function () { bump(line.uid, -1); });
      var qty = document.createElement("span");
      qty.textContent = String(line.qty);
      var inc = document.createElement("button");
      inc.type = "button";
      inc.className = "btn";
      inc.textContent = "+";
      inc.setAttribute("aria-label", "Aumentar quantidade de " + line.name);
      inc.addEventListener("click", function () { bump(line.uid, 1); });
      stepper.appendChild(dec);
      stepper.appendChild(qty);
      stepper.appendChild(inc);
      left.appendChild(stepper);

      var total = document.createElement("div");
      total.className = "cart-line-total";
      total.textContent = brl(line.unit * line.qty);

      li.appendChild(left);
      li.appendChild(total);
      els.cartLines.appendChild(li);
    });

    els.subtotalValue.textContent = brl(subtotal());
    els.feeLabel.textContent = state.mode === "entrega" ? "Taxa de entrega · " + state.bairro : "Retirada no balcão";
    els.feeValue.textContent = state.mode === "entrega" ? brl(fee()) : "Grátis";
    els.totalValue.textContent = brl(subtotal() + fee());
    els.whatsappLink.href = buildWhatsappHref();
    if (open) {
      els.whatsappLink.removeAttribute("aria-disabled");
      els.whatsappLink.classList.remove("is-disabled");
    } else {
      els.whatsappLink.setAttribute("aria-disabled", "true");
      els.whatsappLink.classList.add("is-disabled");
    }

    els.deliveryFields.hidden = state.mode !== "entrega";
  }

  function initCartStaticFields() {
    els.bairroSelect.innerHTML = "";
    BAIRROS.forEach(function (b) {
      var opt = document.createElement("option");
      opt.value = b.name;
      opt.textContent = b.name + " — " + brl(b.fee);
      if (b.name === state.bairro) opt.selected = true;
      els.bairroSelect.appendChild(opt);
    });

    els.paymentOptions.innerHTML = "";
    PAYMENTS.forEach(function (p, idx) {
      var label = document.createElement("label");
      label.className = "radio";
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "payment";
      input.value = p;
      input.id = "payment-" + idx;
      input.checked = state.payment === p;
      input.addEventListener("change", function () {
        state.payment = p;
        renderCartDialog();
      });
      label.appendChild(input);
      var text = document.createElement("span");
      text.textContent = p;
      label.appendChild(text);
      els.paymentOptions.appendChild(label);
    });
  }

  els.modeEntrega.addEventListener("change", function () { state.mode = "entrega"; renderCartDialog(); });
  els.modeRetirada.addEventListener("change", function () { state.mode = "retirada"; renderCartDialog(); });
  els.bairroSelect.addEventListener("change", function (e) { state.bairro = e.target.value; renderCartDialog(); });
  els.addressInput.addEventListener("input", function (e) { state.address = e.target.value; });
  els.customerInput.addEventListener("input", function (e) {
    state.customer = e.target.value;
    if (e.target.value.trim()) {
      els.customerInput.removeAttribute("aria-invalid");
      els.customerError.hidden = true;
    }
  });

  els.whatsappLink.addEventListener("click", function (e) {
    if (!storeIsOpen()) {
      e.preventDefault();
      announce("A loja está fechada agora. Não é possível enviar pedidos.");
      return;
    }
    if (!state.customer.trim()) {
      e.preventDefault();
      els.customerInput.setAttribute("aria-invalid", "true");
      els.customerError.hidden = false;
      els.customerInput.focus();
      announce("Informe seu nome para continuar.");
    }
  });

  function openCartDialog(triggerEl) {
    renderCartDialog();
    lastFocusedBeforeCartDialog = triggerEl || document.activeElement;
    els.cartBackdrop.hidden = false;
    window.setTimeout(function () { els.cartClose.focus(); }, 0);
    document.addEventListener("keydown", onCartDialogKeydown);
  }
  function closeCartDialog() {
    els.cartBackdrop.hidden = true;
    document.removeEventListener("keydown", onCartDialogKeydown);
    if (lastFocusedBeforeCartDialog) lastFocusedBeforeCartDialog.focus();
  }
  function onCartDialogKeydown(e) {
    if (e.key === "Escape") { closeCartDialog(); return; }
    trapFocus(els.cartDialog, e);
  }

  els.cartClose.addEventListener("click", closeCartDialog);
  els.cartBackdrop.addEventListener("click", function (e) {
    if (e.target === els.cartBackdrop) closeCartDialog();
  });
  els.openCartHeader.addEventListener("click", function () { openCartDialog(els.openCartHeader); });
  els.openCartBar.addEventListener("click", function () { openCartDialog(els.openCartBar); });

  // ── inicialização ────────────────────────────────────────────────────
  renderStatus();
  renderTabs();
  renderMenu();
  initCartStaticFields();
  renderCartTrigger();
  renderCartDialog();
})();
