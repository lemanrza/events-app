export class User {
    constructor(fullName, username, email, password) {
        this.fullName = fullName;
        this.username = username
        this.email = email;
        this.password = password;
        this.role = "client";
        this.profileImg = "https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp"
        this.favorites=[];
        this.totalSpentMoney=0;
        this.createdAt= new Date();
        this.balance=0
    }
}