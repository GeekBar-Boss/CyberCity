
(function(){
    $('#drop a').click(function(){
        // Simulate a click on the file input button
        // to show the file browser dialog
        $(this).parent().find('input').click();
    });
    $("#bgname").on("change",function(){$("#bg_name").val($('#bgname option:selected').val());});
    $("#file").on("change",function(){
        $("#drop a").text($(this).prop("files")[0].name);
        var reader = new FileReader();
        var TagPattern = /<!--tag\{(.*?)\}-->/;
        var TitlePattern = /<h1 id=[\"|'](.*?)[\"|']>/g;
        var AuthortPattern = /Author:([a-z0-9A-Z,]*)?/;
        reader.readAsText($(this).prop("files")[0],"UTF-8");
        reader.onload = function(evt){
            $(".title:first").val(TitlePattern.exec(evt.target.result)[1]);
            $(".author:first").val(AuthortPattern.exec(evt.target.result)[1]);
            $(".tag:first").val(TagPattern.exec(evt.target.result)[1]);
        }
    });
    $.getJSON("/bgimg",function(items){
        $.each(items,function(index,item){
            $("#bgname").append("<option value =\""+item+"\">"+item+"</option>");
        });
        $("#bg_name").val($("#bgname option:first").val());
    });
    $("form").submit(function(e){
        e.preventDefault();
        var flag = true;
        $("input").each(function(){
            if($(this).val()==""){
                $("#upload").val("??有东西没填完吧");
                setTimeout(function(){$("#upload").val("upload");}, 3000);
                flag = false;
            }
            if(!flag){return false;}
        });

            var formData = new FormData();
            formData.append("title",$(".title:first").val());
            formData.append("author",$(".author:first").val());
            formData.append("author_key",$(".author_key:first").val());
            formData.append("tag",$(".tag:first").val());
            formData.append("bg_name",$("#bg_name").val());
            formData.append("file",$("#file").prop("files")[0]);


            $.ajax({
                url:'/upload',
                data:formData,
                type:'post',
                contentType:false,
                processData:false,
                success:function (msg){
                    if(msg.hasOwnProperty("RegisterNeeded")){
                        $("#upload").val("贴贴师傅,先注册叭");
                        setTimeout(function(){$("#upload").val("upload");}, 2000);
                        flag = false;
                    }
                    if(msg.hasOwnProperty("KeyError")){
                        $("#upload").val("Key错了,哭唧唧");
                        setTimeout(function(){$("#upload").val("upload");}, 2000);
                        flag = false;
                    }
                    if(!flag){return false;}
                    if(msg.hasOwnProperty("Success")){
                        $("#upload").val("上传成功，即将到文章页面..");
                        setTimeout(function(){ location.href = "/articles"; }, 1500);
                    }
                }
        });
        });
})();

