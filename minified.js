const keys={618074205:"B",618074206:"B",618074207:"B",618074208:"D",618074209:"CB",618074210:"AC",618074211:"AC",618074212:"51",618074213:"11",618074214:"1",618074215:"2",618074216:"12",618074217:"5",618074218:"20.00",618074219:"36.00",618074220:"0.00",618074221:"0.25",618074222:"A",618074223:"A",618074224:"A",618074225:"A",618074226:"BD",618074227:"AB",618074228:"AB",618074229:"3",618074230:"2",618074231:"3",618074232:"12",618074233:"171",618074234:"96",618074235:"601.50",618074236:"24.00",618074237:"0.75",618074238:"4.25",618074239:"B",618074240:"D",618074241:"D",618074242:"B",618074243:"AC",618074244:"C",618074245:"BD",618074246:"2500",618074247:"150",618074248:"41",618074249:"143",618074250:"5",618074251:"12",618074252:"2",618074253:"93018",618074254:"2",618074255:"2",618074256:"B",618074257:"C",618074258:"B",618074259:"A",618074260:"ACD",618074261:"BDC",618074262:"BDCA",618074263:"8",618074264:"20",618074265:"16",618074266:"665",618074267:"5",618074268:"42",618074269:"C",618074270:"C",618074271:"C",618074272:"C",618074273:"A",618074274:"A",618074275:"B",618074276:"C",618074277:"ABC",618074278:"AAD",618074279:"BA",618074280:"25000",618074281:"12",618074282:"8",618074283:"200",618074284:"3",618074285:"18",618074286:"B",618074287:"C",618074288:"A",618074289:"A",618074290:"D",618074291:"A",618074292:"B",618074293:"C",618074294:"CAB",618074295:"ADB",618074296:"DA",618074297:"8120",618074298:"3",618074299:"18",618074300:"3",618074301:"909",618074302:"1",618074303:"C",618074304:"B",618074305:"A",618074306:"C"},OPTIONS=["A","B","C","D"];function isPara(e){let t=parseInt(e.slice(-3));return t>=252&&t<=255||t>=235&&t<=238||t>=218&&t<=221}function getSub(e){let t=parseInt(e.slice(-3));return t>=273&&t<=289||t>=222&&t<=238?[1,0,0]:t>=239&&t<=255||t>=290&&t<=306?[0,1,0]:t>=205&&t<=221||t>=256&&t<=272?[0,0,1]:void 0}let max=0,score=0,p=0,c=0,m=0,unattempted=0,correct=0,wrong=0,total=0;for(let e of document.querySelectorAll("table.menu-tbl")){let t,n,r=e.previousElementSibling.children[0],[l,o,a]=[...e.children[0].children].map((e=>e.children[1].textContent.trim())),s=keys[o];if("SA"===l)t=r.querySelector("tr:last-child").children[1].textContent.trim(),a=t,n=s;else{let e=[...r.querySelectorAll("tr img[name$='.jpg']")].slice(-4).map((e=>e.name[e.name.length-5])).map((e=>OPTIONS[parseInt(e)-1])).join("");t=a.split(",").map((t=>e[OPTIONS.indexOf(t)])).sort().join(""),n=s.split("").map((t=>OPTIONS[e.indexOf(t)])).sort().join("")}let i="--"!==a,A=!1,C=score;if("SA"===l){let e=isPara(o)?3:4;A=!(t.split(".")[1]?.length>2)&&(t===s||parseFloat(t)===parseFloat(s)),score+=A?e:0,max+=e}else"MCQ"===l?(A=t===s,i&&(score+=A?3:-1),max+=3):"MSQ"===l&&(max+=4,i&&([...t].some((e=>!s.includes(e)))?score+=-2:(A=!0,score+=t.length===s.length?4:t.length)));let B=score-C,d=document.createElement("tr");if(d.style.background=A?"darkseagreen":i&&B<=0?"crimson":"lightgrey",d.style.color=i&&B<=0?"white":"black",d.innerHTML=`\n <br/>\n Given ans: ${a}\n </br>\n Key ans: ${n}\n </br>\n Marks: ${B}`,e.children[0].appendChild(d),total++,i){A?correct++:wrong++;let[e,t,n]=getSub(o);e?p+=B:t?c+=B:n&&(m+=B)}else unattempted++}alert(`\nYou scored ${score}/${max}\nPhysics ${p}\nChemistry ${c}\nMathematics ${m}\n\nTotal: ${total}\nCorrect: ${correct}\nWrong: ${wrong}\nUnattempted: ${unattempted}\n`);