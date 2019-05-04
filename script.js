let ignoreFields = [ 'created', 'edited', 'films', 'residents', 'url' ],
    sortField    = 'name';

$(function() {
  $('.loading-mask').show(); // Show mask before request
  $.ajax({
    dataType: 'json',
    url: 'https://swapi.co/api/vehicles/',
    cache: true,
    success: function(data) {
      populateTable(data.results);
      $('.loading-mask').hide(); // Hide mask after response
    },
    failure: function(data) {
      $('.loading-mask').hide(); // Hide mask after response
    }
  });
  $('#myInput').on('keyup', onFilter);
});

function populateTable(data) {
  data.sort((a, b) => {
    return a[sortField].toLowerCase().localeCompare(b[sortField].toLowerCase());
  });

  var fields = Object.keys(data[0]).sort((a, b) => {
    if (a === sortField) return -1;
    if (b === sortField) return 1;
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }).filter(x => ignoreFields.indexOf(x) === -1);

  $('#myTable')
    .append($('<thead>')
      .append($('<tr>')
        .append(fields.map(field => $('<th>').addClass('text-center').text(field)))))
    .append($('<tbody>')
      .append(data.map(result => $('<tr>')
        .append(fields.map(field => $('<td>').text(result[field]))))));
}

function onFilter(e) {
  let value = $(this).val().toLowerCase();
  $('#myTable tbody tr').filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
}
