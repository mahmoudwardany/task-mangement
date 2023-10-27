/* eslint-disable prettier/prettier */
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../enum/task.enum';

export class TaskStatutsValid implements PipeTransform {
 readonly allowedStatus = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED];
  transform(value: any) {
    if(!this.isValidStatus(value)){
      throw new BadRequestException(`${value} not valid`)
    }
return value
  }
private isValidStatus(status:any){
    const idx =  this.allowedStatus.indexOf(status)
    return idx !== -1
}
}
