(function(){
    /*------------------------
		Click Article Item
	------------------------*/
	
	$(".blog-grid-warp").on("click","a",function(){
		var args = {"url":$(this).attr("href"),"title":$(this).text(),"author":$("#author").text()};
		var body = $(document.body),form = $("<form method='post'></form>"),input;
		form.attr({"action":"/Article"});
		$.each(args,function(key,value){ //遍历
			input = $("<input type='hidden'>");
			input.attr({"name":key});
			input.val(value);
			form.append(input);
			});
		form.appendTo(document.body);
		form.submit();
		return false;
	});

	/*---------------------------
		Generate Article Item
	----------------------------*/

	function generate(){
		var name = (window.location.pathname).substring(1);
        var itemsdiv = "<div class=\"blog-grid\">\n" +
		"<div class=\"blog-item\">\n" +
        "<img src=\"/bg_img/$bg_name$\" alt=\"\">\n" +
        "<div class=\"bi-tag\">$tag$</div>\n" +
        "<div class=\"bi-text\">\n" +
        " <div><h3><b id='author'>Author:$author$</b></h3></div>\n" +
        " <div class=\"bi-date\">$date$</div>\n" +
        " <h3><a href=\"/UpledMD/$md_name$\">$title$</a></h3>\n" +
        "</div>\n" +
		"</div>\n" +
        "</div>\n";
        var name = window.location.pathname.split("/");
		$.getJSON("/blog",{"author":name[name.length-1]},function(res){
			$.each(res, function(index,item){
                $('.blog-grid-warp').append(
					itemsdiv.replace("$title$",item.title)
							.replace("$author$",item.author)
							.replace("$tag$",item.tag)
							.replace("$date$",item.date)
							.replace("$bg_name$",item.bg_name)
							.replace("$md_name$",item.md_name)
				);
				reloadimages();
            });
		});
	}
    generate();
})();

function reloadimages(){
	var $blog_grid = $('.blog-grid-warp');
				$blog_grid.imagesLoaded().progress( function() {
				$blog_grid.isotope({
					masonry: {
						columnWidth: '.blog-grid-sizer',
						itemSelector: '.blog-grid'
			}
		});
	});
}