
import { put } from '@vercel/blob';
export async function uploadPublicBlob(path:string,data:Buffer,contentType='image/jpeg'){
 const blob=await put(path,data,{access:'public',contentType,allowOverwrite:true});
 return blob.url;
}
