

class Helpers {

    constructor() {
        this.request = require('requestretry');
    }

    helperDate(date, split='-') {
        let dateHelper = date.split(split);
        return new Date(`${dateHelper[2]}-${dateHelper[1]}-${dateHelper[0]}`);
    }
    
    equalsCpf(cpf) {
        let alteracao = cpf.split('.');
        if (alteracao[0] == '0000') {
            alteracao[0] = '000';
            cpf = alteracao.join("");
        } else return cpf.replace(/\./g, '').replace(/-/g, '');
        return cpf;
    }

    async getClientes() {
        let uri = `http://www.mocky.io/v2/598b16291100004705515ec5`;
        try {
            // HTTP request
            let myHTTPrequest = this.request({
                uri: uri,
                method: 'GET',
                json: true
            });
            return (await myHTTPrequest).body;
        } catch (err) {
            throw err;
        }
    }
    
    async getCompras() {
        let uri = `http://www.mocky.io/v2/598b16861100004905515ec7`;
        try {
            // HTTP request
            let myHTTPrequest = this.request({
                uri: uri,
                method: 'GET',
                json: true
            });
            return (await myHTTPrequest).body;
        } catch (err) {
            throw err;
        }
    }
    
}

module.exports = new Helpers();

