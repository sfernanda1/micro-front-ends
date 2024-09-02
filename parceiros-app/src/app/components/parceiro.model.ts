export interface Parceiros {
  id: string;
  name: string;
  description: string;
  repositoryGit: string;
  urlDoc: string;
  clients: (number | string)[];
  projects: (number | string)[];
  createdAt: string;
}
