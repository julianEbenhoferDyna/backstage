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
import {
  createComponentExtension,
  createPlugin,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

/** @public */
export const entityValidationPlugin = createPlugin({
  id: 'entity-validation',
  routes: {
    root: rootRouteRef,
  },
});

/** @public */
export const EntityValidationPage = entityValidationPlugin.provide(
  createComponentExtension({
    name: 'EntityValidationPage',
    component: {
      lazy: () =>
        import('./components/EntityValidationPage').then(
          m => m.EntityValidationPage,
        ),
    },
  }),
);

export const EntityValidationContent = entityValidationPlugin.provide(
  createComponentExtension({
    name: 'EntityValidationContent',
    component: {
      lazy: () =>
        import('./components/EntityValidationContent').then(
          m => m.EntityValidationContent,
        ),
    },
  }),
);
