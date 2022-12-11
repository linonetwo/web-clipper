import { CompleteStatus } from 'common/backend/interface';
import {
  TiddlyWikiBackendServiceConfig,
  TiddlyWikiUserInfoResponse,
  TiddlyWikiRepositoryResponse,
  TiddlyWikiRepository,
  TiddlyWikiLabel,
  TiddlyWikiCreateDocumentRequest,
} from './interface';
import { DocumentService } from '../../index';
import axios, { AxiosInstance } from 'axios';
import md5 from '@web-clipper/shared/lib/md5';
import { stringify } from 'qs';

const PAGE_LIMIT = 100;

export default class TiddlyWikiDocumentService implements DocumentService {
  private request: AxiosInstance;
  private repositories: TiddlyWikiRepository[];
  private config: TiddlyWikiBackendServiceConfig;

  constructor(config: TiddlyWikiBackendServiceConfig) {
    const request = axios.create({
      baseURL: `http://localhost:${config.localhostPort}`,
      // https://tiddlywiki.com/#WebServer%20API%3A%20Put%20Tiddler
      headers: {
        Accept: 'text/vnd.tiddlywiki',
        'x-requested-with': 'TiddlyWiki',
      },
      timeout: 10000,
      transformResponse: [
        (data): string => {
          return JSON.parse(data);
        },
      ],
      withCredentials: false,
    });
    this.request = request;
    this.repositories = [];
    this.config = config;
  }

  getId = () => {
    return md5(this.config.localhostPort);
  };

  getUserInfo = async () => {
    // const data = await this.request.get<TiddlyWikiUserInfoResponse>('user');
    return {
      name: 'TiddlywikiUser',
      avatar: '',
      homePage: `http://localhost:${this.config.localhostPort}`,
      description: '-',
    };
  };

  getRepositories = async (): Promise<TiddlyWikiRepository[]> => {
    return [];
  };

  createDocument = async (
    info: TiddlyWikiCreateDocumentRequest
  ): Promise<CompleteStatus | void> => {
    const id = await this.client.createNote(data);
    return {
      href: `siyuan://blocks/${id}`,
    };
  };

  getRepoLabels = async (repo: TiddlyWikiRepository): Promise<TiddlyWikiLabel[]> => {
    return (await this.request.get<TiddlyWikiLabel[]>(`/repos/${repo.namespace}/labels`)).data;
  };

  private getTiddlyWikiRepositories = async ({
    page,
    visibility,
  }: {
    page: number;
    visibility: string;
  }) => {
    const response = await this.request.get<TiddlyWikiRepositoryResponse[]>(
      `user/repos?${stringify({ page, per_page: PAGE_LIMIT, visibility })}`
    );
    const repositories = response.data;
    return repositories.map(
      (repository): TiddlyWikiRepository => {
        const { id, name, full_name: namespace } = repository;
        return {
          id: id.toString(),
          name,
          namespace,
          groupId: namespace.split('/')[0],
          groupName: namespace.split('/')[0],
        };
      }
    );
  };
}
