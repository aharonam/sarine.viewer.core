/*!
sarine.viewer.manager - v0.9.0 -  Wednesday, November 18th, 2015, 2:20:36 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */
(function(){var ViewerManger;ViewerManger=function(){function ViewerManger(a){fromTag=a.fromTag,toTag=a.toTag,stoneViews=a.stoneViews,template=a.template,jsons=a.jsons,logicRoot=a.logicRoot,window.cacheVersion="?0.9.0",configuration.cacheVersion&&(window.cacheVersion+=configuration.cacheVersion),logicRoot=stoneViews.viewersBaseUrl+"atomic/{version}/js/",jsons=stoneViews.viewersBaseUrl+"atomic/{version}/jsons/",allViewresList=stoneViews.viewers,viewers=[],this.bind=a.template?loadTemplate:bindElementToSelector}var addViewer,allViewresList,bindElementToSelector,existInConfig,findAttribute,fromTag,getPath,jsons,loadTemplate,logicPath,logicRoot,recurse,stoneViews,template,toTag,viewers;return viewers=[],stoneViews=void 0,fromTag=void 0,toTag=void 0,stoneViews=void 0,template=void 0,jsons=void 0,logicRoot=void 0,logicPath=void 0,allViewresList=void 0,ViewerManger.prototype.bind=Error,getPath=function(a){var b;return b=a.split("/"),b.pop(),b.join("/")},bindElementToSelector=function(a){var b,c,d;return c=$.Deferred(),b=[],d=this,document.viewersList=JSON.parse(JSON.stringify(allViewresList)),$(a).find(fromTag).each(function(a){return function(a,c){var d,e,f,g,h,i,j,k,l,m;for(i=$("<"+toTag+">"),j=$(c).attr("viewer"),h=$(c).attr("order")||99,m=c.attributes,k=0,l=m.length;l>k;k++)e=m[k],i.data(e.name,e.value);return i.data({type:$(c).attr("viewer"),order:h,version:$(c).attr("version")}),i.attr({id:"viewr_"+a,order:h}),"loupe3DFullInspection"===j&&(g=$(c).attr("menu")||!0,f=$(c).attr("coordinates")||!0,d=$(c).attr("active")||!0,i.data({menu:g,coordinates:f,active:d}),i.attr({menu:g,coordinates:f,active:d})),i.addClass("viewer "+j),$(c).replaceWith(i),b.push(addViewer(j,i))}}(this)),$(a).find("*[data-sarine-info]").each(function(a){return function(a,b){var c;return c=$(b),c.text(findAttribute(stoneViews,c.data("sarineInfo")))}}(this)),$.when.apply($,b).then(function(){return c.resolve()}),c},recurse=function(a,b){if(0===b.length)return a;if(a)return recurse(a[b.shift()],b)},findAttribute=function(a,b){return recurse(a,b.split("."))},loadTemplate=function(a){var b,c,d;return b=$.Deferred(),c=[],d=[],$("<div>").load(template+window.cacheVersion,function(e,f,g){return $(a).prepend($(e).filter(function(e){return function(e,f){return"SCRIPT"===f.tagName?(f.src?(c.push($.Deferred()),f.src=f.src.replace(getPath(location.origin+location.pathname),getPath(template)),$.getScript(f.src,function(){return c.pop(),0===c.length?($(a).append(d),bindElementToSelector(a).then(function(){return b.resolve()})):void 0})):d.push(f),$(f).remove(),!1):("LINK"===f.tagName&&f.href&&(f.href=f.href.replace(getPath(location.origin+location.pathname),getPath(template))),!0)}}(this))),0===c.length?bindElementToSelector(a).then(b.resolve):void 0}),b.then(function(){return $(document).trigger("loadTemplate")})},existInConfig=function(a){return"undefined"!=typeof configuration.experiences&&configuration.experiences.filter(function(b){return b.atom===a}).length>0},addViewer=function(type,toElement){var callbackPic,data,defer,path,s,src,url;return defer=$.Deferred(),data=void 0,callbackPic=void 0,$.ajaxSetup({async:!1}),"undefined"==typeof configuration.experiences||existInConfig(type)?($.getJSON(jsons.replace("{version}",toElement.data("version")||"v1")+type+".json"+window.cacheVersion,function(a){return function(a){return data=a}}(this)),$.ajaxSetup({async:!0}),callbackPic=data.callbackPic||jsons.replace("{version}",toElement.data("version")||"v1")+"no_stone.png",null===stoneViews.viewers[type]&&(src=callbackPic.split("/"),path=src.pop(),stoneViews.viewers[type]=src.join("/")+"/",data.instance="SarineImage",data.name="sarine.viewer.image",data.args={imagesArr:[path]}),url=logicRoot.replace("{version}",toElement.data("version")||"v1")+data.name+(1===location.hash.indexOf("debug")?".bundle.js":".bundle.min.js")+window.cacheVersion,s=$("<script>",{type:"text/javascript"}).appendTo("body").end()[0],s.onload=function(){var inst;return inst=eval(data.instance),viewers.push(new inst($.extend({src:stoneViews.viewers[type],element:toElement,callbackPic:callbackPic,stoneProperties:stoneViews.stoneProperties,baseUrl:stoneViews.viewersBaseUrl},data.args))),defer.resolve()},s.src=url,defer):void 0},ViewerManger.prototype.getViewers=function(){return viewers},ViewerManger.prototype.sortByOrder=function(a){var b;return b=[],a.forEach(function(a){var c;return c=a.element.data("order"),void 0===b[c]&&(b[c]=[]),b[c].push(a)}),b.filter(function(a){return a})},ViewerManger.prototype.init_list=function(a,b,c){var d,e,f,g,h,i,j;j=this,h=a,i=b,c=c||$.Deferred(),e=a.shift(),d=[];for(g in e)f=e[g].id+"_"+e[g].element.data("type"),$(document).trigger(i+"_start",[{Id:f}]),d.push(e[g][i]().then(function(a){return function(){return $(document).trigger(i+"_end",[{Id:a}])}}(f)));return $.when.apply($,d).then(function(){return 0===h.length?c.resolve():j.init_list(h,i,c)}),c},ViewerManger.prototype.first_init=function(){var a;return a=$.Deferred(),this.init_list(this.sortByOrder(viewers),"first_init").then(a.resolve),a},ViewerManger.prototype.full_init=function(){var a;return a=$.Deferred(),this.init_list(this.sortByOrder(viewers),"full_init").then(a.resolve),a},ViewerManger.prototype.stop=function(){return viewers.forEach(function(a){return a.stop()})},ViewerManger.prototype.play=function(){return viewers.forEach(function(a){return a.play(!0)})},ViewerManger}(),this.ViewerManger=ViewerManger}).call(this);
/*!
sarine.viewer.resource.manager - v0.8.0 -  Monday, September 7th, 2015, 4:32:07 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */
(function(){var a;a=function(){function a(){console.log("new singleton"),f=new c,d=new b}var b,c,d,e,f;return e=void 0,f=void 0,d=void 0,a.getInstance=function(){return void 0===e&&(e=new this),e},b=function(){function a(){}return a.prototype.viewerImagesObj={},a.prototype.loadImage=function(a,b,c){var d,e;return e=this,void 0===this.viewerImagesObj[b.id]&&(this.viewerImagesObj[b.id]={capacity:b.downloadLimit||1e3,bag:[],threshhold:[],order:parseInt(b.element.data("order"))}),c=c||$.Deferred(),d=new Image,d.crossOrigin="Anonymous",d.onload=function(a){var c,d,f;return c=$.inArray(e.viewerImagesObj[b.id].threshhold.filter(function(b){return function(b){return b.src.toLowerCase()===a.target.src.toLowerCase()}}(this))[0],e.viewerImagesObj[b.id].threshhold),d=e.viewerImagesObj[b.id].threshhold[c],f=e.viewerImagesObj[b.id].bag.shift(),f&&(f.img.src=f.src,e.viewerImagesObj[b.id].threshhold.push(f)),e.viewerImagesObj[b.id].threshhold.splice(c,1),d.defer.resolve(a.target)},this.viewerImagesObj[b.id].threshhold.length<this.viewerImagesObj[b.id].capacity?(this.viewerImagesObj[b.id].threshhold.push({defer:c,src:a,img:d}),d.src=a):this.viewerImagesObj[b.id].bag.push({defer:c,src:a,img:d}),d.onerror=function(a){var d,f;if(d=$.inArray(e.viewerImagesObj[b.id].threshhold.filter(function(b){return function(b){return b.src.toLowerCase()===a.target.src.toLowerCase()}}(this))[0],e.viewerImagesObj[b.id].threshhold),f=e.viewerImagesObj[b.id].threshhold[d],a.target.src.toLowerCase()!==b.callbackPic.toLowerCase())return e.loadImage(b.callbackPic,b,c);throw new Error("callbackPic not exist")},c},a}(),a.prototype.loadImage=function(a){return d.loadImage(a,this)},c=function(){function a(){}var b;return b={},a.add=function(a,c,d){var e;return b[a]||(setTimeout(function(a){var c,d;return c=b[a],b[a]=void 0,d=$.unique(c.map(function(a){return a.item.id})),c.forEach(function(a){return a.callback.apply(a.item)})},a,a),b[a]=[]),e={callback:c,item:d},0===b[a].filter(function(a){return a.item.id===e.item.id}).length?b[a].push(e):void 0},a}(),a.prototype.setTimeout=function(a,b){return c.add(a,b,this)},a}(),this.ResourceManager=a}).call(this);
//# sourceMappingURL=sarine.viewer.resource.manager.bundle.min.js.map