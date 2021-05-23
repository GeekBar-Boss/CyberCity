(function(){
    var path = window.location.pathname;
    var RoutePattern = path.split("/");
    var PromptFlag = false;
    switch(RoutePattern.length){
        case 2 : if(path == "/"){
                     templateloader(0);PromptFlag=true;break;
                }
                 switch(RoutePattern[1]){
                     case "index" : templateloader(0);PromptFlag=true;break;
                     case "articles" : templateloader(1);ItemsLoader(RoutePattern[1]);break;
                     case "introduction" : templateloader(2);IntroductionLoader();break;
                     default : templateloader(1);ItemsLoader(RoutePattern[1]);break;
                }
                break;
        case 3 : templateloader(2);PageLoader(RoutePattern[1],RoutePattern[2]);break
    }
    setUpleftcornerButton(PromptFlag);
})();

function templateloader(RoutePattern){
    var templates = ["/Template/index.html","/Template/blog.html","/Template/page.html"];
    BlockContent = $.ajax({
        url: templates[RoutePattern],
        global: false,
        type: "GET",
        dataType: "html",
        async: false,
        success: function(msg) {
            $(".side-menu-wrapper").after(msg);
            RoutePattern == 1 ? $(document).attr("title","Articles | CyberCity") : null;
        }
    });

}

function IntroductionLoader(){
    BodyContent = $.ajax({
        url: "/CyberCity.html",
        global: false,
        type: "GET",
        dataType: "html",
        async: false,
        success: function(msg) {
            $(".single-blog-page").after(msg);
            $(document).attr("title","CyberCity聚合博客系统使用说明"+" | CyberCity");
            highlightAllBlock();
        }
    });
}

function ItemsLoader(name){
    var itemsdiv = "<div class=\"blog-grid\">\n" +
    "<div class=\"blog-item\">\n" +
    "<img src=\"https://cdn.jsdelivr.net/gh/GeekBar-Boss/CyberCity/bg_img/$bg_name$\" alt=\"\">\n" +
    "<div class=\"bi-tag\">$tag$</div>\n" +
    "<div class=\"bi-text\">\n" +
    " <div><h3><b id='author'>Author:$author$</b></h3></div>\n" +
    " <div class=\"bi-date\">$date$</div>\n" +
    " <h3><a href=\"$md_name$\" target=\"_blank\">$title$</a></h3>\n" +
    "</div>\n" +
	"</div>\n" +
    "</div>\n";
	$.post("/blog",{"author":name},function(res){
	$.each(res, function(index,item){
            $('.blog-grid-warp').append(
				itemsdiv.replace("$title$",item.title)
						.replace("$author$",item.author)
						.replace("$tag$",item.tag)
						.replace("$date$",item.date)
						.replace("$bg_name$",item.bg_name)
						.replace("$md_name$","/"+item.author+"/"+item.title)
			);
			reloadimages();
        });
	});

}

function PageLoader(author,title){
    $.getJSON("/Article",{"author":decodeURI(author),"title":decodeURI(title)},function(ret){
        BodyContent = $.ajax({
            url: "/UpledMD/"+ret[0].md_name,
            global: false,
            type: "GET",
            dataType: "html",
            async: false,
            success: function(msg) {
                var codetheme = /<!--theme\{(.*)\}-->/i;
                if(codetheme.test(msg)){
	$("<link>")
                    .attr({ rel: "stylesheet",
                        type: "text/css",
                        href: "https://cdn.jsdelivr.net/gh/GeekBar-Boss/CyberCity/codestyles/"+codetheme.exec(msg)[1]+".css"
                    })
                    .appendTo("head");

	}
                $(document).attr("title",ret[0].title + " - " + ret[0].author + " | CyberCity");
                $(".single-blog-page").after(msg);
                highlightAllBlock();
            }
        });
    });

}

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

function highlightAllBlock(){
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
}

function setUpleftcornerButton(PromptFlag){
    if(PromptFlag){
	for(let i = 0;i < 5;i++){
		$(".menu-wrapper").delay(800).fadeToggle(800);
		$(".menu-wrapper").delay(800).fadeToggle(800);
	}
    }
    $(".menu-wrapper").fadeTo("fast",0.01);
    $(".menu-wrapper").mouseenter(function(){
    	$(this).fadeTo("fast",1);
    });
    $(".menu-wrapper").mouseleave(function(){
    	$(this).fadeTo("fast",0.01);
    
    });
}
