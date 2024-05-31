const keys = {
    "618074205": "B",
    "618074206": "B",
    "618074207": "B",
    "618074208": "D",
    "618074209": "CB",
    "618074210": "AC",
    "618074211": "AC",
    "618074212": "51",
    "618074213": "11",
    "618074214": "1",
    "618074215": "2",
    "618074216": "12",
    "618074217": "5",
    "618074218": "20.00",
    "618074219": "36.00",
    "618074220": "0.00",
    "618074221": "0.25",
    "618074222": "A",
    "618074223": "A",
    "618074224": "A",
    "618074225": "A",
    "618074226": "BD",
    "618074227": "AB",
    "618074228": "AB",
    "618074229": "3",
    "618074230": "2",
    "618074231": "3",
    "618074232": "12",
    "618074233": "171",
    "618074234": "96",
    "618074235": "601.50",
    "618074236": "24.00",
    "618074237": "0.75",
    "618074238": "4.25",
    "618074239": "B",
    "618074240": "D",
    "618074241": "D",
    "618074242": "B",
    "618074243": "AC",
    "618074244": "C",
    "618074245": "BD",
    "618074246": "2500",
    "618074247": "150",
    "618074248": "41",
    "618074249": "143",
    "618074250": "5",
    "618074251": "12",
    "618074252": "2",
    "618074253": "93018",
    "618074254": "2",
    "618074255": "2",
    "618074256": "A",
    "618074257": "B",
    "618074258": "D",
    "618074259": "B",
    "618074260": "ABC",
    "618074261": "ABC",
    "618074262": "ABCD",
    "618074263": "8",
    "618074264": "20",
    "618074265": "16",
    "618074266": "665",
    "618074267": "5",
    "618074268": "42",
    "618074269": "C",
    "618074270": "A",
    "618074271": "B",
    "618074272": "B",
    "618074273": "C",
    "618074274": "C",
    "618074275": "C",
    "618074276": "C",
    "618074277": "ABC",
    "618074278": "ABC",
    "618074279": "BC",
    "618074280": "25000",
    "618074281": "12",
    "618074282": "8",
    "618074283": "200",
    "618074284": "3",
    "618074285": "18",
    "618074286": "C",
    "618074287": "A",
    "618074288": "C",
    "618074289": "C",
    "618074290": "A",
    "618074291": "B",
    "618074292": "A",
    "618074293": "B",
    "618074294": "BCD",
    "618074295": "ACD",
    "618074296": "CD",
    "618074297": "8120",
    "618074298": "3",
    "618074299": "18",
    "618074300": "3",
    "618074301": "909",
    "618074302": "1",
    "618074303": "B",
    "618074304": "D",
    "618074305": "C",
    "618074306": "D"
};

const optMap = {"A": 1, "B": 2, "C": 3, "D": 4};
const rOptMap = ["A", "B", "C", "D"];

function getSub(id) {
    let n = parseInt(id.slice(-3));

    //returns [isP, isC, isM]

    if ((n >= 273 && n <= 289) || (n >= 222 && n <= 238)) return [1,0,0];
    else if ((n >= 239 && n <= 255) || (n >= 290 && n <= 306)) return [0,1,0];
    else if ((n >= 205 && n <= 221) || (n >= 256 && n <= 272)) return [0,0,1];
    //no else ig
}

let score = 0, max = 0;
let p = 0, c = 0, m = 0, correct = 0, wrong = 0, unattempted = 0, total = 0;

for (let t of [...document.querySelectorAll('table.menu-tbl')]) {
    let q = [...t.children[0].children].map(tr => tr.children[1].textContent.trim());

    if (q[0] === "SA") {
        q[2] = t.previousElementSibling.children[0].querySelector("tr:last-child").children[1].textContent.trim();
    } else if (q[2] !== "--") {
        let pre = q[2];

        q[2] = q[2].split(",").map(o => {
            let n = t.previousElementSibling.children[0].children[2+optMap[o]].querySelector("img").name.split(".").shift().slice(-1);
            return rOptMap[n-1];
        }).join("");

        console.log(pre, q[2], "ans", keys[q[1]]);
    }

    let [typ, id, ans] = q;

    let notAttempted = ans === "--";

    let prevScore = score;
    let crct;

    let [isP, isC, isM] = getSub(id);

    if (typ === "SA") {
        let [int, dec] = keys[id].split(".").concat(null);
        
        crct = ans === keys[id] || (dec === "00" && ans === int);

        let p = (keys[id].includes(".") ? 3 : 4);

        max += p;
        score += crct ? p : 0;
    } else if (typ === "MCQ") {
        crct = ans === keys[id];

        score += crct ? 3 : (notAttempted ? 0 : -1);
        max += 3;
    } else if (typ === "MSQ") {
        let marked = ans.split("");
        let key = keys[id].split("");
        
        max += 4;
        
        if (marked.some(x => !key.includes(x))) {
            if (!notAttempted) score += -2;
            crct = false;
        } else {
            crct = true;
            score += key.length === marked.length ? 4 : marked.length;
        }
    }

    let del = score-prevScore;

    total++;

    if (notAttempted) {
        unattempted++;
        continue;
    }

    console.log(id, ans, keys[id], crct, del);

    if (crct) correct++;
    else wrong++;


    if (isP) p += del;
    else if (isC) c += del;
    else if (isM) m += del;
}

alert(`
Total ${score}/${max}

Physics     ${p}
Chemistry   ${c}
Mathematics ${m}
`);