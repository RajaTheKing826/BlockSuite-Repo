import { AffineSchemas, TestUtils } from '@blocksuite/blocks'
import { assertExists } from '@blocksuite/global/utils'
import type { Doc, DocSnapshot } from '@blocksuite/store'
import {
   type BlobStorage,
   createIndexeddbStorage,
   createMemoryStorage,
   createSimpleServerStorage,
   DocCollection,
   type DocCollectionOptions,
   Generator,
   Job,
   Schema,
   type StoreOptions
} from '@blocksuite/store'
import {
   BroadcastChannelAwarenessSource,
   BroadcastChannelDocSource
} from '@blocksuite/sync'

import type { AffineEditorContainer } from '@blocksuite/presets'
import type { BlockSchema } from '@blocksuite/store'
import type { z } from 'zod'
import type { EditorHost } from '@blocksuite/block-std'
import { S3ImageBlockSchema } from '../schema/S3Image/schema'

import type { InitFn } from '../data/utils'
import { CardBlockSchema } from '../schema/Card/schema'

declare global {
   interface Window {
      editor: AffineEditorContainer
      doc: Doc
      blockSchemas: z.infer<typeof BlockSchema>[]
      collection: DocCollection
      job: Job
      std: any
      testUtils: TestUtils
      host: EditorHost
      Y: typeof DocCollection.Y
   }
}

const params = new URLSearchParams(location.search)

export function createStarterDocCollection() {
   const filteredAffineSchemas = AffineSchemas.filter(
      schema => schema.model.flavour !== 'affine:image'
   )

   const schema = new Schema()
   schema.register([
      ...filteredAffineSchemas,
      S3ImageBlockSchema,
      CardBlockSchema
   ])
   const idGenerator = Generator.NanoID

   const options: DocCollectionOptions = {
      id: 'starter',
      schema,
      idGenerator,
      defaultFlags: {
         enable_synced_doc_block: true,
         enable_pie_menu: true
      },
      awarenessSources: [new BroadcastChannelAwarenessSource()]
   }
   const collection = new DocCollection(options)

   collection.start()

   return collection
}

export async function initStarterDocCollection(
   collection: DocCollection,
   initialContent?: DocSnapshot
) {
   // init from other clients

   // use built-in init function
   const functionMap = new Map<
      string,
      (
         collection: DocCollection,
         id: string,
         initialContent?: DocSnapshot
      ) => Promise<void> | void
   >()
   Object.values(
      (await import('../data/index')) as Record<string, InitFn>
   ).forEach(fn => functionMap.set(fn.id, fn))
   const init = params.get('init') || 'preset'
   if (functionMap.has(init)) {
      await functionMap.get(init)?.(collection, 'doc:home', initialContent)
      const doc = collection.getDoc('doc:home')
      if (!doc?.loaded) {
         doc?.load()
      }
      doc?.resetHistory()
   }
}
