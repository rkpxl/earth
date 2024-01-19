import * as XLSX from 'xlsx';

export const generateExcel = (data: any[], sheetName: string, handleLoading?: Function): void => {

  if(handleLoading) {
    handleLoading(true)
  }
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const binaryString = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  const blob = new Blob([s2ab(binaryString)], { type: 'application/octet-stream' });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  const time = new Date()
  link.setAttribute('download', sheetName+time);
  document.body.appendChild(link);

  // Trigger a click on the link to start the download
  if(handleLoading) {
    handleLoading(false)
  }
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};

// Helper function to convert binary string to array buffer
const s2ab = (s: string): ArrayBuffer => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
};
