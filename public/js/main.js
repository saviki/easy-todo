$(document).ready(function(){
            $( '.button.delete-todo' ).on( 'click' , function(e){
            e.preventDefault();
            $target = $(e.target);
            const id = $target.attr( 'data-todoid' );
            $.ajax({
            type: 'DELETE' ,
            url: '/todos/' + id,
            success: function (response){
            // If delete was successful.
            console.log(response);
            window.location.href = "/";
            },
            error: function(err){
            // If delete failed.
            console.error(err);
            }
        });
    });
});