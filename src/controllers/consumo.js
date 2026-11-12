const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, local, equipamento, consumoKwh, mesReferencia, status } = req.body
    try {
        const sql = 'INSERT INTO consumo (usuarioId, local, equipamento, consumoKwh, mesReferencia, status) VALUES (?, ?, ?, ?, ?, ?);'
        con.query(sql, [usuarioId, local, equipamento, consumoKwh, mesReferencia, status], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar consumo' })
            } else {
                const novoRegistro = req.body
                novoRegistro.id = results.insertId
                res.status(201).json({ message: 'consumo cadastrado(a) com sucesso', data: novoRegistro })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar consumo', details: 'Informe { usuarioId, local, equipamento, consumoKwh, mesReferencia, status }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM consumo;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar consumo' })
        } else {
            res.json(results)
        }
    })
}

const buscarPorId = (req, res) => {
    const id = Number(req.params.id)
    const sql = 'SELECT * FROM consumo WHERE id = ?;'
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar consumo' })
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'consumo não encontrado(a)' })
            } else {
                res.json(results[0])
            }
        }
    })
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const chaves = Object.keys(req.body)
    let campos = ''
    const colunas = []
    chaves.forEach((chave) => {
        campos += `${chave} = ?,`
        colunas.push(req.body[chave])
    })
    campos = campos.slice(0, -1)
    colunas.push(id)
    const sql = `UPDATE consumo SET ${campos} WHERE id = ?;`
    con.query(sql, colunas, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao alterar consumo', msg: err.sqlMessage })
        } else {
            if (results.affectedRows == 1)
                res.json("Registro alterado com sucesso")
            else
                res.status(404).json({ msg: "Nada alterado no banco de dados", erro: results })
        }
    })
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    const sql = 'DELETE FROM consumo WHERE id = ?;'
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao excluir consumo', msg: err.sqlMessage })
        } else {
            if (results.affectedRows == 1)
                res.json("Registro excluído com sucesso")
            else
                res.status(404).json({ msg: "Nada alterado no banco de dados", erro: results })
        }
    })
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    alterar,
    excluir
}
