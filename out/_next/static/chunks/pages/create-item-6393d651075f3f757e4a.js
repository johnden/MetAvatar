(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[779],{42605:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return O}});var r=n(809),c=n.n(r),a=n(85893),s=n(26265),i=n(92447),o=n(67294),u=n(241),p=n(50387),l=n(77616),f=n(85241),d=n(11163),h=n(42484),g=n.n(h),m=n(90346),v=n(82025),b=n(33334),w=n(66127);function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){(0,s.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=(0,f.create)("https://ipfs.infura.io:5001/api/v0");function O(){var e=(0,o.useState)(null),t=e[0],n=e[1],r=(0,o.useState)({price:"",name:"",description:""}),s=r[0],f=r[1],h=(0,d.useRouter)();function x(){return(x=(0,i.Z)(c().mark((function e(t){var r,a,s;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.target.files[0],e.prev=1,e.next=4,j.add(r,{progress:function(e){return console.log("received: ".concat(e))}});case 4:a=e.sent,s="https://ipfs.infura.io/ipfs/".concat(a.path),n(s),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log("Error uploading file: ",e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})))).apply(this,arguments)}function O(){return(O=(0,i.Z)(c().mark((function e(){var n,r,a,i,o,u;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=s.name,r=s.description,a=s.price,console.log(n,r,a,t),n&&r&&a&&t){e.next=4;break}return e.abrupt("return");case 4:return i=JSON.stringify({name:n,description:r,image:t}),e.prev=5,e.next=8,j.add(i);case 8:o=e.sent,u="https://ipfs.infura.io/ipfs/".concat(o.path),console.log(u),k(u),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(5),console.log("Error uploading file: ",e.t0);case 17:case"end":return e.stop()}}),e,null,[[5,14]])})))).apply(this,arguments)}function k(e){return N.apply(this,arguments)}function N(){return(N=(0,i.Z)(c().mark((function e(t){var n,r,a,i,o,f,d,m,x,y,j,O;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new(g()),e.next=3,n.connect();case 3:return r=e.sent,a=new u.Q(r),i=a.getSigner(),o=new p.CH(v.k,b.Mt,i),e.next=9,o.createToken(t);case 9:return f=e.sent,e.next=12,f.wait();case 12:return d=e.sent,m=d.events[0],x=m.args[2],y=x.toNumber(),j=l.vz(s.price,"ether"),o=new p.CH(v.A,w.Mt,i),e.next=20,o.getListingPrice();case 20:return O=(O=e.sent).toString(),e.next=24,o.createMarketItem(v.k,y,j,{value:O});case 24:return f=e.sent,e.next=27,f.wait();case 27:h.push("/");case 28:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,a.jsx)("div",{className:"flex justify-center",children:(0,a.jsxs)("div",{className:"w-1/2 flex flex-col pb-12",children:[(0,a.jsx)("input",{placeholder:"Asset Name",className:"mt-8 border rounded p-4",onChange:function(e){return f(y(y({},s),{},{name:e.target.value}))}}),(0,a.jsx)("textarea",{placeholder:"Asset Description",className:"mt-2 border rounded p-4",onChange:function(e){return f(y(y({},s),{},{description:e.target.value}))}}),(0,a.jsx)("input",{placeholder:"Asset Price in Eth",className:"mt-2 border rounded p-4",onChange:function(e){return f(y(y({},s),{},{price:e.target.value}))}}),(0,a.jsx)("input",{type:"file",name:"Asset",className:"my-4",onChange:function(e){return x.apply(this,arguments)}}),t&&(0,a.jsx)(m.Z,{alt:"img",className:"rounded mt-4",width:"350",src:t}),(0,a.jsx)("button",{onClick:function(){return O.apply(this,arguments)},className:"font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg",children:"Create Digital Asset"})]})})}},21932:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/create-item",function(){return n(42605)}])},47005:function(){},26937:function(){},26784:function(){},88795:function(){}},function(e){e.O(0,[753,977,855,774,888,179],(function(){return t=21932,e(e.s=t);var t}));var t=e.O();_N_E=t}]);