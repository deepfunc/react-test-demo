import { fetcher } from '@/utils/fetcher';

export function getBizTableData(payload) {
    return fetcher.postJSON('/api/biz/get-table', payload);
}