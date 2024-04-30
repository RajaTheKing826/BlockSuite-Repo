import { Slot } from '@blocksuite/store'

export const cardSingleClickSlot = new Slot<{ cardId: string }>()
export const cardDoubleClickSlot = new Slot<{ cardId: string }>()
