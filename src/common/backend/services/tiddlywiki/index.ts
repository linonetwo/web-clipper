import { ServiceMeta } from './../interface';
import Service from './service';
import Form from './form';
import headerForm from './headerForm';

export default () => {
  return {
    name: 'TiddlyWiki',
    icon: 'wiki',
    type: 'wiki',
    service: Service,
    form: Form,
    headerForm: headerForm,
    homePage: 'https://tiddlywiki.com/',
    permission: {
      origins: ['http://localhost/*'],
    },
  } as ServiceMeta;
};
