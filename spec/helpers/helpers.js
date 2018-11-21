

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

    
}

module.exports = new Helpers();

