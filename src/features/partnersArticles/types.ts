export interface IPartnerArticle {
  id: string;
  'company-name': string;
  title: string;
  description: string;
  text: string;
  image: string;
  created: {
    nanoseconds: number;
    seconds: number;
  };
}
