import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

const supportedLanguages = [
  { languageCode: 'hi', fontPath: '/static/fonts/hindi.ttf' },
];

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

  if(handleLoading) {
    handleLoading(false)
  }
  link?.click();
  document?.body?.removeChild(link);
  URL?.revokeObjectURL(blobUrl);
};

const s2ab = (s: string): ArrayBuffer => {
  const buf = new ArrayBuffer(s?.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s?.length; i++) {
    view[i] = s?.charCodeAt(i) & 0xFF;
  }
  return buf;
};

function detectLanguage(answer: any): string | null {
  let text = answer
  if(Array.isArray(answer)) {
    text = answer[0] || 'en'
  }
  const hindiRegex = /[^\u0000-\u007F]/;
  const germanRegex = /[\u00C0-\u00FF]/;

  if (hindiRegex.test(text)) return 'hi';
  if (germanRegex.test(text)) return 'de';

  return 'en';
}


export const generatePDF = async (formState: any, info: any): Promise<void> => {
  try {
    if (!formState) {
      return;
    }

    const pdf = new jsPDF();

    for (const language of supportedLanguages) {
      pdf.addFont(language.fontPath, language.languageCode, 'normal');
    }

    const titleSize = 18;
    const subtitleSize = 14;
    const questionSize = 12;

    pdf.setFontSize(titleSize);
    pdf.setFont('bold');
    pdf.text("Title: " + info?.title || '', 20, 20);

    pdf.setFontSize(subtitleSize);
    pdf.setFont('times', 'normal');
    pdf.text("Description: " + info?.description || '', 20, 30);
    pdf.text("Pi Name: " + info?.piName || '', 20, 40);

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

    let currentPage = 2;
    Object.keys(formState?.tabs)?.forEach((tabIndex) => {
      const tab = formState.tabs[tabIndex];

      pdf.setPage(currentPage);

      pdf.text(`Tab ${tabIndex}: ${tab?.tabInfo?.title || ''}`, 20, yOffset);
      yOffset += 10;

      if (tab?.questions) {
        Object.keys(tab?.questions)?.forEach((questionId) => {
          const question = tab?.questions?.[questionId];

          const detectedLanguageCode = detectLanguage(question.questionTitle);
          const font = supportedLanguages.find((language) => language.languageCode === detectedLanguageCode)?.languageCode || 'times';
          pdf.setFont(font);

          if(question?.questionTitle) {
            pdf.text(`Question: ${question?.questionTitle || ''}`, 30, yOffset);
  
            const detectedLanguageCodeabswer = detectLanguage(question.answer);
            const fontanswer = supportedLanguages.find((language) => language.languageCode === detectedLanguageCodeabswer)?.languageCode || 'times';
            pdf.setFont(fontanswer);
  
            pdf.setFontSize(questionSize);
            pdf.setFont('times', 'normal');
            pdf.text(`Answer: ${question?.answer || ''}`, 30, yOffset + 10);
            yOffset += 20;
  
            const remainingHeight = pdf.internal.pageSize.getHeight() - yOffset - 20;
            if (remainingHeight < questionSize + 10) {
              currentPage++;
              pdf.addPage();
              yOffset = 30;
            }
          }

        });
      }
      currentPage++;
    });
    pdf.save('form.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
