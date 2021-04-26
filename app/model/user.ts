
export class User {

    uuid: string; // Universally unique ID
    firstName: string;
    lastName: string;
    licenseNum: number;
    dob: Date;
    username: string;
    password: string;
    picUrl: string;

    public toString = () => {
        return `User = (${
        "\nUUID = " + this.uuid
        + "\nUser FirstName = " + this.firstName
        + "\nLastName # = " + this.lastName
        + "\nLicense num = " + this.licenseNum
        + "\nUsername = " + this.username
        + "\nPassword = " + this.password
        + "\nDOB = " + this.dob
        + "\nPic url = " + this.picUrl
            })`
    }

}
