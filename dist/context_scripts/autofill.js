({626:function(){var n=this&&this.__awaiter||function(n,e,o,t){return new(o||(o=Promise))((function(r,i){function c(n){try{s(t.next(n))}catch(n){i(n)}}function u(n){try{s(t.throw(n))}catch(n){i(n)}}function s(n){var e;n.done?r(n.value):(e=n.value,e instanceof o?e:new o((function(n){n(e)}))).then(c,u)}s((t=t.apply(n,e||[])).next())}))};const e=browser.storage.sync,o={adHocUserId:"newAdHocRoutePerson.id",commodityCode:"newPurchasingItemLine.purchasingCommodityCode",requestorPersonPhoneNumber:"document.requestorPersonPhoneNumber"},t=()=>n(this,void 0,void 0,(function*(){const n=yield e.get(null);for(let e in n){const t=n[e],r=document.getElementById(o[e]);r.value!==t&&(r.value=n[e])}}));t(),e.onChanged.addListener(t)}})[626]();