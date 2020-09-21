import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LandsFileService } from '../../services/lands-file/lands-file.service';
import { MatTableDataSource } from '@angular/material/table';
import { LandFileModel } from '../../models/land-file.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-land-file-list',
  templateUrl: './land-file-list.component.html',
  styleUrls: ['./land-file-list.component.scss'],
})
export class LandFileListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<LandFileModel>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  loading$ = new BehaviorSubject<boolean>(false);

  public displayedColumns = [
    'propertyNumber',
    'referenceNumber',
    'natureOfInstrument',
    // 'dateOfInstrument',
    // 'consideration',
    'fileNumber',
    'termYears',
    // 'grantor',
    // 'grantee',
    // 'acreage',
    'purpose',
    // 'location',
    'shelfNumber',
    // 'documentationDate',
    'action',
  ];
  pagination = { pageSize: 15 } as any;
  model = {} as any;
  toggleAdvanceSearch = false;
  constructor(
    private landsFileService: LandsFileService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.model = { ...this.route.snapshot.queryParams };
    this.getLandFiles(this.model);
  }

  customSort(event): void {
    console.log(event);
  }

  clear(): void {
    this.model = {};
    this.router.navigate([''], {
      queryParams: {},
      replaceUrl: true,
    });
    this.getLandFiles();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onGeneralSearch(): void {
    this.router.navigate([''], {
      queryParams: {
        searchTerm: this.model.searchTerm,
        termYears: this.model.termYears,
        natureOfInstrument: this.model.natureOfInstrument,
        purpose: this.model.purpose,
      },
      replaceUrl: true,
    });

    this.getLandFiles(this.model);
  }

  pageEvent(event): void {
    console.log(event);
    this.getLandFiles(this.model, event.pageIndex, event.pageSize);
  }

  gotoDetail(element): void {
    console.log(element);
  }

  getLandFiles(model?: any, pageNumber?: number, pageSize?: number): void {
    this.loading$.next(true);
    this.landsFileService.getAll(model, pageNumber, pageSize).subscribe(
      (landsFiles: any) => {
        console.log(landsFiles.data);
        this.dataSource.data = landsFiles.data.data as LandFileModel[];
        landsFiles.data.pagination.pageSize = this.pagination.pageSize;
        this.pagination = landsFiles.data.pagination;
        this.loading$.next(false);
      },
      () => {
        this.loading$.next(false);
      },
    );
  }
}
