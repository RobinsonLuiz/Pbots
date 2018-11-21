let Client = require('../model/Client');
let Compra = require('../model/Compra');
let Itens = require('../model/Itens');
let helpers = require('../spec/helpers/helpers');
class ClienteController {

    constructor() {
        this.request = require('requestretry');
    }

    async getCompras() {
        let compras = [];
        let itens = [];
        let uri = `http://www.mocky.io/v2/598b16861100004905515ec7`;
        try {
            // HTTP request
            let myHTTPrequest = this.request({
                uri: uri,
                method: 'GET',
                json: true
            });
            let response = (await myHTTPrequest).body;
            response.forEach(compra => {
                compra.itens.forEach(item => {
                    let Item = new Itens(item.produto, item.variedade, item.pais, item.categoria, item.safra, item.preco);
                    itens.push(Item);
                });
                let compras_response = new Compra(compra.codigo, compra.data, compra.cliente, itens, compra.valorTotal);
                compras.push(compras_response);
                itens = [];
            });
            return await compras;
        } catch (err) {
            throw err;
        }
    }

    async getClientes() {
        let clientes = [];
        let uri = `http://www.mocky.io/v2/598b16291100004705515ec5`;
        try {
            // HTTP request
            let myHTTPrequest = this.request({
                uri: uri,
                method: 'GET',
                json: true
            });
            let response = (await myHTTPrequest).body;
            response.forEach(response => {
                let client = new Client(response.id, response.nome, response.cpf);
                clientes.push(client);
            });
            return await clientes;
        } catch (err) {
            throw err;
        }
    }

    async totalCompras() {
        let clientes = await this.getClientes();
        let compras = await this.getCompras(); 
        clientes.forEach(cliente => {
            compras.forEach(compra => {
                if (helpers.equalsCpf(compra.cliente) == helpers.equalsCpf(cliente.cpf)) {
                    console.log(compra.valorTotal);
                    cliente.total = compra.valorTotal;
                };
            });
        });
        clientes.sort((a, b) => {return b.total - a.total});
        return clientes;
    }

    async maiorCompradorAno(ano) {
        let compras = await this.getCompras();
        let clientes = await this.getClientes();
        if (parseInt(ano) > 1950) {
            clientes.forEach(cliente => {
                compras.forEach(compra => {
                    if (compra.itens.length == 1) {
                        if (helpers.helperDate(compra.data).getFullYear() == ano) {
                            if (helpers.equalsCpf(compra.cliente) == helpers.equalsCpf(cliente.cpf)) {
                                cliente.total = compra.valorTotal;
                            };
                        }; 
                    };
                });
            });
        } else return {"error":  "ano"};
        clientes.sort((a, b) => {return b.total - a.total});
        if (clientes[0].total == 0) return {"error": "nenhumcomprador"};
        else return clientes[0];
    }

    async Fieis() {
        let compras = await this.getCompras();
        let clientes = await this.getClientes();
        clientes.forEach(cliente => {
            cliente['quantidade'] = 0;
            compras.forEach(compra => {
                if (helpers.equalsCpf(compra.cliente) == helpers.equalsCpf(cliente.cpf)) {
                    cliente.quantidade++;
                };      
            });
        });
        return clientes.sort((a, b) => {return b.quantidade - a.quantidade});
    }

    async verificaId(id) {
        let clientes = await this.getClientes();
        let client_id;
        clientes.forEach(cliente => {
            if (cliente.id == id) {
                client_id = cliente;
            }
        });
        return client_id;
    }

    async recomendationClient(id) {
        let compras = await this.getCompras();
        let client_recomendation = await this.verificaId(id);
        let maisVendidos = []; 
        compras.forEach(compra => {
            if (helpers.equalsCpf(compra.cliente) == helpers.equalsCpf(client_recomendation.cpf)) {
                compra.itens.forEach(item => {
                    if (maisVendidos.length > 0) {
                        for(let i = 0; i < maisVendidos.length; i++) {
                            if (maisVendidos[i].produto == item.produto) {
                                maisVendidos[i].quantidade++;
                                break;
                            }
                            if (i == maisVendidos.length - 1) maisVendidos.push({"produto": item.produto, "quantidade": 1});
                        }
                    } else maisVendidos.push({"produto": item.produto, "quantidade": 1});
                });
            };
        });
        return maisVendidos.sort((a, b) => {return b.quantidade - a.quantidade});
    }
}

module.exports = new ClienteController();