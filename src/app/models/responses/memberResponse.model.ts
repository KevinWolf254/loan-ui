import { Member } from "../domains/member.model";
import { MemberResidence } from "../domains/memberResidence.model";
import { PostalAddress } from "../domains/postalAddress.model";

export class MemberResponse extends Member{
    residence: MemberResidence;
    postalAddress: PostalAddress;

    constructor(residence?: MemberResidence, postalAddress?: PostalAddress){
        super();
        this.residence = residence;
        this.postalAddress = postalAddress;
    }
}