import { request } from '@/utils/request';
import { getRegxOrder } from '@/utils/string';

export const downloadFile = async (url: string, fileName?: string) => {
  const response = await request.get(url, { responseType: 'blob' });
  const resFileName = getRegxOrder(response.headers['content-disposition'], /filename=(.+)$/, 1);
  const blob = new Blob([response.data], { type: 'application/octet-stream' });
  const anchor = document.createElement('a');
  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = fileName || resFileName;
  anchor.click();
};
