export default class Url {
    static mobVerApiSendOTP = "https://testapi.karza.in/v2/mobile/otp";
    static mobVerApiOTPStatus = "https://testapi.karza.in/v2/mobile/status";
    static emailVerApiSendOTP = "https://testapi.karza.in/v3/email-async/request";
    static emailVerApiOTPStatus = "https://testapi.karza.in/v3/email-async/verify-otp";
    static panVerApi = "https://testapi.karza.in/v2/pan-authentication";
    static panVerApi = "https://testapi.karza.in/v2/pan-authentication";
    static panVerApi = "https://testapi.karza.in/v2/pan-authentication";
    static e_signApi = "https://api.digio.in/v2/client/document/";
    static efx_api = "https://ists.equifax.co.in/cir360service/cir360report";
    static cf_ord = "https://test.cashfree.com/api/v1/order/create";
    static cf_pln = "https://test.cashfree.com/api/v2/subscription-plans";
    static cf_sub = "https://test.cashfree.com/api/v2/subscriptions";
    static bck_endPnt = "http://localhost"; //Backend Endpoint to relay request
    static keys = require('./api_keys.json');
}