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
    "618074227": "ABD", //provisional
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
    "618074244": "CD", //provisional
    "618074245": "BD",
    "618074246": "2500",
    "618074247": "150",
    "618074248": "41",
    "618074249": "135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151", //provisional
    "618074250": "4,5", //provisional
    "618074251": "6,12", //provisional
    "618074252": "2",
    "618074253": "93018",
    "618074254": "2",
    "618074255": "2,3", //provisional
    "618074256": "B",
    "618074257": "C",
    "618074258": "B",
    "618074259": "A",
    "618074260": "ACD",
    "618074261": "BDC",
    "618074262": "BDCA",
    "618074263": "8",
    "618074264": "20",
    "618074265": "16",
    "618074266": "665",
    "618074267": "5",
    "618074268": "42",
    "618074269": "C",
    "618074270": "C",
    "618074271": "C",
    "618074272": "C",
    "618074273": "A",
    "618074274": "A",
    "618074275": "B",
    "618074276": "C",
    "618074277": "ABC",
    "618074278": "ACD",
    "618074279": "BA",
    "618074280": "25000",
    "618074281": "12",
    "618074282": "8",
    "618074283": "200",
    "618074284": "3",
    "618074285": "18",
    "618074286": "B",
    "618074287": "C",
    "618074288": "A",
    "618074289": "A",
    "618074290": "D",
    "618074291": "A",
    "618074292": "B",
    "618074293": "C",
    "618074294": "CAB",
    "618074295": "ADB",
    "618074296": "DA",
    "618074297": "8120",
    "618074298": "3",
    "618074299": "18",
    "618074300": "3",
    "618074301": "909",
    "618074302": "1",
    "618074303": "C",
    "618074304": "B",
    "618074305": "A",
    "618074306": "C"
};

const OPTIONS = ["A", "B", "C", "D"];

function isPara(id) {
    let n = parseInt(id.slice(-3));

    return (
        (n >= 252 && n <= 255) ||
        (n >= 235 && n <= 238) ||
        (n >= 218 && n <= 221)
    );
    // 252-255 235-238 218-221
}

function getSub(id) {
    let n = parseInt(id.slice(-3));

    //returns [isP, isC, isM]

    if ((n >= 273 && n <= 289) || (n >= 222 && n <= 238)) return [1,0,0];
    else if ((n >= 239 && n <= 255) || (n >= 290 && n <= 306)) return [0,1,0];
    else if ((n >= 205 && n <= 221) || (n >= 256 && n <= 272)) return [0,0,1];
    //no else ig
}

let max = 0, score = 0;
let p = 0, c = 0, m = 0, unattempted = 0, correct = 0, wrong = 0, total = 0;

for (let t of document.querySelectorAll("table.menu-tbl")) {
    let optBodyEl = t.previousElementSibling.children[0];

    let [typ, id, relAns] = [...t.children[0].children].map(tr => tr.children[1].textContent.trim());
    
    let fixedAns, fixedKey = keys[id];
    let relKey;
    
    if (typ === "SA") {
        fixedAns = optBodyEl.querySelector("tr:last-child").children[1].textContent.trim();
        relAns = fixedAns;
        relKey = fixedKey;
    }
    else {
        let fixedOpts = [...optBodyEl.querySelectorAll("tr img[name$='.jpg']:first-child")].slice(-4).map(img => img.name.match(/_o(\d)[_\.]/)[1]).map(n => OPTIONS[parseInt(n)-1]).join("");

        fixedAns = relAns.split(",").map(o => fixedOpts[OPTIONS.indexOf(o)]).sort().join("");
        relKey = fixedKey.split("").map(o => OPTIONS[fixedOpts.indexOf(o)]).sort().join("");
    }

    let attempted = relAns !== "--";
    let isCrct = false;

    let prevScore = score;

    if (typ === "SA") {
        let p = isPara(id) ? 3 : 4;

        if (fixedAns.split(".")[1]?.length > 2) isCrct = false;
        else {
            let ks = fixedKey.split(",").map(n => parseFloat(n.trim()));

            let a = parseFloat(fixedAns);

            isCrct = ks.some(k => k === a);
        }

        score += isCrct ? p : 0;
        max += p;
    } else if (typ === "MCQ") {
        isCrct = fixedAns === fixedKey;

        if (attempted) score += isCrct ? 3 : -1;
        max += 3;;
    } else if (typ === "MSQ") {
        max += 4;

        if (attempted) {
            if ([...fixedAns].some(o => !fixedKey.includes(o))) {
                score += -2;
            } else {
                isCrct = true;
                score += fixedAns.length === fixedKey.length ? 4 : fixedAns.length;
            }
        }
    }
    
    let del = score-prevScore;

    let tr = document.createElement("tr");
    
    tr.style.background = isCrct 
        ? "darkseagreen"
        : (attempted && del <= 0)
        ? "crimson"
        : "lightgrey";
    tr.style.color = (attempted && del <= 0)
        ? "white"
        : "black";
    
    tr.innerHTML = `
    <br/>
    Given ans: ${relAns}
    </br>
    Key ans: ${relKey}
    </br>
    Marks: ${del}`;

    t.children[0].appendChild(tr);

    total++;

    if (attempted) {
        if (isCrct) correct++;
        else wrong++;
    
        let [isP, isC, isM] = getSub(id);
    
        if (isP) p += del;
        else if (isC) c += del;
        else if (isM) m += del;
    } else {
        unattempted++;
    }
}

alert(`
You scored ${score}/${max}
Physics ${p}
Chemistry ${c}
Mathematics ${m}

Total: ${total}
Correct: ${correct}
Wrong: ${wrong}
Unattempted: ${unattempted}
`);