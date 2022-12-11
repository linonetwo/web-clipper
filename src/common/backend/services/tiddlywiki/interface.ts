import { Repository, CreateDocumentRequest } from '../interface';

export interface TiddlyWikiBackendServiceConfig {
  localhostPort: string;
}

export interface TiddlyWikiCreateDocumentRequest extends CreateDocumentRequest {
  labels: string[];
}

export interface TiddlyWikiUserInfoResponse {
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
}

export interface TiddlyWikiRepository extends Repository {
  namespace: string;
}

export interface TiddlyWikiRepositoryResponse {
  id: number;
  name: string;
  full_name: string;
  created_at: string;
  description: string;
  private: boolean;
}

export interface TiddlyWikiLabel {
  color: string;
  description: string;
  name: string;
  default: boolean;
}
