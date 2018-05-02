import { BaseEntity, User } from './../../shared';

export class Weight implements BaseEntity {
    constructor(
        public id?: number,
        public datetime?: any,
        public weight?: number,
        public user?: User,
    ) {
    }
}
