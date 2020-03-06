window.onload = function(){
  $('#reg-form').submit(function() {
    event.preventDefault();
    let response = $.ajax({
        url: 'http://localhost:3000/users',
        method: "POST",
        data: {
          name: $('#fname').val(),
          lastname : $('#lname').val(),
          email : $('#email').val(),
          password : $('#pass').val()
        }
    });
    response.done(function(data) {
      console.log(data);
      loadUsers();
    });
    response.fail(function(req, err) {
      console.log(req);
      console.log(err);
    });
  });

  const loadUsers = function() {
    let request = $.ajax({
      url: 'http://localhost:3000/users',
      method: "GET"
    });
    request.done(function(data) {
      $('#user-items').html("");
      let sortedData = data.sort(function(a, b){
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB)
            return -1 
        if (nameA > nameB)
            return 1
        return 0 
      });
      sortedData.forEach(function(data) {
        let name = data.name.replace(/[ñ]/g,"nn").replace(/[Ñ]/g, "Nn");
        let lastname = data.lastname.replace(/[ñ]/g,"nn").replace(/[Ñ]/g, "Nn");
        $('#user-items').html(
          $('#user-items').html() + 
          `<p>${name} ${lastname}</p>`
        );
      });
    });
    request.fail(function(req, err) {
      console.log(req);
      console.log(err);
    });
  };

  loadUsers();
};
