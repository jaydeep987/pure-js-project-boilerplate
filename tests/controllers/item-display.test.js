/* global ItemDisplay */

describe('Test: ItemDisplay', function testCalc() {
  'use strict';

  var $table;
  var $sortBtn;
  var items = [
    {
      id   : 12,
      name : 'something',
      price: 12323,
    },
    {
      id   : 1452,
      name : 'event is going on',
      price: 9987,
    },
    {
      id   : 1,
      name : 'first',
      price: 9000,
    },
  ];
  var stubedLoad;

  function load() {
    this.items = items;
  }

  before(function before() {
    stubedLoad = sinon.stub(ItemDisplay.prototype, 'load').callsFake(load);
  });

  after(function after() {
    stubedLoad.restore();
  });

  beforeEach(function beforeEach() {
    $table = document.createElement('table');
    $sortBtn = document.createElement('button');
    $table.className = 'table';
    $sortBtn.className = 'sortbtn';
    document.body.insertAdjacentElement('afterbegin', $sortBtn);
    document.body.insertAdjacentElement('afterbegin', $table);
  });

  afterEach(function afterEach() {
    document.body.removeChild($table);
    document.body.removeChild($sortBtn);
  });

  it('should load given items', function shouldAddNumber() {
    var itemDisplay = new ItemDisplay();
    itemDisplay.init();
    itemDisplay.load();
    expect(itemDisplay.items).to.equal(items);
  });

  it('should render items in $table', function shouldRenderItems() {
    var itemDisplay = new ItemDisplay();
    itemDisplay.init();
    itemDisplay.load();

    expect($table.querySelectorAll('tr').length).to.equal(0);
    itemDisplay.renderItems();
    expect($table.querySelectorAll('tr').length).to.equal(items.length);
  });

  it('should render single item in $table', function shouldRenderItem() {
    var itemDisplay = new ItemDisplay();
    var item = {
      id   : 999,
      name : 'extra event',
      price: 99999,
    };
    itemDisplay.init();
    itemDisplay.load();

    itemDisplay.renderItems();
    expect($table.querySelectorAll('tr').length).to.equal(items.length);

    $table.querySelector('tbody').appendChild(itemDisplay.renderItem(item));
    expect($table.querySelectorAll('tr').length).to.equal(items.length + 1);
  });

  it('should load items from fake-api', function shouldLoadItemsFromFakeApi() {
    var server = sinon.createFakeServer();
    var itemDisplay;
    var fakeData = [{
      id   : 999,
      name : 'extra event',
      price: 99999,
    }];

    stubedLoad.restore();
    itemDisplay = new ItemDisplay();
    itemDisplay.init();

    server.respondWith(new RegExp('/data/itemdata.json'), function res(xhr) {
      xhr.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fakeData));
    });

    itemDisplay.load();

    server.respond();

    try {
      expect(JSON.stringify(itemDisplay.items)).to.equal(JSON.stringify(fakeData));
    } finally {
      server.restore();
      stubedLoad = sinon.stub(ItemDisplay.prototype, 'load').callsFake(load);
    }
  });

  it('should call event on sortbtn click', function shouldCallSortBtn() {
    var stub = sinon.stub(ItemDisplay.prototype, 'sortTableHandler');
    var itemDisplay = new ItemDisplay();
    itemDisplay.init();
    $sortBtn.click();

    try {
      assert(stub.called);
    } finally {
      stub.restore();
    }
  });

  it('should sort table by first column on button click', function shouldSortTable() {
    var itemDisplay = new ItemDisplay();
    // sort items by id
    var sortedItems = items.sort(function sortItems(item1, item2) {
      return String(item1.name).trim().localeCompare(String(item2.name).trim());
    });
    // construct rows
    var rows = sortedItems.map(function eachItems(item) {
      var $tr = document.createElement('tr');
      Object.keys(item).forEach(function iterateItem(key) {
        var $td = document.createElement('td');
        $td.className = key;
        $td.textContent = item[key];
        if (key === 'price') {
          $td.className += ' right';
          $td.innerText = window.utils.formatPrice(item[key]);
        }
        $tr.appendChild($td);
      });

      return $tr.outerHTML;
    });

    itemDisplay.init();
    itemDisplay.load();
    itemDisplay.renderItems();

    $sortBtn.click();

    expect($table.tBodies[0].innerHTML).to.equal(rows.join(''));
  });
});
