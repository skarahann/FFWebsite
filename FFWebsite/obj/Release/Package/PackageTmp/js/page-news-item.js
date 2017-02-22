﻿$(document).ready(function () {
    //test if URL contains passed ID - if so we want to use it 
    var id = getURLParameters("ID");
    GetNewsItem(id);
    GetTopNewsItems(id);
});  // End of Document Ready function
 
var nid = $('#fNewsSelect').val();
var uri = "api/frogforce/GetNewsItem/" + nid;

function GetNewsItem(nid) {
    /*******************************************************************
    * GetNewsItem - Go get the news data for a particular item  
    *******************************************************************/
    //var nid = $('#fNewsSelect').val();
    var uri = "api/frogforce/GetNewsItem/" + nid;
   
    $.getJSON(uri, function (data) {
        //ignore the main new item - we dont want to duplicate it 
            var parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S");
            var formatDate = d3.timeFormat("%B %d, %Y");
            var sd = parseDate(data.Post_Date);
            var htext = "";        
            htext = htext + "<div class='post single_post'><div class='post_thumb'><img src='img/FFWebsite/" + data.Image1_Name + "' alt='' /></div><!--end post thumb-->";
            htext = htext + "<div class='meta'><span class='author'>By: <a href='#'>" + data.Author_Name + "</a></span>";
            htext = htext + "<span class='category'><a href='#'>" + data.Category_Name + "</a></span><span class='date'>Posted: <a href='#'>" + formatDate(sd) + "</a></span>";
            htext = htext + "</div><!--end meta--><h1>" + data.Title_text + "</h1><div class='post_desc'>";
            htext = htext + "<p>" + data.Body_text + "</p>";
            htext = htext + "</div><!--end post desc--></div><!--end post-->";
            $('#FFpost').html(htext);

    }) // End Json Call 
        .error(function (jqXHR, textStatus, errorThrown) {
            ErrorMsgBox("Error getNewsItem()!", jqXHR.responseJSON, jqXHR.status);
        });
}  // End getNewsItem

function GetTopNewsItems(id) {
    /*******************************************************************
    * GetTopNewsItems - Go get the top 5 news items 
    *******************************************************************/
    var uri = "api/frogforce/GetTopNewsItemsNoDups/" + id;

    $.getJSON(uri, function (data) {
        var i = 0;
        var htext = "<ul>";
        $.each(data, function (key, item) {
            var parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S");
            var formatDate = d3.timeFormat("%B %d, %Y");
            var sd = parseDate(item.Post_Date);
            htext = htext + "<li><span class='rel_thumb'><img src='img/FFWebsite/" + item.Image1_Name + "' alt='' width='100px' height='67px'/></span><!--end rel_thumb-->";
            htext = htext + "<div class='rel_right'><a href='page-news-item.html?ID=" + item.ID + "'><h4>" + item.Title_text + "</h4></a>";
            htext = htext + "<span class='date'>Posted: <a href='#'>" + formatDate(sd) + "</a></span></div><!--end rel right--></li>";
        });  // End each 
        $('#frogtopnews').html(htext + "</ul>");
    }) // End Json Call 
        .error(function (jqXHR, textStatus, errorThrown) {
            ErrorMsgBox("Error getNewsList()!", jqXHR.responseJSON, jqXHR.status);
        });
}  // End getNewsList

