import { LivingUnit } from '../../service/backend.service';

export class LivingUnitConfig {
    unitCode: string;
    unit: LivingUnit; // direct sub-units have this field set, the others don't
    childUnits: LivingUnitConfig[] = [];
    unitId = -1;
    hotspotId: number;
    parentId = -1;
    xCoordinate = 0;
    yCoordinate = 0;
    type: string;
    selected = false;
    active: boolean;
    floorPlanId:number;
    originalXCoordinate = 0; // coordinates before user actualy draged the mouse
    originalYCoordinate = 0; // used to determine if we actually have to update the hotspot on the backend side
    unitCfg: LivingUnitConfig;
    agyLocId: string;
    radius = 0;
}
