import { CdkDragDrop, CdkDragSortEvent, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IListItem, IList, IDnDTransfer } from 'src/app/models.interface';
import { LoggerService } from 'src/app/providers/common/logger.service';
import { DataCentralService } from 'src/app/providers/core/data-central.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() public todoList: IList = {
    id: 0,
    items: [],
    name: 'Unnamed'
  };

  constructor(private _central: DataCentralService, private _logger: LoggerService) { }

  ngOnInit(): void {}

  public removeTask(id: string) {
    this._central.deleteTask(id, this.todoList.id);
  }

  public reorder(event: CdkDragDrop<IList>) {
    const {item, currentIndex } = event;
    const draggedItem = item.data;
    const currentItems = [...this.todoList.items];

    const newItems = currentItems.filter((item) => item.id !== draggedItem.id);
    newItems.splice(currentIndex, 0, draggedItem);

    this.todoList.items = newItems;
    this._central.updateList(this.todoList);
    this._logger.text(event, this.todoList.items);
  }

  public transferItem(event: CdkDragDrop<IList>) {
    const {item, currentIndex, container, previousContainer} = event;
    const previousContainerId = previousContainer.data.id;
    const containerId = container.data.id;
    const itemToTransfer: IListItem = item.data;

    const transfer: IDnDTransfer = {
      item: itemToTransfer,
      currentIndex,
      containerId,
      previousContainerId
    };
    this._central.transferItem(transfer);
  }

  public handleDnD(event: CdkDragDrop<IList>) {
    const {container, previousContainer} = event;
    const previousContainerId = previousContainer.data.id;
    const containerId = container.data.id;
    previousContainerId === containerId ? this.reorder(event) : this.transferItem(event);
  }

}
