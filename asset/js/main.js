/**
 * Created by DR16 on 2016/4/25.
 */
require.config({
    paths:{
        baseLayer:location.pathname.replace(/\/[^/]+$/, "") + "/asset/js/template/BaseLayer",
        leaflet:location.pathname.replace(/\/[^/]+$/, "")+"/asset/js/util/leaflet",
        esriLeaflet:location.pathname.replace(/\/[^/]+$/, "")+"/asset/js/util/esri-leaflet",
        jquery:location.pathname.replace(/\/[^/]+$/, "")+"/asset/js/util/jquery",
        iScroll:location.pathname.replace(/\/[^/]+$/, "") + "/asset/js/util/iScroll",
        vertialScroll:location.pathname.replace(/\/[^/]+$/, "") + "/asset/js/tools/vertial-scroll"
    }
});
require("jquery leaflet esriLeaflet baseLayer iScroll vertialScroll".split(" "),function($,leaflet,esriLeaflet,baseLayer,iScroll,vertialScroll){
    L.esri = esriLeaflet;
    L.Icon.Default.imagePath = "asset/images";

    var geo = getJsonData("asset/config/data.json","POST");

    map = baseLayer.init(geo);

    var wrapperELement = vertialScroll.createElement(geo);
    document.querySelector(".content-manager").appendChild(wrapperELement);
    var myScroll = new iScroll(wrapperELement, { bounceEasing: 'elastic', bounceTime: 1200,scrollbars:true,mouseWheel:true });

    function getJsonData(url, type, params){
        var rtValue = null;
        var contentType = "application/json";
        if (params != null)
            contentType = params.contenttype;
        $.ajax({
            url:url,
            type:type,
            async: false,
            dataType:"json",
            success:function(result){
                if (contentType == undefined || contentType == "text/xml") {
                    if (typeof (result) == "string")
                        rtValue = result;
                    else
                        rtValue = result.xml;
                }
                else if (contentType == "application/json")
                    rtValue = result;
            },
            error:function(error){
                console.log(error);
                rtValue = "";
            }
        });
        return rtValue;
    }
});