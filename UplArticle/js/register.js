(function(){
    $("form").submit(function(e){
        e.preventDefault();
        var flag = true;
        $("input").each(function(){
            if($(this).val()==""){
                $("#register").val("??有东西没填完吧");
                setTimeout(function(){$("#register").val("Sign Up");}, 3000);
                flag = false;
            }
            if(!flag){return false;}
        });
        $.post("/register",{"author":$(".author").val(),"key":$(".key").val()},function(msg){
            if(msg.hasOwnProperty("AuthorExist")){
                $("#register").val("该作者已注册!");
                setTimeout(function(){$("#register").val("Sign Up");}, 3000);
                flag = false;
            }
            if(!flag){return false;}
            if(msg.hasOwnProperty("Success")){
                $("#register").val("注册成功，即将到投稿页面..");
                setTimeout(function(){ location.href = "/Contribute"; }, 3000);
            }
        });
    });
})();