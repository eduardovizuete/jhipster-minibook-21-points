import { BaseEntity, User } from './../../shared';

export class BloodPressure implements BaseEntity {
    constructor(
        public id?: number,
        public date_time?: any,
        public systolic?: number,
        public diastolic?: number,
        public user?: User,
    ) {
    }
}
