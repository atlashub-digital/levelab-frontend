// Node >=22. Exercises the ARO V1 transport contract against a LOCAL mock ARO.
// No third-party payment provider, money or credentials are contacted.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { test } from 'node:test';
import { randomUUID, createHmac, timingSafeEqual } from 'node:crypto';

const project='levelab';
const offers=['levelab-forca-na-caneta-br','levelab-corpo-forte-br'];
const testOffer=offers[0];
function startMock(){
 const counts={checkout:0,resolve:0};
 const server=createServer(async(req,res)=>{
  const chunks=[];for await(const c of req)chunks.push(c);
  const raw=Buffer.concat(chunks).toString();
  const reply=(code,obj)=>{res.writeHead(code,{'content-type':'application/json'});res.end(JSON.stringify(obj));};
  if(req.url==='/v1/checkout-sessions'&&req.method==='POST'){
   counts.checkout++;
   assert.equal(req.headers['x-aro-public-key'],'public-fixture');
   assert.ok((req.headers['idempotency-key']??'').length>=16);
   const data=JSON.parse(raw);
   assert.equal(data.project,project);assert.equal(data.offer,testOffer);
   assert.equal(data.currency,'BRL');assert.equal(data.payment_method,'PIX');
   assert.ok(!('amount_minor' in data),'Client MUST NOT set financial authority');
   return reply(201,{id:'00000000-0000-4000-8000-000000000001',order_id:'00000000-0000-4000-8000-000000000002',
    project,offer:testOffer,state:'PENDING',amount:{amount_minor:2490,currency:'BRL'},
    checkout_secret:'session-secret',payment:{kind:'PIX',copy_paste:'000201fixture',qr_payload:'000201fixture',expires_at:'2030-01-01T00:00:00Z'}});
  }
  if(req.url==='/v1/checkout-sessions/00000000-0000-4000-8000-000000000001'){
   assert.equal(req.headers['x-aro-checkout-secret'],'session-secret');
   return reply(200,{id:'00000000-0000-4000-8000-000000000001',order_id:'00000000-0000-4000-8000-000000000002',project,
    offer:testOffer,state:'APPROVED',amount:{amount_minor:2490,currency:'BRL'},checkout_secret:'session-secret'});
  }
  if(req.url==='/v1/entitlements/resolve'&&req.method==='POST'){
   counts.resolve++;
   assert.equal(req.headers.authorization,'Bearer server-fixture');
   assert.equal(JSON.parse(raw).identity.email,'demo@example.org');
   return reply(200,{project,entitlements:[{key:'levelab:reader:forca-na-caneta',status:'ACTIVE',starts_at:'2024-01-01T00:00:00Z'}]});
  }
  reply(404,{error:'NOT_FOUND',message:'fixture',request_id:'fixture'});
 });
 return {server,counts};
}
test('ARO checkout -> state -> authoritative entitlement mock contract', async()=>{
 const {server,counts}=startMock();
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try{
  const base='http://127.0.0.1:'+server.address().port;
  const checkout=await fetch(base+'/v1/checkout-sessions',{method:'POST',headers:{
    'content-type':'application/json','x-aro-public-key':'public-fixture','idempotency-key':randomUUID()},
    body:JSON.stringify({project,offer:testOffer,market:'BR',country:'BR',currency:'BRL',
      payment_method:'PIX',payer:{name:'Cliente Teste',email:'demo@example.org'}})});
  assert.equal(checkout.status,201);const created=await checkout.json();
  assert.equal(created.state,'PENDING');assert.equal(created.amount.amount_minor,2490);
  assert.equal(created.payment.kind,'PIX');
  const state=await fetch(base+'/v1/checkout-sessions/'+created.id,{headers:{'X-ARO-Checkout-Secret':created.checkout_secret}});
  assert.equal((await state.json()).state,'APPROVED');
  const rights=await fetch(base+'/v1/entitlements/resolve',{method:'POST',headers:{
    'content-type':'application/json',authorization:'Bearer server-fixture'},
    body:JSON.stringify({project,identity:{email:'demo@example.org'}})});
  assert.equal(rights.status,200);
  assert.equal((await rights.json()).entitlements[0].status,'ACTIVE');
  assert.equal(counts.checkout,1);assert.equal(counts.resolve,1);
 }finally{await new Promise(resolve=>server.close(resolve));}
});
test('ARO signature and stale replay semantics',()=>{
 const secret='fixture-secret',raw=JSON.stringify({id:'evt',project,type:'entitlement.granted',data:{}}),
  timestamp=String(Math.floor(Date.now()/1000));
 const expected=createHmac('sha256',secret).update(timestamp+'.'+raw).digest();
 const verify=(ts,sig)=>{
  if(Math.abs(Date.now()/1000-Number(ts))>300)return false;
  const received=Buffer.from(sig,'hex');
  return received.length===expected.length&&timingSafeEqual(received,expected);
 };
 assert.equal(verify(timestamp,expected.toString('hex')),true);
 assert.equal(verify(String(Number(timestamp)-3600),expected.toString('hex')),false);
 assert.equal(verify(timestamp,'00'.repeat(32)),false);
});
