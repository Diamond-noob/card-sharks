


prizeText = {
    0:"ABSOLUTELY NOTHING cause 0 points so bad lol trash bro",
    1:"my apple! congrats",
    2:"a paperclip",
    3:"a pin for your lack of skill",
    4:"free corn lol",
    5:"acorn",
    6:"leaf lol",
    7:"claim ur free raid legender",
    8:"yoo luggage BUT NO FREE VACATION LOLL",
    9:"fondue",
    10:"spy-free teddy toy",
    11:"boomer moment",
    12:"actual vacation taking off in 12 mins lol",
    13:"ford angelica",
    14:"free seal",
    15:"a WALE place",
    16:"monke",
    17:"Earth!"};

var prizes = {
    0:0, 
    20:1,
    30:2,
    50:3,
    75:4,
    100:5,
    125:6,
    150:7,
    200:8,
    300:9,
    400:10,
    500:11,
    750:12,
    1000:13,
    2000:14,
    4000:15,
    7000:16,
    10_000:17};


//prizes logic
function getPrize(points){
    let prizeKey = Object.keys(prizes);
    let prizeLength = prizeKey.length;
    let prizeDiv = document.querySelector('#prize-div');
    let prizeTextHtml = document.querySelector('#prize-text');
    let prizeImg = new Image();
    
    console.log("welcome to getprize function");
    for (let i = 0; i < prizeLength; i++) {
        console.log("welcome to for loop");
        //console.log(prizeKey[i-1] ?? 0);
        if (points <= prizeKey[i] && points > (prizeKey[i-1] ?? -1)) {
            console.log(prizes[i]);
            console.log("yo 0 works", i)
            prizeTextHtml.textContent = `with ${points} points you got ${prizeText[i]}`;
            prizeImg.src = `./Prizes/${i}.gif`;
        } else if (points >=  10_000){ //if gotton MOST ammount of points:
            console.log("YO SO MUCH POINTS", prizeText[17])
            prizeTextHtml.textContent = prizeText[17];
            prizeImg.src = './Prizes/17.gif';
        }
    }
    prizeImg.id = 'prize-img'
    prizeDiv.appendChild(prizeImg)
}