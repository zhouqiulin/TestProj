/*
 * @LastEditTime: 2020-11-24 22:47:02
 */
interface AuditedEntityDto {
  lastModificationTime: string;
  lastModifierId: string;
  creationTime: string;
  creatorId: string;
}

export interface ArticleDto extends AuditedEntityDto {
  title: string;
  treeId: string;
  from: string;
  coverUrl: string;
  keywords: string;
  description: string;
  content: string;
  sort: number;
  id: string;
}

export interface TreeDto extends AuditedEntityDto {
  parentId: string;
  category: number;
  name: string;
  sort: number;
  id: string;
}

export interface ProductDto extends AuditedEntityDto {
  name: string;
  title: string;
  keywords: string;
  treeId: string;
  mainImageUrl: string;
  otherImageUrl: string;
  description: string;
  content: string;
  sort: number;
  valid: boolean;
  id: string;
}

export interface PageDto extends AuditedEntityDto {
  name: string;
  treeId: string;
  content: string;
  title: string;
  keywords: string;
  sort: number;
  valid: boolean;
  id: string;
}
