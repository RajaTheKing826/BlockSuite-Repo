import { type DocCollection, Text, DocSnapshot, Job } from '@blocksuite/store'

import { type InitFn } from './utils'

const editorDefaultContent: DocSnapshot = {
   type: 'page',
   meta: { id: '123456', title: '', createDate: 1710502643842, tags: [] },
   blocks: {
      type: 'block',
      id: 'RMDZEWB2T8',
      flavour: 'affine:page',
      version: 2,
      props: { title: { '$blocksuite:internal:text$': true, delta: [] } },
      children: [
         {
            type: 'block',
            id: 'E2yVZsZILc',
            flavour: 'affine:surface',
            version: 5,
            props: {
               elements: {}
            },
            children: []
         }
      ]
   }
}

export const preset: InitFn = async (
   collection: DocCollection,
   id: string,
   initialContent?: DocSnapshot
) => {
   if (initialContent) {
      const editorData = initialContent ? initialContent : editorDefaultContent

      const job = new Job({ collection })
      const docWithContent = await job.snapshotToDoc(editorData)
      docWithContent.resetHistory()
      return
   }

   const doc = collection.createDoc({ id })
   doc.load()
   // Add root block and surface block at root level
   const rootId = doc.addBlock('affine:page', {
      title: new Text('Page Title')
   })
   doc.addBlock('affine:surface', {}, rootId)

   doc.resetHistory()
}

preset.id = 'preset'
preset.displayName = 'BlockSuite Starter'
preset.description = 'Start from friendly introduction'
