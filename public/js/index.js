$(function() {
  const render = function(dataList) {
    $('#kudos').empty();
    for (let i = 0; i < dataList.length; i++) {
      console.log(dataList[i]);
      $('#kudos').append(
        `<div class="card">
          <p>${dataList[i].title}</p>
          <p>From: ${dataList[i].from[0].name}</p>
          <div class="body">
            <p>To: ${dataList[i].to[0].name}</p>
            <p>${dataList[i].body}</p>
          </div>
        </div>`
      );
    }
  };

  const getKudos = function() {
    $.get('/api/kudos').then(function(data) {
      render(data);
    });
  };

  const getUsers = function() {
    $.get('/api/user').then(function(dataList) {
      for (let i = 0; i < dataList.length; i++) {
        console.log('user: ', dataList[i].name);
        $('#kudo-from').append(
          `<option value="${dataList[i]._id}">${dataList[i].name}</option>`
        );
        $('#kudo-to').append(
          `<option value="${dataList[i]._id}">${dataList[i].name}</option>`
        );
      }
    });
  };

  const postKudo = function(e) {
    e.preventDefault();
    // $("#messages").empty();
    console.log('kudos');

    if ($('#kudo-from').val() && $('#kudo-to').val()) {
      const kudo = {
        title: $('#kudo-title')
          .val()
          .trim(),
        body: $('#kudo-body')
          .val()
          .trim(),
        from: $('#kudo-from').val(),
        to: $('#kudo-to').val()
      };

      $.post('/api/kudo', kudo)
        .then(function(data) {
          $('#kudo-title').val('');
          $('#kudo-body').val('');
          $('#kudo-from').val('');
          $('#kudo-to').val('');

          $('.modal').modal('hide');

          getKudos();
        })
        .fail(function(err) {
          $('#messages').append(`<p>Error</p>`);
        });
    } else {
      $('#messages').append(`<p>Please select recipients<p>`);
    }
  };

  getKudos();
  getUsers();

  $('#send-kudo').on('click', postKudo);
});
