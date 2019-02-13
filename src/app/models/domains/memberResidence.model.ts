
export class MemberResidence{
    id: number;
    physicalAddress: string;
    owned: boolean;
    occupancyDuration: string;
    constructor(physicalAddress?: string, owned?: boolean,
        occupancyDuration?: string){
            this.physicalAddress = physicalAddress;
            this.owned = owned;
            this.occupancyDuration = occupancyDuration;
        }
}