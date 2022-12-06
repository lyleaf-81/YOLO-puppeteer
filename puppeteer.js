const puppeteer = require('puppeteer');
(async () => {
	const browser = await puppeteer.launch({
		headless: false
	})
	const page = await browser.newPage(); //打开一个空白页
	await page.goto('https://etax.hunan.chinatax.gov.cn/wsbs/toLogin.do'); //

	// await page.type('#form_password', password);
	await page.click(".nav-tabs li:nth-child(2)");
	await page.type('#zrr_nsrsbh', '', {
		'delay': 200
	});
	await page.type('#zrr_password', '', {
		'delay': 200
	});
	await page.click("#loginButton_zrr", {
		'delay': 1000
	});
	await page.waitForTimeout(1000)
	console.log('等待完成')
	let form = await page.$('.imgBg');
	await form.screenshot({
		path: './imgs/baidu.png'
	});
	await page.waitForTimeout(2000)
	console.log('等待请求')
	let element = await page.$(".v_rightBtn");
	
	let box = await element.boundingBox();
	
	const axios = require('axios');
	let  RD = '';
	let retryFlag = true;
	await axios.get('http://127.0.0.1:4000/index').then((res)=>{
		RD = res.data.data.RD
	}
	).catch(function(error) {
		console.log(error);
	});
	await console.log(RD);
	await page.waitForTimeout(1000)
	await page.hover('.v_rightBtn')
	await page.waitForTimeout(1000)
	await page.mouse.down()
	await page.waitForTimeout(1000)
	await page.mouse.move(box.x+RD+20,0,{'steps':1})
	await page.waitForTimeout(2000)
	await page.mouse.up()
	

	//   await page.close();
	// await browser.close();
	// await page.waitForNavigation({
	//   waitUntil: 'load'
	// });//等待页面加载出来，等同于window.onload
})();
