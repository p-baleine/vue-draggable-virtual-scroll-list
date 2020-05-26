import Vue, { PluginFunction, VueConstructor } from 'vue'

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean
}

declare const VueDraggableVirtualScrollList: { install: InstallFunction }
export default VueDraggableVirtualScrollList

export const VueDraggableVirtualScrollListSample: VueConstructor<Vue>
