(function(){
  var zmshare={css_core:"../public/css/base/cwb.0.1.css",js_core:"../vendor/lrequest.1.1.js",
  api_core:"http://link.apps.zing.vn/share",link:{},buts:null,timeP:500,init:function(){this.loadSrc();window.setTimeout(zmshare.tmInit,zmshare.timeP)},
  tmInit:function(){if(typeof Lrequest!="undefined")zmshare.mSB();else window.setTimeout(zmshare.tmInit,zmshare.timeP)},
  mSB:function(){zmshare.buts=document.getElementsByName("zm_share");var nums=zmshare.buts.length;if(nums){for(var i=
0;i<nums;i++)zmshare.renderB(zmshare.buts[i]);zmshare.parseData(document.getElementsByTagName("HTML")[0].innerHTML)}},
  loadSrc:function(){var css_o=document.createElement("link");css_o.setAttribute("type","text/css");css_o.setAttribute("rel","stylesheet");
  css_o.setAttribute("href",this.css_core);var js_o=document.createElement("script");js_o.setAttribute("type","text/javascript");
  js_o.setAttribute("src",this.js_core);var hd=document.getElementsByTagName("HEAD")[0]||document.body;hd.appendChild(css_o);
hd.appendChild(js_o)},renderB:function(obj){var type=obj.getAttribute("type")||"icon";var txt=obj.innerHTML||"";
var wb=document.createElement("span");var wb_c="";var arr={icon:["Icon","Icon"],icnbig:["IconBig","Icon"],button:["Button","Button"],
apps:["App","App"],text:["Text","Text"]};if(typeof arr[type]!="undefined")wb_c=txt?"ZMConnect"+arr[type][1]+"_Text":"ZMConnect"+arr[type][0];
else wb_c="ZMConnectText";obj.innerHTML="";wb.innerHTML=txt;wb.setAttribute("class",wb_c);obj.appendChild(wb)},zec:function(data){return encodeURIComponent(data)},
makeTar:function(){var tar=this.api_core+"?"+"u="+this.zec(this.link.limage.join(","))+"&t="+this.zec(this.link.title)+"&desc="+this.zec(this.link.desc)+"&images="+this.zec(this.link.limage.join(","))+"&media="+this.zec(this.link.code)+"&width="+this.link.width+"&height="+this.link.height;var nums=this.buts.length;for(var i=0;i<nums;i++){if(this.buts[i].getAttribute("rel")=="friend")tar+="&fl=friend";this.buts[i].setAttribute("target","_blank");this.buts[i].setAttribute("href",tar)}},imgCB:function(imgs,status){if(status){zmshare.link.limage=
imgs;zmshare.makeTar()}},parseData:function(data){var obj=new Lrequest(location.href,this.ctCB,this.imgCB);obj.parse(data)},outTimer:function(){},ctCB:function(obj){zmshare.link=obj}};zmshare.init()})();
