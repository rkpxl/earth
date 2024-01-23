import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';


export const generateExcel = (data: any[], sheetName: string, handleLoading?: Function): void => {

  if(handleLoading) {
    handleLoading(true)
  }
  const ws = XLSX?.utils?.json_to_sheet(data);
  const wb = XLSX?.utils?.book_new();
  XLSX?.utils?.book_append_sheet(wb, ws, sheetName);

  const binaryString = XLSX?.write(wb, { bookType: 'xlsx', type: 'binary' });
  const blob = new Blob([s2ab(binaryString)], { type: 'application/octet-stream' });
  const blobUrl = URL?.createObjectURL(blob);
  const link = document?.createElement('a');
  link.href = blobUrl;
  const time = new Date()
  link?.setAttribute('download', sheetName+time);
  document?.body?.appendChild(link);

  // Trigger a click on the link to start the download
  if(handleLoading) {
    handleLoading(false)
  }
  link?.click();
  document?.body?.removeChild(link);
  URL?.revokeObjectURL(blobUrl);
};

// Helper function to convert binary string to array buffer
const s2ab = (s: string): ArrayBuffer => {
  const buf = new ArrayBuffer(s?.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s?.length; i++) {
    view[i] = s?.charCodeAt(i) & 0xFF;
  }
  return buf;
};

export const generatePDF = async (formState: any, info: any): Promise<void> => {
  try {
    if (!formState) {
      return;
    }

    const pdf = new jsPDF();

    // Style settings
    const titleSize = 18;
    const subtitleSize = 14;
    const questionSize = 12;

    // Add title and description to the first page
    pdf.setFontSize(titleSize);
    pdf.setFont('bold');
    pdf.text("Title: " + info?.title || '', 20, 20);

    pdf.setFontSize(subtitleSize);
    pdf.setFont('times', 'normal');
    pdf.text("Description: " + info?.description || '', 20, 30);
    pdf.text("Pi Name: " + info?.piName || '', 20, 40);

    // Add tabs and descriptions to the second page
    pdf.addPage();
    pdf.setFontSize(titleSize);
    pdf.setFont('bold');
    pdf.text('Tabs and Descriptions', 20, 20);
    let yOffset = 30;

    Object.keys(formState?.tabs)?.forEach((tabIndex) => {
      const tab = formState.tabs[tabIndex];
      pdf.text(`Tab ${tabIndex}: ${tab?.tabInfo?.title || ''}`, 20, yOffset);

      pdf.setFontSize(subtitleSize);
      pdf.setFont('times', 'normal');
      pdf.text(`Description: ${tab?.tabInfo?.description || ''}`, 30, yOffset + 10);
      yOffset += 20;
    });

    // Add questions and answers to the appropriate pages
    let currentPage = 2; // Start on the second page
    Object.keys(formState?.tabs)?.forEach((tabIndex) => {
      const tab = formState.tabs[tabIndex];

      pdf.setPage(currentPage); // Switch to the current page

      pdf.text(`Tab ${tabIndex}: ${tab?.tabInfo?.title || ''}`, 20, yOffset);
      yOffset += 10;

      if (tab?.questions) {
        Object.keys(tab?.questions)?.forEach((questionId) => {
          const question = tab?.questions?.[questionId];

          pdf.setFontSize(questionSize);
          pdf.setFont('bold');
          pdf.text(`Question: ${question?.questionTitle || ''}`, 30, yOffset);

          pdf.setFontSize(questionSize);
          pdf.setFont('times', 'normal');
          pdf.text(`Answer: ${question?.answer || ''}`, 30, yOffset + 10);
          yOffset += 20;

          // Check if we need to create a new page for the next question
          const remainingHeight = pdf.internal.pageSize.getHeight() - yOffset - 20;
          if (remainingHeight < questionSize + 10) {
            currentPage++;
            pdf.addPage();
            yOffset = 30;
          }
        });
      }

      currentPage++; // Move to the next page for the next tab
    });

    // Save the PDF
    pdf.save('form.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Handle the error appropriately, e.g., reject the promise or notify the user
    throw error; // Re-throw to signal error to the caller
  }
};
