import { IdentityType } from "../../enums/identityType.model";
import { MaritalStatus } from "../../enums/maritalStatus.model";

export class Member {
    id: number;
    identityType: IdentityType;
    identityNo: number;
    pinNo: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    mobileNo: string;
    email: string;
    maritalStatus: MaritalStatus;
    dependents: string;

    constructor(identityType?: IdentityType,
        identityNo?: number,
        pinNo?: string,
        firstName?: string,
        middleName?: string,
        lastName?: string,
        dob?: string,
        mobileNo?: string,
        email?: string,
        maritalStatus?: MaritalStatus,
        dependents?: string) {
            this.identityNo = identityNo;
            this.identityType = identityType;
            this.pinNo = pinNo;
            this.firstName = firstName;
            this.middleName = middleName;
            this.lastName = lastName;
            this.dob = dob;
            this.mobileNo = mobileNo;
            this.email = email;
            this.maritalStatus = maritalStatus;
            this.dependents = dependents;
         }
}