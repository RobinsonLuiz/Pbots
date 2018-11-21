
/**
 * @author Robinson Luiz
 * @version 1.0, 20/11/2018
 * @param {Express} express -> objeto express
 * @param {any} functions -> funções que chamam os resultados 
 */
function createRoutes(express, functions) {

    /**
     * Total de compras por cliente
     */
    express.route('/clientes/vendas/total')
    .get(functions.totalComprasCliente)

    /**
     * Maior comprador no ano
     * @param {string} ano -> ano para ver maior comprador no mesmo.
     */
    express.route('/clientes/vendas/:ano')
    .get(functions.maiorCompradorAno);

    /**
     * Listagem dos clientes mais fiéis
     * @param {number} numclientes -> mostrar a quantidade de clientes mais fieis
     */
    express.route('/clientes/fiel/:numclientes')
    .get(functions.clienteFiel);

    /**
     * Mostrar recomendações apartir de compras do cliente
     * @param {number} id -> a ser passada para mostrar recomendações
     */
    express.route('/clientes/recomendacoes/:id')
    .get(functions.recomendarVinhoCliente);
}

module.exports = createRoutes;