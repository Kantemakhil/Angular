import { Pipe, PipeTransform } from '@angular/core';
import { LivingUnitConfig } from '../bed-administration/beans/living-unit-config.interface';


@Pipe({ name: 'flattenUnitList' })
export class FlattenUnitListPipe implements PipeTransform {
  transform(unitList: LivingUnitConfig[]) {
    return unitList.reduce((acc, item) => {
        acc = [...acc, ...item.childUnits];
        acc.push(item);
        return acc;
      }, []);
  }
}
