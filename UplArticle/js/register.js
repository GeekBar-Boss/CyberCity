(function(){
    $("form").submit(function(e){
        e.preventDefault();
        var flag = true;
        var pat = /^[A-Za-z0-9_]$/;
        $("input").each(function(){
            if($(this).val()==""){
                setmsg("??有东西没填完吧");
                flag = false;
            }
            if(pat.test($(this).val())){setmsg("字母数字下划线!");}
        });
        if(!flag){return false;}
        $.post("/register",{"author":$(".author").val(),"key":$(".key").val()},function(msg){
            if(msg.hasOwnProperty("AuthorExist")){
                setmsg("该作者已注册!");
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

function setmsg(msg){
    $("#register").val(msg);
    setTimeout(function(){$("#register").val("Sign Up");}, 3000);
}