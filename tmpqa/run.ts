import { jsPDF } from 'jspdf';
import fs from 'fs';
(jsPDF as any).prototype.save = function (name: string) {
  fs.writeFileSync('/tmp/pdfqa/' + name, Buffer.from(this.output('arraybuffer')));
  console.log('wrote', name);
};
const { useProgressStore } = await import('@/stores/progressStore');
const { exportProgressToPDF } = await import('@/utils/exportProgress');
const reg = await import('@/config/moduleRegistry.generated');
console.log(Object.keys(reg));
