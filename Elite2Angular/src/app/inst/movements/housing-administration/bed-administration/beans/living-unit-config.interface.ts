import { LivingUnit } from '../../service/backend.service';

export class LivingUnitConfig {
    unitCode: string;
    unit: LivingUnit; // direct sub-units have this field set, the others don't
    childUnits: LivingUnitConfig[] = [];
    unitId = -1;
    parentId = -1;
    hotspotId: number;
    xCoordinate = 0;
    yCoordinate = 0;
    type: string;
    selected = false;
    maxCapCode: boolean;
    active: boolean;
    agyLocId: string;
    originalXCoordinate = 0; // coordinates before user actualy draged the mouse
    originalYCoordinate = 0; // used to determine if we actually have to update the hotspot on the backend side
    radius = 0;
}
