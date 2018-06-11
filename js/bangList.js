
$(function(){
    var type = $.getUrlParam('type');
    tuijian(type);
    function tuijian(type){
        $.ajax({
        method:"get",
        url: "http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&from=webapp_music&method=baidu.ting.billboard.billList&type="+type+"&size=20&offset=0",
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            $.each(data.song_list,function(key,value){
                if(key<9){
                    $("#songList_").append('<li><span>'+value.song_id+'</span><h4>0'+(key+1)+'</h4><p><b>'+value.title+'</b><strong>'+value.author+'</strong></p><var></var></li>')
                }else{
                    $("#songList_").append('<li><span>'+value.song_id+'</span><h4>'+(key+1)+'</h4><p><b>'+value.title+'</b><strong>'+value.author+'</strong></p><var></var></li>')
                }     
            });

            $("#songList_").children('li').children('span').on("click",function(){
                console.log(this.innerHTML);
                jump(this.innerHTML);
            });
            
        },
        error: function (responseText, textStatus, XMLHttpRequest) {
            alert(textStatus);
        }
    });
}
});
function jump(id){
    url = "index.html?songid="+id;//此处拼接内容
    window.location.href = url;
}
//获取到上一个页面传过来的值
(function($){
$.getUrlParam = function(name){
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if (r!=null) return unescape(r[2]); return null;
}})(jQuery);
