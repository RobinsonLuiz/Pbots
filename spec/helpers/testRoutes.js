const uri = "http://localhost:8001";
const request = require('requestretry');

describe("Routes", function() {
  it("rota total compras", async function() {
    let myHTTPrequest = request({
      uri: `${uri}/total`,
      method: 'GET',
      json: true
    });
    const resp = await (myHTTPrequest);
    expect(resp.body.length).toEqual(10);
  });

  it("rota total compras POST", async function() {
    let myHTTPrequest = request({
      uri: `${uri}/total`,
      method: 'POST',
      json: true
    });
    const resp = await (myHTTPrequest);
    expect(resp.body).toContain("Erro");
  });

  it("rota compra unica no ano de 2016 ", async function() {
    let myHTTPrequest = request({
      uri: `${uri}/clientes/vendas/2016`,
      method: 'GET',
      json: true 
    });
    const resp = await (myHTTPrequest);
    expect(resp.body.nome).toEqual('Joel');
  });

  it("rota compra unica no ano de 2015 ", async function() {
    let myHTTPrequest = request({
      uri: `${uri}/clientes/vendas/2015`,
      method: 'GET',
      json: true 
    });
    const resp = await (myHTTPrequest);
    expect(resp.body.nome).toEqual('Gustavo');
  });
  // /clientes/fiel/:quantidade
  it("rota clientes fieis, retorno total de 5 clientes ", async function() {
    let myHTTPrequest = request({
      uri: `${uri}/clientes/fiel/5`,
      method: 'GET',
      json: true 
    });
    const resp = await (myHTTPrequest);
    expect(resp.body.length).toEqual(5);
  });
  // /clientes/recomendacoes/:id

  it("rota recomendações de clientes, retorno de acordo a cada cliente -> id = 1", async function() {
    let myHTTPrequest = request({
      uri: `${uri}/clientes/recomendacoes/1`,
      method: 'GET',
      json: true 
    });
    const resp = await (myHTTPrequest);
    expect(resp.body.data).toEqual("Wente Reliz Creek Pinot Noir");
  });

  it("rota recomendações de clientes, retorno de acordo a cada cliente -> id = 2", async function() {
    let myHTTPrequest = request({
      uri: `${uri}/clientes/recomendacoes/2`,
      method: 'GET',
      json: true 
    });
    const resp = await (myHTTPrequest);
    expect(resp.body.data).toEqual("Casa Valduga Raízes");
  });

});
