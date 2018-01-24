let servico = {
    idCarro: '',
    idTipoServico: '',
    valor: 0.00,
    dataVcto: '',
    dataPgto: '',
    idUsuario: 1

}

let Usuario = {
    Nome: '',
    Senha: '',
    IdPessoa: 1,
    IdUsuarioGravou: 0, //int
    Excluido: false,
}

let TipoDirecao = {
    Nome: '',
    IdUsuario: 1,
    Excluido: false,
}

let TipoCombustivel = {
    Nome: '',
    IdUsuario: 1,
    Excluido: false,
}

let ServicoTipo = {
    Nome: '',
    IdUsuario: 1,
    Excluido: false,
}

let Pessoa = {
    Nome: '', 
    Telefone: '',
    Excluido: false
    
}

let Marca = {
    Nome: '',
    IdUsuario: 1,
    Excluido: false,
}

let Cor = {
    Nome: '',
    IdUsuario: 1,
    Excluido: false,
}

let Carro = {
    modelo: '',
    idPessoaDono: '',
    idCor: '',
    idMarca: '',
    qtdPortas: '',
    km: '',
    ano: '',
    idTipoCombustivel: '',
    idTipoDirecao: '',
    vidro: '',
    ar: '',
    valorCusto: '',
    valorVenda: '',
    idUsuario: '',
    excluido: '',
}


export default { 
    servico,
    Usuario,
    TipoDirecao,
    TipoCombustivel,
    ServicoTipo,
    Pessoa,
    Marca,
    Cor,
    Carro,
}