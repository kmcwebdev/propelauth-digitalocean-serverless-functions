var i=Object.create;var a=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var h=Object.getPrototypeOf,A=Object.prototype.hasOwnProperty;var l=(e,t)=>{for(var s in t)a(e,s,{get:t[s],enumerable:!0})},n=(e,t,s,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of d(t))!A.call(e,r)&&r!==s&&a(e,r,{get:()=>t[r],enumerable:!(o=p(t,r))||o.enumerable});return e};var E=(e,t,s)=>(s=e!=null?i(h(e)):{},n(t||!e||!e.__esModule?a(s,"default",{value:e,enumerable:!0}):s,e)),P=e=>n(a({},"__esModule",{value:!0}),e);var f={};l(f,{main:()=>U});module.exports=P(f);var u=require("dotenv"),c=E(require("@propelauth/node"));(0,u.config)();var R=c.initBaseAuth({authUrl:process.env.PROPELAUTH_URL??"",apiKey:process.env.PROPELAUTH_API_KEY??"",manualTokenVerificationMetadata:{issuer:process.env.PROPELAUTH_ISSUER??"",verifierKey:process.env.PROPELAUTH_VERIFIER_KEY??""}});async function U(e){let t=e.http.headers?.authorization;try{return{statusCode:200,body:{success:!0,statusCode:200,data:await R.validateAccessTokenAndGetUser(t)}}}catch{return{statusCode:401,body:{success:!1,statusCode:401,data:null,message:"Unauthorized"}}}}0&&(module.exports={main});
