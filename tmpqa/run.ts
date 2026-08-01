import { jsPDF } from 'jspdf';
import fs from 'fs';
(jsPDF as any).API.save = function (name: string) {
  fs.writeFileSync('/tmp/pdfqa/' + name, Buffer.from(this.output('arraybuffer')));
  console.log('wrote', name);
};
const { useProgressStore } = await import('@/stores/progressStore');
const { MODULE_REGISTRY } = await import("@/config/moduleRegistry.generated");
const { makeItemKey } = await import("@/config/moduleRegistry");
const checked: Record<string, boolean> = {};
const meta: Record<string, any> = {};
const mods = (MODULE_REGISTRY as any[]);
mods.slice(0, 5).forEach((m, i) => {
  m.items.forEach((it: string) => { checked[makeItemKey(m.id, it)] = true; });
  meta[m.id] = { completedAt: new Date(Date.now() - i * 86400000).toISOString(), manualComplete: true };
});
mods.slice(5, 8).forEach((m) => { if (m.items[0]) checked[makeItemKey(m.id, m.items[0])] = true; });
useProgressStore.setState({ checkedItems: checked, moduleMeta: meta, startDate: new Date(Date.now() - 45 * 86400000).toISOString() } as any);
const { exportProgressToPDF } = await import('@/utils/exportProgress');
console.log('calling'); exportProgressToPDF(); console.log('done');
