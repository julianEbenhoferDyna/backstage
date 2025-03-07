/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createApiExtension } from './createApiExtension';
import { createApiFactory, createApiRef } from '@backstage/core-plugin-api';

describe('createApiExtension', () => {
  it('fills in the expected values for an existing factory', () => {
    const api = createApiRef<{ foo: string }>({ id: 'test' });
    const factory = createApiFactory({
      api,
      deps: {},
      factory: () => ({ foo: 'bar' }),
    });

    const extension = createApiExtension({
      factory,
    });

    expect(extension).toEqual({
      $$type: 'extension',
      id: 'apis.test',
      at: 'core/apis',
      disabled: false,
      configSchema: undefined,
      inputs: {},
      output: {
        api: {
          $$type: 'extension-data',
          id: 'core.api.factory',
        },
      },
      factory: expect.any(Function),
    });
  });

  it('fills in the expected values for a ref and custom factory', () => {
    const api = createApiRef<{ foo: string }>({ id: 'test' });
    const factory = jest.fn(() => ({ foo: 'bar' }));

    const extension = createApiExtension({
      api,
      inputs: {},
      factory({ config: _config, inputs: _inputs }) {
        return createApiFactory({
          api,
          deps: {},
          factory,
        });
      },
    });

    expect(extension).toEqual({
      $$type: 'extension',
      id: 'apis.test',
      at: 'core/apis',
      disabled: false,
      configSchema: undefined,
      inputs: {},
      output: {
        api: {
          $$type: 'extension-data',
          id: 'core.api.factory',
        },
      },
      factory: expect.any(Function),
    });
  });
});
