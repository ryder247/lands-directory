export class QueryModel {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  constructor(data: any) {
    data = data || {};
    this.pageNumber = data.pageNumber || 0;
    this.pageSize = data.pageSize || 15;
    this.searchTerm = data.searchTerm || '';
  }
}
