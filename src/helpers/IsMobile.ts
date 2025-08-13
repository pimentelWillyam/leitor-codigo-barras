export class IsMobile{
  static execute(userAgent: string){
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(userAgent);
  }
}