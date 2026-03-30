// membuat function search
function searchMovie() {

    // hilangkan tampilan data movie di html
    $('#movie-list').html('');

    // request API menggunakan AJAX
    $.ajax({
        url: 'https://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'c44d3b8d',
            's': $('#search-input').val()
        },
        success: function (result) {

            if (result.Response == "True") {
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#movie-list').append(
                        '<div class="col-md-4">' +
                            '<div class="card mb-3">' +
                                '<img src="' + data.Poster + '" class="card-img-top">' +
                                '<div class="card-body">' +
                                    '<h5 class="card-title">' + data.Title + '</h5>' +
                                    '<h6 class="card-subtitle mb-2 text-muted">' + data.Year + '</h6>' +
                                    '<a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="' + data.imdbID + '">See Detail</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
                    );
                });

            } else {
                $('#movie-list').html(
                    '<div class="col">' +
                        '<h1 class="text-center">' + result.Error + '</h1>' +
                    '</div>'
                );
            }

        }
    });

}


// event tombol search diklik
$('#button-search').on('click', function () {
    searchMovie();
});


// event tombol enter
$('#search-input').on('keyup', function (event) {
    if (event.which === 13) {
        searchMovie();
    }
});


// event klik see detail
$('#movie-list').on('click', '.see-detail', function () {

    $.ajax({
        url: 'https://www.omdbapi.com/',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': 'c44d3b8d',
            'i': $(this).data('id')
        },
        success: function (movie) {

            if (movie.Response === "True") {

                $('.modal-body').html(
                    '<div class="container-fluid">' +
                        '<div class="row">' +

                            '<div class="col-md-4">' +
                                '<img src="' + movie.Poster + '" class="img-fluid">' +
                            '</div>' +

                            '<div class="col-md-8">' +
                                '<ul class="list-group">' +
                                    '<li class="list-group-item"><h4>' + movie.Title + '</h4></li>' +
                                    '<li class="list-group-item"><b>Released:</b> ' + movie.Released + '</li>' +
                                    '<li class="list-group-item"><b>Genre:</b> ' + movie.Genre + '</li>' +
                                    '<li class="list-group-item"><b>Director:</b> ' + movie.Director + '</li>' +
                                    '<li class="list-group-item"><b>Actors:</b> ' + movie.Actors + '</li>' +
                                '</ul>' +
                            '</div>' +

                        '</div>' +
                    '</div>'
                );

                $('#exampleModalLabel').html(movie.Title);
            }

        }
    });

});
