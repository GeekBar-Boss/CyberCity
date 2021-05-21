$(document).ready(function() {
    $.getJSON("/Article",{"author":$("#author").val(),"title":$("#title")},function(ret){
        bodyContent = $.ajax({
            url: "/UplMD/"+ret.md_name,
            global: false,
            type: "GET",
            dataType: "html",
            async: false,
            success: function(msg) {
                $(".single-blog-page").html(msg);
                $(document).attr("title",item.title + " - " + ret.author + "| WikiShow");
            }
        })
    });
    
});