(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[814],{59411:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return b}});var r=t(809),s=t.n(r),a=t(85893),i=t(92447),c=t(67294),l=t(241),u=t(50387),o=t(77616),p=t(85241),f=t(11163),d=t(42484),h=t.n(d),x=t(90346),m=t(82482),v=t(79852),j=t(85627),w=t(18222),g=t(82025),Z=t(33334),y=t(66127),k=(0,p.create)("https://ipfs.infura.io:5001/api/v0");function b(){var e=(0,c.useState)(null),n=e[0],t=e[1],r=(0,c.useState)({price:"",name:"",description:""}),p=(r[0],r[1],(0,c.useState)(1)),d=p[0],b=p[1],C=(0,c.useState)(1),N=C[0],P=C[1],_=(0,f.useRouter)();function I(e){return S.apply(this,arguments)}function S(){return(S=(0,i.Z)(s().mark((function e(t){var r,a,i,c,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.username,a="test",1,r&&a&&n){e.next=5;break}return e.abrupt("return");case 5:return i=JSON.stringify({name:r,description:a,image:n}),e.prev=6,e.next=9,k.add(i);case 9:c=e.sent,l="https://ipfs.infura.io/ipfs/".concat(c.path),console.log(l),E(l),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(6),console.log("Error uploading file: ",e.t0);case 18:case"end":return e.stop()}}),e,null,[[6,15]])})))).apply(this,arguments)}function E(e){return F.apply(this,arguments)}function F(){return(F=(0,i.Z)(s().mark((function e(n){var t,r,a,i,c,p,f,d,x,m,v,j;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new(h()),e.next=3,t.connect();case 3:return r=e.sent,a=new l.Q(r),i=a.getSigner(),c=new u.CH(g.k,Z.Mt,i),e.next=9,c.createToken(n);case 9:return p=e.sent,e.next=12,p.wait();case 12:return f=e.sent,d=f.events[0],x=d.args[2],m=x.toNumber(),v=o.vz("1","ether"),c=new u.CH(g.A,y.Mt,i),e.next=20,c.getListingPrice();case 20:return j=(j=e.sent).toString(),e.next=24,c.createMarketItem(g.k,m,v,{value:j});case 24:return p=e.sent,console.log("createMarketItem"),e.next=28,p.wait();case 28:_.push("/");case 29:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,c.useEffect)((function(){console.log(_.query.url),t(_.query.url)}),[]),(0,a.jsxs)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[(0,a.jsx)("p",{style:{fontSize:"30px"},children:"\u751f\u6210\u4f60\u7684\u5361\u901a\u5934\u50cfNFT"}),(0,a.jsx)("p",{children:"\u7acb\u523b\u62e5\u6709\u5168\u4e16\u754c\u72ec\u4e00\u65e0\u4e8c\uff0c\u53ea\u5c5e\u4e8e\u4f60\u7684\u5934\u50cfNFT"}),(0,a.jsxs)("div",{style:{display:"flex"},children:[(0,a.jsx)("div",{children:n&&(0,a.jsx)(x.Z,{alt:"avatar",width:"300px",src:n})}),(0,a.jsx)("div",{children:(0,a.jsxs)(m.Z,{name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!0},onFinish:function(e){console.log("Success:",e),I(e)},onFinishFailed:function(e){console.log("Failed:",e)},children:[(0,a.jsx)(m.Z.Item,{label:"\u540d\u79f0",name:"username",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u4f60\u7684\u59d3\u540d"}],children:(0,a.jsx)(v.Z,{})}),(0,a.jsx)(m.Z.Item,{label:"\u6027\u522b",name:"sex",valuePropName:"checked",wrapperCol:{offset:8,span:16},children:(0,a.jsxs)(j.ZP.Group,{onChange:function(e){b(e.target.value)},value:d,children:[(0,a.jsx)(j.ZP,{value:1,children:"\u7537"}),(0,a.jsx)(j.ZP,{value:2,children:"\u5973"}),(0,a.jsx)(j.ZP,{value:3,children:"\u4fdd\u5bc6"})]})}),(0,a.jsx)(m.Z.Item,{label:"\u94fe\u63a5",name:"link",children:(0,a.jsx)(v.Z,{})}),(0,a.jsx)(m.Z.Item,{label:"\u4e2a\u4eba\u7b80\u4ecb",name:"desc",children:(0,a.jsx)(v.Z,{})}),(0,a.jsx)(m.Z.Item,{label:"\u9996\u9875\u5c55\u793a",name:"sex",valuePropName:"checked",wrapperCol:{offset:8,span:16},children:(0,a.jsxs)(j.ZP.Group,{onChange:function(e){P(e.target.value)},value:N,children:[(0,a.jsx)(j.ZP,{value:1,children:"\u662f"}),(0,a.jsx)(j.ZP,{value:2,children:"\u5426"})]})}),(0,a.jsxs)(m.Z.Item,{wrapperCol:{offset:8,span:24},style:{display:"flex",justifyContent:"space-between"},children:[(0,a.jsx)(w.Z,{type:"primary",htmlType:"submit",shape:"round",onClick:I,children:"\u751f\u6210NFT"}),(0,a.jsx)(w.Z,{type:"primary",shape:"round",onClick:function(){return window.open("https://faucet.matic.network/")},children:"\u83b7\u53d6\u6d4b\u8bd5\u5e01"})]})]})})]})]})}},27722:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/gen-avatar",function(){return t(59411)}])},47005:function(){},26937:function(){},26784:function(){},88795:function(){}},function(e){e.O(0,[753,977,489,253,855,774,888,179],(function(){return n=27722,e(e.s=n);var n}));var n=e.O();_N_E=n}]);