import Url from "./base";
import axios from "axios";

export class CF_ord extends Url {
    /*
data = {
    lid : <loan id>
    ordAmt: <Amt>
    custName: <name>
    custPhone: <phone>
    custEmail: <email>
}
*/

    static async makeOrder(data) {
        let body = { 
            "url" : this.cf_ord,
            "body" : {
                "appId" : this.keys["cashfreeAppId"],
                "secretKey" : this.keys["cashfreeSecret"],
                "orderId" : "ORDPRC" + data["lid"],
                "orderAmount" : data["ordAmt"],
                "orderNote" : "Payment of fee of Rs. " + data["ordAmt"] + " only.",
                "customerName" : data["custName"],
                "customerPhone" : data["custPhone"],
                "customerEmail" : data["custEmail"],
                "returnUrl" : "https://enablecap.in"
            }
        };

        return (
            await new Promise((resolve, reject) => {
                axios.post(this.bck_endPnt, body)
                    .then(res => {
                        if(res.body.status === "OK")
                            resolve(res.body.paymentLink);
                    })
                    .catch(err => reject(err));
            })
        )
    }

}

export class CF_pln extends Url {
    /*
    data = {
        lid : <loan id>
        appName: <Applicant Name>
        loanAmt : <Total loan Repay amt.>
        custName: <Customer Name>
        custEmail : <Customer Email>
        custPhone : <Customer Phone>
        emiEndDate : <End Date of Loan>
    }
    */

    //Call only this method while triggering E-Nach it will create the plan and subscription as well
    static async makePln(data) { 
        let body = {
            "planId" : "PLN" + data["lid"] ,
            "planName" : "PLN" + data["lid"] + "_" + data["appName"],
            "type" : "ON_DEMAND",
            "maxAmount" : data["loanAmt"],
        };

        let header = {
            "content-type" : "application/json",
            "X-Client-Id" : this.keys["cashfreeAppId"],
            "X-Client-Secret" : this.keys["cashfreeSecret"]
        };

        let rq = {
            "url" : this.cf_pln,
            "body" : body,
            "header" : header
        };

        return (
            await new Promise((resolve,reject) => {
                axios.post(this.bck_endPnt, rq)
                    .then(res => {
                        //Once the plan is created successfully then creating the subscription using plan Id from previous step
                        CF_sub.makeSub({
                            "plnId" : res.body.plnId, //Please check the structure
                            "custName" : data["custName"],
                            "custEmail" : data["custEmail"],
                            "custPhone" : data["custPhone"],
                            "emEndDate" : data["emiEndDate"]
                        }).then(res => resolve(res)).catch(err => reject(err));
                        //We need to check whether we are getting plan ID from this sub call
                        //because it's need to be saved. Cannot check until backend endpoint is established.
                    })
                    .catch(err => reject(err));
            })
        );
    }
}

class CF_sub extends Url {
    static async makeSub(data) {
        let body = {
            "url" : this.cf_sub,
            "body" : {
                "subscriptionId" : "SUB" + data["plnId"],
                "planId" : data["plnId"],
                "customerName" : data["custName"],
                "customerEmail" : data["custEmail"],
                "customerPhone" : data["custPhone"],
                "expiresOn" : data["emiEndDate"],
                "returnUrl" : "https://enablecap.in"
            },
            "header" : {
                "content-type" : "application/json",
                "X-Client-Id" : this.keys["cashfreeAppId"],
                "X-Client-Secret" : this.keys["cashfreeSecret"]
            }
        };

        return (
            await new Promise((resolve,reject) => {
                axios.post(this.bck_endPnt, rq)
                    .then(res => resolve(res))
                    .catch(err => reject(err));
            })
        );
    }
}

