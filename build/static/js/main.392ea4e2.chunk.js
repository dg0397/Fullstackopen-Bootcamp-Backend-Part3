(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t(15),a=t.n(r),u=(t(20),t(6)),i=t(3),o=t(0),d=function(e){var n=e.searchValue,t=e.handleSearch;return Object(o.jsx)("form",{children:Object(o.jsxs)("label",{children:["Filter Show with:",Object(o.jsx)("input",{value:n,onChange:t})]})})},l=function(e){var n=e.handleSubmit,t=e.handleNumberInput,c=e.handleNameInput,r=e.newName,a=e.newNumber;return Object(o.jsx)("div",{className:"person-form",children:Object(o.jsxs)("form",{onSubmit:n,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{value:r,onChange:c,required:!0})]}),Object(o.jsxs)("div",{children:["number:"," ",Object(o.jsx)("input",{value:a,onChange:t,required:!0})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"Add"})})]})})},s=function(e){var n=e.person,t=e.handleDelete,c=n.name,r=n.number;return Object(o.jsxs)("p",{children:[c," ",r,Object(o.jsx)("button",{onClick:t,children:"Delete"})]})},f=function(e){var n=e.peopleToShow,t=e.handleDeletePerson;return Object(o.jsx)("div",{className:"person-list",children:n.map((function(e){return Object(o.jsx)(s,{person:e,handleDelete:function(){return t(e.id)}},e.id)}))})},b=function(e){var n=e.message;if(!n)return null;return Object(o.jsx)("div",{className:"notification",style:n.includes("deleted")?{backgroundColor:"#c42e1a",boxShadow:"5px 5px 5px #c42e1a"}:null,children:n})},h=t(4),j=t.n(h),m="/api/notes",p={getAll:function(){return j.a.get(m).then((function(e){return e.data}))},update:function(e,n){return j.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},create:function(e){return j.a.post(m,e).then((function(e){return e.data}))},deletePerson:function(e){return j.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))}},O=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),s=Object(i.a)(a,2),h=s[0],j=s[1],m=Object(c.useState)(""),O=Object(i.a)(m,2),x=O[0],v=O[1],w=Object(c.useState)(""),g=Object(i.a)(w,2),N=g[0],S=g[1],k=Object(c.useState)([]),y=Object(i.a)(k,2),D=y[0],I=y[1],T=Object(c.useState)(""),A=Object(i.a)(T,2),C=A[0],P=A[1];Object(c.useEffect)((function(){p.getAll().then((function(e){r(e),I(e)}))}),[]);return Object(o.jsx)("div",{className:"app",children:Object(o.jsxs)("div",{className:"app-content",children:[Object(o.jsx)("h1",{children:"Phonebook"}),Object(o.jsx)(b,{message:C}),Object(o.jsx)(d,{searchValue:N,handleSearch:function(e){""===e.target.value?I(t):I((function(){return t.filter((function(n){return new RegExp(e.target.value,"gi").test(n.name)}))})),S(e.target.value)}}),Object(o.jsx)("h2",{children:"Add a New"}),Object(o.jsx)(l,{handleSubmit:function(e){if(e.preventDefault(),t.map((function(e){return e.name})).includes(h)&&t.map((function(e){return e.number})).includes(x))alert("".concat(h," is already added to phonebook")),j(""),v("");else if(t.map((function(e){return e.name})).includes(h)){if(window.confirm("".concat(h," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===h})),c=Object(u.a)(Object(u.a)({},n),{},{number:x});p.update(c.id,c).then((function(e){P("Updated ".concat(h," number")),setTimeout((function(){P("")}),5e3),r(t.map((function(n){return n.id!==e.id?n:e}))),I(t.map((function(n){return n.id!==e.id?n:e}))),j(""),v("")})).catch((function(e){P("Information of ".concat(c.name," has already deleted from the server")),setTimeout((function(){P("")}),5e3),r(t.filter((function(e){return e.id!==c.id}))),I(t.filter((function(e){return e.id!==c.id}))),j(""),v("")}))}}else{var a={name:h,number:x};p.create(a).then((function(e){P("Added ".concat(h)),setTimeout((function(){P("")}),5e3),r(t.concat(e)),I(t.concat(e)),j(""),v("")}))}},handleNumberInput:function(e){v(e.target.value)},handleNameInput:function(e){j(e.target.value)},newName:h,newNumber:x}),Object(o.jsx)("h2",{children:"Numbers"}),Object(o.jsx)(f,{peopleToShow:D,handleDeletePerson:function(e){window.confirm("Delete ".concat(D.find((function(n){return n.id===e})).name))&&p.deletePerson(e).then((function(n){console.log(n),r(t.filter((function(n){return n.id!==e}))),I(t.filter((function(n){return n.id!==e})))})).catch((function(n){P("Information of ".concat(D.find((function(n){return n.id===e})).name," has already deleted from the server")),setTimeout((function(){P("")}),5e3),r(t.filter((function(n){return n.id!==e}))),I(t.filter((function(n){return n.id!==e})))}))}})]})})};a.a.render(Object(o.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.392ea4e2.chunk.js.map