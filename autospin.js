const { createCursor } = require('ghost-cursor-playwright')
const cluster = require('cluster')
const axios = require('axios')
const { firefox } = require('playwright')
const prompt = require('prompt-sync')({ sigint: true })

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

intro = 
` 
## ##   ###  ##   ## ##    ## ##   #### ##  
##   ##   ##  ##  ##   ##  ##   ##  # ## ##  
##        ##  ##  ##   ##  ####       ##     
##  ###   ## ###  ##   ##   #####     ##     
##   ##   ##  ##  ##   ##      ###    ##     
##   ##   ##  ##  ##   ##  ##   ##    ##     
 ## ##   ###  ##   ## ##    ## ##    ####    
                                             
FreeCash.com - marseille1337 & leakage1337

`

;(async () => {
    if(cluster.isMaster) {
        console.clear()
        console.log('\x1b[35m%s\x1b[0m', (intro));
        var threads = parseInt(prompt('\x1b[35mGhost | Threads -> \x1b[0m'))
        for (var i = 0; i < threads; i++) {
            cluster.fork()
        }
    } else {
        await free_cash()
    }

})()

async function free_cash() {
    const browser = await firefox.launch({ headless: false })
    var page = await browser.newPage()
    const cursor = await createCursor(page)

    await page.goto('https://freecash.com/r/dart')
      
    var email = 'ghost' + Math.random().toString(4).substring(2, 12);
    await axios.post("https://api.internal.temp-mail.io/api/v3/email/new", {"domain": "kjkszpjcompany.com", "name": email});
    email += "@kjkszpjcompany.com";
    console.log('\x1b[35m%s\x1b[0m', 'Ghost | Got mail -> ' + email)
    await page.bringToFront()
    await page.type('input[id*=email]', email)
    await page.type('input[id*=password]', "GhostOnTop!")
    password = "GhostOnTop!";
    console.log('\x1b[35m%s\x1b[0m', 'Ghost | Password -> ' + password)
    try {
        await page.$eval('input[type*=checkbox]', el => el.click())            
    } catch (error) {}
    const elements = await page.$$('//*[contains (text(), "Konto erstellen")]');
    await sleep(1000)
    var x = JSON.parse(JSON.stringify(await elements[3].boundingBox()))['x']
    var y = JSON.parse(JSON.stringify(await elements[3].boundingBox()))['y']
    var cords = {
        x: x,
        y: y,
        width: 30,
        height: 30
    }
    await cursor.actions.move(cords)
    await cursor.actions.click(cords)

    var emailData;
    while (true) {
        var emailData = await axios.get("https://api.internal.temp-mail.io/api/v3/email/" + email + "/messages").then(res => res.data)
        if (emailData.length !== 0) {
            var first = emailData[0].body_text.toString().split("*Verify Email Address ( ")[1]
            emailData = first.split(" )*")[0]
            break
        }
        await sleep(200)
    }
    console.log('\x1b[35m%s\x1b[0m', 'Ghost | Mail verified!')
    await page.goto(emailData)
    await page.bringToFront()
    await page.click('div[class="Open-case-btn waves-effect"]')
          
}