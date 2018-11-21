class Itens {

    constructor(produto, variedade, pais, categoria, safra, preco) {
        this._produto = produto;
        this._variedade = variedade;
        this._pais = pais;
        this._categoria = categoria;
        this._safra = safra;
        this._preco = preco;
    }

    get produto() {
        return this._produto;
    }

    get variedade() {
        return this._variedade;
    }

    get pais() {
        return this._pais;
    }

    get categoria() {
        return this._categoria;
    }

    get safra() {
        return this._safra;
    }

    get preco() {
        return this._preco;
    }
}


module.exports = Itens;