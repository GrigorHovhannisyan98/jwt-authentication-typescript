export class UserDto {
    private readonly email;
    private readonly id;
    private readonly password;
    public readonly isActive;

    constructor(user: any) {
        this.id = user.dataValues.id;
        this.email = user.dataValues.email;
        this.password = user.dataValues.password;
        this.isActive = user.dataValues.isActive

    }

    get getUserInfo(): any {
        return {id: this.id, email: this.email}
    }

    get getUserPass(): string {
        return this.password
    }
     getIsActivevalue(): boolean {
        return this.isActive
    }
}