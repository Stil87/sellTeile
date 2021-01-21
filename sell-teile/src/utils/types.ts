

export interface Part   {
  id?:number,
  firebaseId:string
  title: string,
  model: string,
  description: string,
  pictures: PartImage[],
  status: string,
  date:string,
  onEbaySince?: string,
  preis:number

} 


export interface PartImage {
  url: string,
  id : string
}