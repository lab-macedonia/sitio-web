(function () {
  'use strict';
  document.querySelectorAll('[data-catalog]').forEach(function (catalog) {
    var input = catalog.querySelector('[data-filter-text]');
    var selects = Array.from(catalog.querySelectorAll('[data-filter-field]'));
    var records = Array.from(catalog.querySelectorAll('[data-record]'));
    var status = catalog.querySelector('[data-count]');
    if (!records.length) return;
    function plain(s) {return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();}
    function update() {
      var query = plain(input ? input.value.trim() : '');
      var visible = 0;
      records.forEach(function (record) {
        var ok = !query || plain(record.textContent).includes(query);
        selects.forEach(function (select) {
          var field = select.getAttribute('data-filter-field');
          if (select.value && record.getAttribute('data-' + field) !== select.value) ok = false;
        });
        record.hidden = !ok;
        if (ok) visible += 1;
      });
      if (status) status.textContent = visible + ' de ' + records.length + ' registros';
    }
    if (input) input.addEventListener('input', update);
    selects.forEach(function (el) {el.addEventListener('change', update);});
    update();
  });
})();
