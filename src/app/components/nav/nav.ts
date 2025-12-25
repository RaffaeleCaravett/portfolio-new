import { NgStyle } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, ButtonModule, NgStyle, Tooltip, Toast],
  providers: [MessageService],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class NavComponent implements OnInit {
  protected showLensButton: boolean = true;
  @Input() public showMenu: boolean = false;
  @Output() public emitMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  protected items: { id: number; value: string }[] = [
    { id: 1, value: 'Java' },
    { id: 2, value: 'Spring' },
    { id: 3, value: 'Spring boot' },
    { id: 4, value: 'Javascript' },
    { id: 5, value: 'Typescript' },
    { id: 6, value: 'Angular' },
  ];
  protected itemsCopy: { id: number; value: string }[] = [...this.items];
  protected innerWidth: number = 0;
  constructor(private messageService: MessageService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
  checkLensButton(value: string): void {
    console.log(value);
    if (value.length == 0) {
      this.showLensButton = true;
      this.itemsCopy = [
        { id: 1, value: 'Java' },
        { id: 2, value: 'Spring' },
        { id: 3, value: 'Spring boot' },
        { id: 4, value: 'Javascript' },
        { id: 5, value: 'Typescript' },
        { id: 6, value: 'Angular' },
      ];
    } else {
      this.showLensButton = false;
      this.itemsCopy = this.items.filter(
        (i) =>
          i.value.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          i.id.toString().includes(value) ||
          (i.id + ' - ' + i.value).toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    }
  }

  showTooltip(a: { id: number; value: string }, search: HTMLInputElement): void {
    let random: number = Math.random() * 2;
    if (random <= 1) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You clicked ' + a.value + '!',
      });
    } else {
      this.toastr.success('You clicked ' + a.value + '!');
    }
    this.messageService.clear();
    this.showLensButton = true;
    this.showMenu = false;
    this.emitMenu.emit(this.showMenu);
    search.value = '';
  }

  checkBlur(search: HTMLInputElement) {
    if (!this.showMenu) {
      search.value = '';
      this.showLensButton = true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
}
