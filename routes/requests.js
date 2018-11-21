let client = require('../controller/ClientController');

exports.totalComprasCliente = async function(req, res) {
    try {
        res.status(200).json({ data: await client.totalCompras() } );
    } catch (err) {
        res.status(500).json({ data: "Tivemos problemas internos, desculpe!"});
    };
}

exports.maiorCompradorAno = async function(req, res) {
    let maiorComprador = await client.maiorCompradorAno(req.params.ano);
    if (maiorComprador.error) {
        if (maiorComprador.error == 'ano') res.status(404).json({ data: "Data muito antiga, utilize datas mais recentes."})
        else res.status(404).json( { data: "Não encontramos nenhuma compra nesta data" });
    } else 
        res.status(200).json({ data: maiorComprador });
}


exports.clienteFiel = async function(req, res) {
    res.status(200).json({data: (await client.Fieis()).splice(0, req.params.numclientes) });
}

exports.recomendarVinhoCliente = async function(req, res) {
    let client_recomendation = await client.verificaId(req.params.id);
    if (client_recomendation) {
        res.status(200).json({ data: (await client.recomendationClient(req.params.id))[0].produto });
    } else res.status(404).json({ data: "Cliente não encontrado" });
}



