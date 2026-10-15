import {NextResponse,type NextRequest} from 'next/server';
import {getAroStatus} from '@/lib/aro/client';
export const runtime='nodejs';
/** POST keeps checkout secret out of URLs and access logs. */
export async function POST(req:NextRequest){
 if(process.env.ARO_CHECKOUT_ENABLED!=='true')return NextResponse.json({error:'CHECKOUT_NOT_RELEASED'},{status:503});
 const apiUrl=process.env.ARO_API_URL,project=process.env.ARO_PROJECT_SLUG;
 if(!apiUrl||!project)return NextResponse.json({error:'ARO_NOT_CONFIGURED'},{status:503});
 const body=await req.json().catch(()=>null) as {id?:unknown;secret?:unknown}|null;
 if(typeof body?.id!=='string'||!/^[a-f\d-]{36}$/i.test(body.id)||typeof body.secret!=='string'||body.secret.length<16||body.secret.length>512)return NextResponse.json({error:'INVALID_SESSION'},{status:400});
 try{return NextResponse.json(await getAroStatus({apiUrl,project,id:body.id,secret:body.secret}),{headers:{'Cache-Control':'no-store'}});}
 catch{return NextResponse.json({error:'ARO_STATUS_UNAVAILABLE'},{status:502});}
}
