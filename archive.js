//response relative to mine
const keys0 = {
    //PAPER 1

//CHEM 290-306
"618074290": "A",
"618074293": "B",
"618074292": "A",
"618074291": "B",

"618074294": "BCD",
"618074295": "ACD",
"618074296": "CD",

"618074297": "8120",
"618074300": "3",
"618074298": "3",
"618074301": "909",
"618074302": "1",
"618074299": "18",

"618074305": "C",
"618074306": "D",
"618074303": "B",
"618074304": "D",

//PHY 273-289
"618074275": "C",
"618074276": "C",
"618074274": "C",
"618074273": "C",

"618074277": "ABC",
"618074279": "BC",
"618074278": "ABC",

"618074280": "25000",
"618074284": "3",
"618074281": "12",
"618074282": "8",
"618074283": "200",
"618074285": "18",

"618074288": "C",
"618074289": "C",
"618074286": "C",
"618074287": "A",

//MAT  256-272
"618074257": "B",
"618074258": "D",
"618074256": "A",
"618074259": "B",

"618074262": "ABCD",
"618074261": "ABC",
"618074260": "ABC",

"618074264": "20",
"618074265": "16",
"618074268": "42",
"618074263": "8",
"618074267": "5",
"618074266": "665",

"618074272": "B",
"618074271": "B",
"618074270": "A",
"618074269": "C",

    //PAPER 2
//CHEM 239-255
"618074242": "C",
"618074241": "B",
"618074240": "C",
"618074239": "D",

"618074245": "AC",
"618074243": "CD",
"618074244": "A",

"618074247": "150",
"618074248": "41",
"618074250": "5",
"618074249": "143",
"618074246": "2500",
"618074251": "12",

"618074254": "2",
"618074252": "2",
"618074253": "93018",
"618074255": "2", //3 or 2

//PHY 222-238
"618074222": "B",
"618074224": "A",
"618074225": "A",
"618074223": "D",

"618074228": "AC",
"618074226": "AC",
"618074227": "AB",

"618074232": "12",
"618074230": "2",
"618074233": "171",
"618074231": "3",
"618074229": "3",
"618074234": "96",

"618074237": "0.75",
"618074236": "24.00",
"618074235": "601.50",
"618074238": "4.25",

//MAT 205-221
"618074207": "B",
"618074208": "D",
"618074206": "C",
"618074205": "A",

"618074210": "AC",
"618074211": "BC",
"618074209": "CD",

"618074214": "1",
"618074212": "51",
"618074217": "5",
"618074215": "2",
"618074216": "12",
"618074213": "11",

"618074221": "0.25",
"618074218": "20.00",
"618074220": "0.00",
"618074219": "36.00"
};

//procedure
//copy paste keys0 as keys in paper1
//copy paste output as keys in paper2
//copy paste output as keys in main.js

const m = {"A":1, "B":2, "C":3, "D":4};
const rm = ["A", "B", "C", "D"];

let changed = 0;

for (let t of [...document.querySelectorAll('table.menu-tbl')]) {
    let q = [...t.children[0].children].map(tr => tr.children[1].textContent.trim());

    let [typ, id, ans] = q;
    
    if (q[0] !== "SA") {
        keys[id] = keys[id].split("").map(o => {
            let pre = keys[id];

            let img = t.previousSibling.children[0].children[2+m[o]].querySelector("img");
            
            let to = rm[parseInt(img.name.split(".").shift().slice(-1)) - 1];

            console.log(id, img, pre, "to", to);
            
            return to;
        }).join("");
        changed++;
    }
}

console.log(keys);

console.log("CHANGED", changed);
