(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[157],{99581:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return v}});var r=t(809),s=t.n(r),a=t(85893),c=t(92447),i=t(241),o=t(50387),u=t(77616),d=t(67294),l=t(9669),f=t.n(l),p=t(42484),h=t.n(p),x=t(90346),m=t(82025),w=t(66127),g=t(33334);function v(){var e=(0,d.useState)([]),n=e[0],t=e[1],r=(0,d.useState)("not-loaded"),l=r[0],p=r[1];function v(){return(v=(0,c.Z)(s().mark((function e(){var n,r,a,d,l,x,v,N;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new(h())({network:"mainnet",cacheProvider:!0}),e.next=3,n.connect();case 3:return r=e.sent,a=new i.Q(r),d=a.getSigner(),l=new o.CH(m.A,w.Mt,d),x=new o.CH(m.k,g.Mt,a),e.next=10,l.fetchMyNFTs();case 10:return v=e.sent,e.next=13,Promise.all(v.map(function(){var e=(0,c.Z)(s().mark((function e(n){var t,r,a,c;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.tokenURI(n.tokenId);case 2:return t=e.sent,e.next=5,f().get(t);case 5:return r=e.sent,a=u.bM(n.price.toString(),"ether"),c={price:a,tokenId:n.tokenId.toNumber(),seller:n.seller,owner:n.owner,image:r.data.image},e.abrupt("return",c);case 9:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()));case 13:N=e.sent,t(N),p("loaded");case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,d.useEffect)((function(){!function(){v.apply(this,arguments)}()}),[]),"loaded"!==l||n.length?(0,a.jsx)("div",{className:"flex justify-center",children:(0,a.jsx)("div",{className:"p-4",children:(0,a.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4",children:n.map((function(e,n){return(0,a.jsxs)("div",{className:"border shadow rounded-xl overflow-hidden",children:[(0,a.jsx)(x.Z,{alt:"nftimage",src:e.image,className:"rounded"}),(0,a.jsx)("div",{className:"p-4 bg-black",children:(0,a.jsxs)("p",{className:"text-2xl font-bold text-white",children:["Price - ",e.price," Eth"]})})]},n)}))})})}):(0,a.jsx)("h1",{className:"py-10 px-20 text-3xl",children:"No assets owned"})}},99579:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/my-assets",function(){return t(99581)}])}},function(e){e.O(0,[753,669,855,774,888,179],(function(){return n=99579,e(e.s=n);var n}));var n=e.O();_N_E=n}]);