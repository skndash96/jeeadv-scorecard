const keys={618074290:"A",618074293:"B",618074292:"A",618074291:"B",618074294:"BCD",618074295:"ACD",618074296:"CD",618074297:"8120",618074300:"3",618074298:"3",618074301:"909",618074302:"1",618074299:"18",618074305:"C",618074306:"D",618074303:"B",618074304:"D",618074275:"C",618074276:"C",618074274:"C",618074273:"C",618074277:"ABC",618074279:"BC",618074278:"ABC",618074280:"25000",618074284:"3",618074281:"12",618074282:"8",618074283:"200",618074285:"18",618074288:"C",618074289:"C",618074286:"C",618074287:"A",618074257:"B",618074258:"D",618074256:"A",618074259:"B",618074262:"ABCD",618074261:"ABC",618074260:"ABC",618074264:"20",618074265:"16",618074268:"42",618074263:"8",618074267:"5",618074266:"665",618074272:"B",618074271:"B",618074270:"A",618074269:"C",618074242:"C",618074241:"B",618074240:"C",618074239:"D",618074245:"AC",618074243:"CD",618074244:"A",618074247:"150",618074248:"41",618074250:"5",618074249:"143",618074246:"2500",618074251:"12",618074254:"2",618074252:"2",618074253:"93018",618074255:"2",618074222:"B",618074224:"A",618074225:"A",618074223:"D",618074228:"AC",618074226:"AC",618074227:"AB",618074232:"12",618074230:"2",618074233:"171",618074231:"3",618074229:"3",618074234:"96",618074237:"0.75",618074236:"24.00",618074235:"601.50",618074238:"4.25",618074207:"B",618074208:"D",618074206:"C",618074205:"A",618074210:"AC",618074211:"BC",618074209:"CD",618074214:"1",618074212:"51",618074217:"5",618074215:"2",618074216:"12",618074213:"11",618074221:"0.25",618074218:"20.00",618074220:"0.00",618074219:"36.00"};function getSub(e){let t=parseInt(e.slice(-3));return t>=273&&t<=289||t>=222&&t<=238?[1,0,0]:t>=239&&t<=255||t>=290&&t<=306?[0,1,0]:t>=205&&t<=221||t>=256&&t<=272?[0,0,1]:void 0}let score=0,max=0,p=0,c=0,m=0,correct=0,wrong=0,unattempted=0,total=0;for(let e of[...document.querySelectorAll("table.menu-tbl")]){let t=[...e.children[0].children].map((e=>e.children[1].textContent.trim()));"SA"===t[0]&&(t[2]=e.previousElementSibling.children[0].querySelector("tr:last-child").children[1].textContent.trim());let[l,n,r]=t;if(total++,"--"===r){unattempted++;continue}let C,s=score,[o,i,A]=getSub(n);if("SA"===l){let[e,t]=keys[n].split(".");C=r===keys[n]||"00"===t&&r===e;let l=keys[n].includes(".")?3:4;max+=l,score+=C?l:0}else if("MCQ"===l)C=r===keys[n],score+=C?3:-1,max+=3;else if("MSQ"===l){let e=r.split(","),t=keys[n].split("");e.some((e=>!t.includes(e)))?(score+=-2,C=!1):(C=!0,score+=t.length===e.length?4:e.length,max+=4)}C?correct++:wrong++;let B=score-s;o?p+=B:i?c+=B:A&&(m+=B)}alert(`\nTotal ${score}/${max}\n\nPhysics ${p}\nChemistry ${c}\nMathematics ${m}\n`);