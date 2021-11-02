import { QuestionOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.less';
import { Input, Tooltip } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TiddlyWikiBackendServiceConfig } from './interface';
import locale from '@/common/locales';

interface TiddlyWikiFormProps {
  verified?: boolean;
  info?: TiddlyWikiBackendServiceConfig;
}

const TiddlyWikiForm: React.FC<TiddlyWikiFormProps & FormComponentProps> = ({
  form: { getFieldDecorator },
  info,
  verified,
}) => {
  const disabled = verified || !!info;
  const initLocalhostPort = 5212;
  return (
    <>
      <Form.Item
        label={
          <FormattedMessage
            id="backend.services.tiddlywiki.localhostPort"
            defaultMessage="本地端口"
          />
        }
      >
        {getFieldDecorator('localhostPort', {
          initialValue: initLocalhostPort,
          rules: [
            {
              required: true,
              message: (
                <FormattedMessage
                  id="backend.services.tiddlywiki.localhostPortUnsetErrorMessage"
                  defaultMessage="本地端口必填"
                />
              ),
            },
          ],
        })(
          <Input
            disabled={disabled}
            suffix={
              <Tooltip
                title={
                  <span>
                    {locale.format({
                      id: 'backend.services.tiddlywiki.localhostPortHelp',
                      defaultMessage: '本地服务器端口可以在「工作区右键菜单→编辑工作区」里面看到',
                    })}
                  </span>
                }
              >
                <QuestionOutlined />
              </Tooltip>
            }
          />
        )}
      </Form.Item>
    </>
  );
};

export default TiddlyWikiForm;
