export interface IMenu {
  _id: string;
  name: string;
  link: string;
  slug: string;
  icon?: string;
  order: number;
  parentId?: string | null;
  isActive: boolean;
}