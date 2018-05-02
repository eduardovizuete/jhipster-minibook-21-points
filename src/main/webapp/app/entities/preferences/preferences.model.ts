import { BaseEntity, User } from './../../shared';

export class Preferences implements BaseEntity {
    constructor(
        public id?: number,
        public weekly_goal?: number,
        public weight_units?: number,
        public user?: User,
    ) {
    }
}
