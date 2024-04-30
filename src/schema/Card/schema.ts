import { SerializedXYWH } from '@blocksuite/blocks'
import type {
   FromSnapshotPayload,
   SnapshotReturn,
   ToSnapshotPayload
} from '@blocksuite/store'
import { BaseBlockTransformer } from '@blocksuite/store'
import { BlockModel } from '@blocksuite/store'
import { selectable } from '@blocksuite/blocks/dist/_common/edgeless/mixin/edgeless-selectable'
import { defineBlockSchema } from '@blocksuite/store'

interface CardBlockProps {
   cardId: string
   index: string
   xywh: SerializedXYWH
}

export class CardBlockModel extends selectable<CardBlockProps>(BlockModel) {}

export class CardBlockTransformer extends BaseBlockTransformer<CardBlockProps> {
   override async toSnapshot(payload: ToSnapshotPayload<CardBlockProps>) {
      const snapshot = await super.toSnapshot(payload)

      return snapshot
   }

   override async fromSnapshot(
      payload: FromSnapshotPayload
   ): Promise<SnapshotReturn<CardBlockProps>> {
      const snapshotRet = await super.fromSnapshot(payload)

      return snapshotRet
   }
}

const defaultCardProps: CardBlockProps = {
   cardId: '',
   index: 'a0',
   xywh: '[0,0,0,0]'
}

export const CardBlockSchema = defineBlockSchema({
   flavour: 'affine:card',
   props: () => defaultCardProps,
   metadata: {
      version: 1,
      role: 'content',
      parent: ['affine:surface']
   },
   transformer: () => new CardBlockTransformer(),
   toModel: () => new CardBlockModel()
})
