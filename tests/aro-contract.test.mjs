import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {createAroCheckout,getAroStatus} from '../lib/aro/client.ts';
const session={
 id:'11111111-1111-4111-8111-111111111111',
 order_id:'22222222-2222-4222-8222-222222222222',
 project:'levelab',offer:'guia-corpo-forte',state:'PENDING',
 amount:{amount_minor:6990,currency:'BRL'},checkout_secret:'test-mock-secret-no-real-key',
 payment:{kind:'PIX',copy_paste:'000201test',qr_payload:'000201test',expires_at:'2026-10-15T22:00:00Z'}
};
test('checkout uses ARO and Idempotency-Key; exposes integer money',async()=>{
 let options;
 const fetchImpl=async (_url,input)=>{options=input;return new Response(JSON.stringify(session),{status:201});};
 const result=await createAroCheckout({apiUrl:'https://aro-preview.atlashub.si',project:'levelab',publicKey:'mock-public',offer:'guia-corpo-forte',payer:{name:'Cliente Teste',email:'teste@example.com'},idempotencyKey:'11111111-1111-4111-8111-111111111111',paymentMethod:'PIX',fetchImpl});
 assert.equal(result.amount.amount_minor,6990);
 assert.equal(options.headers['Idempotency-Key'],'11111111-1111-4111-8111-111111111111');
 assert.equal(JSON.parse(options.body).payment_method,'PIX');
});
test('status secret only in header, never in URL or public status',async()=>{
 let url='',options;
 const fetchImpl=async (u,input)=>{url=u;options=input;return new Response(JSON.stringify({...session,state:'APPROVED'}),{status:200});};
 const data=await getAroStatus({apiUrl:'https://aro-preview.atlashub.si',project:'levelab',id:session.id,secret:session.checkout_secret,fetchImpl});
 assert.equal(data.state,'APPROVED');assert.equal('checkout_secret' in data,false);
 assert.equal(url.includes(session.checkout_secret),false);
 assert.equal(options.headers['X-ARO-Checkout-Secret'],session.checkout_secret);
});
test('rejects float amount and provider failure',async()=>{
 const base={apiUrl:'https://aro-preview.atlashub.si',project:'levelab',publicKey:'mock-public',offer:'guia-corpo-forte',payer:{name:'AA',email:'a@b.co'},idempotencyKey:'11111111-1111-4111-8111-111111111111',paymentMethod:'PIX'};
 await assert.rejects(createAroCheckout({...base,fetchImpl:async()=>new Response(JSON.stringify({...session,amount:{amount_minor:69.9,currency:'BRL'}}),{status:201})}));
 await assert.rejects(createAroCheckout({...base,fetchImpl:async()=>new Response('{}',{status:503})}));
});
