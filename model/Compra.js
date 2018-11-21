class Compra {

    constructor(codigo, data, cliente, itens, total) {
        this._codigo = codigo;
        this._data = data;
        this._cliente = cliente;
        this._itens = itens;
        this._valorTotal = total;
    }

    get codigo() {
        return this._codigo;
    }

    get data() {
        return this._data;
    }

    get cliente() {
        return this._cliente;
    }

    get itens() {
        return this._itens;
    }

    get valorTotal() {
        return this._valorTotal;
    }
}


module.exports = Compra;