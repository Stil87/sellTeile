import { isJSDocNullableType } from "typescript";


export interface Part   {
  id?:number,
  firebaseId?:string
  title: string,
  model: string,
  description: string,
  pictures: string[],
  status: string,
  date:string,
  onEbaySince?: string

} 