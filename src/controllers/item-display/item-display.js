(function itemDisplayController(window) {
  'use strict';

  var $dom;

  var defaultConfig = {
    enabled: 'true',
  };

  var config;

  /**
   * Initialize class ItemDisplay
   */
  var ItemDisplay = function ItemDisplay() {
    this.items = [];
  };

  /**
   * Initializes class. (dom elements and config options)
   */
  ItemDisplay.prototype.init = function init() {
    $dom = {
      table  : document.querySelector('.table'),
      config : document.querySelector('.config'),
      sortBtn: document.querySelector('.sortbtn'),
    };
    config = window.utils.loadConfig($dom.config, defaultConfig);

    if ($dom.sortBtn) {
      $dom.sortBtn.addEventListener('click', this.sortTableHandler);
    }
  };

  /**
   * Renders items in table
   */
  ItemDisplay.prototype.renderItems = function renderItems() {
    var items = this.items || [];
    var i;
    var item;
    var n = items.length;
    var $tBody = document.createElement('tbody');

    for (i = 0; i < n; i++) {
      item = items[i];
      $tBody.appendChild(this.renderItem(item, $tBody));
    }

    $dom.table.appendChild($tBody);
  };

  /**
   * Renders single item in table
   */
  ItemDisplay.prototype.renderItem = function renderItem(item) {
    var $tr = document.createElement('tr');

    Object.keys(item).forEach(function eachObject(key) {
      var $td = document.createElement('td');
      $td.className = key;
      $td.innerText = item[key];
      if (key === 'price') {
        $td.className += ' right';
        $td.innerText = window.utils.formatPrice(item[key]);
      }
      $tr.append($td);
    });

    return $tr;
  };

  /**
   * Sort table by id on click of button
   */
  ItemDisplay.prototype.sortTableHandler = function sortTableHandler() {
    sortTable(1, 0);
  };

  function sortTable(col, order) {
    var $tBody = $dom.table.tBodies[0];
    var rows = Array.prototype.slice.call($tBody.rows, 0);
    var i;
    var reverse = -((+order) || -1);

    rows = rows.sort(function sortRows(row1, row2) {
      return reverse * (
        row1.cells[col].textContent.trim().localeCompare(row2.cells[col].textContent.trim())
      );
    });

    for (i = 0; i < rows.length; i++) {
      $tBody.appendChild(rows[i]);
    }
  }

  /**
   * Method to load items with ajax call
   */
  ItemDisplay.prototype.load = function load() {
    var _this = this;
    window.requestData({
      url     : '/data/itemdata.json',
      callback: function onRequestComplete(data) {
        if (data) {
          _this.items = data;
          _this.renderItems();
        }
      },
    });
  };

  function run() {
    var itemDisplay = new ItemDisplay();
    itemDisplay.init();
    if (config.enabled === 'true') {
      itemDisplay.load();
    }
  }

  run();

  /** Export class */
  window.ItemDisplay = ItemDisplay;
}(window));
