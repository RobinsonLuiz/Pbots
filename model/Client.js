class Client {
    
    constructor(id, nome, cpf) {
        this._nome = nome;
        this._cpf = cpf;
        this._id = id;
        this._total = 0;
    }

    get id() {
        return this._id;
    }

    get nome() {
        return this._nome;
    }

    get cpf() {
        return this._cpf;
    }

    get total() {
        return this._total;
    }

    set total(total) {
        this._total += total;
    }

}

module.exports = Client;