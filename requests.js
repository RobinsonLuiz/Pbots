let helpers  = require('./helpers');


exports.totalComprasCliente = async function(req, res) {
    try {
        let clientes = await helpers.getClientes();
        let compras = await helpers.getCompras();   
        clientes.forEach(cliente => {
            cliente['total'] = 0;
            compras.forEach(compra => {
                if (helpers.equalsCpf(compra.cliente) == helpers.equalsCpf(cliente.cpf)) {
                    cliente.total += compra.valorTotal;
                };
            });
        });
        clientes.sort((a, b) => {return b.total - a.total});
        res.status(200).json(clientes);
    } catch (err) {
        res.status(500).json("Tivemos problemas internos, desculpe!");
    };
}

exports.maiorCompradorAno = async function(req, res) {
    let compras = await helpers.getCompras();
    let clientes = await helpers.getClientes();
    let maiorComprador = {total: 0};
    if (parseInt(req.params.ano) > 1950) {
        clientes.forEach(cliente => {
            cliente['total'] = 0;
            compras.forEach(compra => {
                if (compra.itens.length == 1) {
                    if (helpers.helperDate(compra.data).getFullYear() == req.params.ano) {
                        if (helpers.equalsCpf(compra.cliente) == helpers.equalsCpf(cliente.cpf)) {
                            cliente.total += compra.valorTotal;
                        };
                    }; 
                };
            });
        });
    } else return res.status(404).json("Data muito antiga, por favor utilize uma data atual");
    clientes.sort((a, b) => {return b.total - a.total});
    if (clientes[0].total == 0) return res.status(404).json("Não encontramos nenhuma compra para este ano");
    res.status(200).json(clientes[0]);
}


exports.clienteFiel = async function(req, res) {
    let compras = await helpers.getCompras();
    let clientes = await helpers.getClientes();
    clientes.forEach(cliente => {
        cliente['quantidade'] = 0;
        compras.forEach(compra => {
            if (helpers.equalsCpf(compra.cliente) == helpers.equalsCpf(cliente.cpf)) {
                cliente.quantidade++;
            };      
        });
    });
    clientes.sort((a, b) => {return b.quantidade - a.quantidade});
    res.status(200).json(clientes.splice(0, req.params.quantidade));
}

exports.recomendarVinhoCliente = async function(req, res) {
    let compras = await helpers.getCompras();
    let clientes = await helpers.getClientes();
    let clienteRecomendacoes;
    let maisVendidos = [];
    clientes.forEach(cliente => {
        if (cliente.id == req.params.id) {
            clienteRecomendacoes = cliente;
            return;
        }
    });
    if (clienteRecomendacoes) {
        compras.forEach(compra => {
            if (helpers.equalsCpf(compra.cliente) == helpers.equalsCpf(clienteRecomendacoes.cpf)) {
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
        maisVendidos.sort((a, b) => {return b.quantidade - a.quantidade});
        res.status(200).json(maisVendidos[0].produto);
    } else res.status(404).json("Cliente não encontrado");
}



